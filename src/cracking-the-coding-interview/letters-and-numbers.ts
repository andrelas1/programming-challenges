// ['a', 1, 2, 3, 'b', 'c', 'd', 'e', 'f'] -> ['a', 1, 2, 3, 'b', 'c', 'd']

type FindLongestSubArray = (input: Array<any>) => Array<any>;
const findLongestSubArray: FindLongestSubArray = (input) => {
  let result = [];
  let currentMaxLongestArray = 0;
  let start: number | undefined;

  const { letterCount, numberCount } = input.reduce(
    (acc, val) => {
      if (typeof val === "string") {
        acc.letterCount += 1;
      }
      if (typeof val === "number") {
        acc.numberCount += 1;
      }

      return acc;
    },
    { letterCount: 0, numberCount: 0 }
  );

  const maxLongestArrayLength =
    (letterCount < numberCount ? letterCount : numberCount) * 2;

  let auxNumberCount = 0;
  let auxLetterCount = 0;
  let auxSubArrayLength = 0;
  let initialIndex = 0;
  let lastIndex = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < i + maxLongestArrayLength; j++) {
      if (typeof input[j] === "string") auxLetterCount += 1;
      if (typeof input[j] === "number") auxNumberCount += 1;
      if (auxLetterCount === auxNumberCount && j + 1 > auxSubArrayLength) {
        initialIndex = i;
        auxSubArrayLength = j + 1;
        lastIndex = j;
      }
    }
  }

  return input.slice(initialIndex, lastIndex + 1);
};

const result = findLongestSubArray(["a", "b", 1, 2, 3, "c", "d", "f"]);
console.log("RESULT", result);
