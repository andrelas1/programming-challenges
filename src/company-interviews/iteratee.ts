import assert from "assert";

const fetchUserId = (userId: any) => {
  return new Promise((resolve, reject) => {
    let successful = Math.random() > 0.4;

    setTimeout(() => {
      if (successful) {
        resolve(`user id ${userId}`);
      } else {
        reject(`Failed to fetch user id ${userId}`);
      }
    }, Math.random() * 1000);
  });
};

type Solution = (
  arr: any[],
  iteratee: (input: any) => Promise<any>,
  limit: number
) => Promise<any[]>;
const solution: Solution = (arr, iteratee, limit) => {
  let concurrentCalls = 0;
  const resultsArr: any[] = [];
  const firstElsToBeCallead = arr.slice(0, limit);

  return new Promise((res, rej) => {
    function callRecursively(callback: any, input: any, index: number): void {
      concurrentCalls += 1;
      console.log("CONCURRENT CALLS", concurrentCalls);
      callback(input)
        .then((result: any) => {
          console.log("UPDATING ITEM", index);
          resultsArr[index] = result;
        })
        .catch((e: any) => {
          console.log("UPDATING ITEM", index);
          resultsArr[index] = e;
        })
        .finally(() => {
          concurrentCalls -= 1;
          if (arr[index + limit]) {
            callRecursively(callback, arr[index + limit], index + limit);
          }
          if (resultsArr.length === arr.length && concurrentCalls === 0) {
            res(resultsArr);
          }
        });
    }

    firstElsToBeCallead.forEach((input, index) => {
      concurrentCalls += 1;
      console.log("CONCURRENT CALLS", concurrentCalls);
      iteratee(input)
        .then((result) => {
          resultsArr[index] = result;
        })
        .catch((e) => {
          resultsArr[index] = e;
        })
        .finally(() => {
          concurrentCalls -= 1;
          callRecursively(iteratee, arr[index + limit], index + limit);
        });
    });
  });
};

// tests
solution(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  fetchUserId,
  3
).then((result) => {
  console.log("RESULT", result);
  assert(result.length === 15);
  result.forEach((item) => {
    assert(!!item);
  });
});
