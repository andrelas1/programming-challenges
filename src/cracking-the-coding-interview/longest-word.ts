// Example [cat, dog, banana, dogwalker, librarians] => dogwalker

type FindLongestWordOutOfTwoWords = (words: string[]) => string;
const findLongestWordOutOfTwoWords: FindLongestWordOutOfTwoWords = (words) => {
  let foundWord = "";
  const sortedList = [...words];

  // sort the list to get the longest word first
  sortedList.sort((a, b) => {
    if (a.length > b.length) return -1;
    if (a.length < b.length) return 1;
    return 0;
  });

  // now for each word, from longer to smaller, find the longest word that has two substrings in the list
  for (let i = 0; i < sortedList.length; i++) {
    let longestWord = "";
    // if the word is length three or less
    if (sortedList[i].length <= 2) {
      break;
    }

    // pick the first longest word
    longestWord = sortedList[i];
    console.log("SORTED LIST", sortedList[i]);

    // remove every word that is length - 1 from the list
    const possibleMatches = sortedList.filter(
      (word) => word.length <= longestWord.length - 2
    );

    let n = 0;
    let firstMatch;
    let secondMatch;
    let remainingLength = 0;
    let startIndex = 0;
    // when we find a firstMatch, this can be set to its substring, removing the firstMatch from there
    let longestWordAux = longestWord;

    while (startIndex < possibleMatches.length) {
      console.log("longestWordAux", longestWordAux);
      // find firstMatch
      if (!firstMatch) {
        const indexOf = longestWordAux.indexOf(possibleMatches[n]);
        if (indexOf !== -1) {
          startIndex = n;
          firstMatch = possibleMatches[n];
          remainingLength = longestWord.length - firstMatch.length;
          // here is the bug
          longestWordAux = longestWordAux
            .split("")
            .filter(
              (char, index) =>
                index > indexOf && index < indexOf + firstMatch.length
            )
            .join("");
        }
      }

      // find secondMatch and if it is found, break
      console.log("LONGEST", longestWord);
      console.log("FIRSTMATCh", longestWordAux);
      console.log("MAYBE SECOND MATCH", possibleMatches[n]);
      if (
        firstMatch &&
        !secondMatch &&
        possibleMatches[n].length === remainingLength
      ) {
        const indexOf = longestWordAux.indexOf(possibleMatches[n]);
        if (indexOf !== -1) {
          secondMatch = possibleMatches[n];
        }
        foundWord = longestWord;
        break;
      }

      n++;

      // if none were found with that firstMatch, we need reset the firstMatch, remainingLength, and startIndex
      // if the iterated word has a smallent length than the remaining length, then we can reset everything
      if (
        n > possibleMatches.length - 1 ||
        possibleMatches[n].length < remainingLength
      ) {
        firstMatch = "";
        remainingLength = 0;
        startIndex++;
        n = startIndex + 1;
        longestWordAux = longestWord;
      }
    }
  }

  return foundWord;
};

// const result = findLongestWordOutOfTwoWords([
//   "cat",
//   "dog",
//   "banana",
//   "walker",
//   "dogwalker",
//   "librarians",
// ]);

const result1 = findLongestWordOutOfTwoWords([
  "cat",
  "dog",
  "banana",
  "walker",
  "librarians",
  "dogwalker",
  "superlibrarians",
  "super",
]);

// console.log("RESULT", result);
console.log("RESULT 1", result1);
