import { timeBlock1, timeBlock2, timeBlock3, timeBlock4 } from "./data.js";
// console.log("timeblock1 ", timeBlock1);

let masterArray = [timeBlock1, timeBlock2, timeBlock3, timeBlock4];
// console.log(masterArray[0][0][0]);
// An array to store each combination
let allCombinations = [];
let time1Combinations = [];
let time2Combinations = [];
let time3Combinations = [];
let time4Combinations = [];
let count = 0;

// Function to find all combinations
function getAllCombinations(currentIndex, currentCombination) {
  if (currentIndex === timeBlock1.length) {
    // Print or process the current combination
    allCombinations.push(currentCombination);
    return;
  }

  for (let i = 0; i < timeBlock1[currentIndex].length; i++) {
    getAllCombinations(currentIndex + 1, [
      ...currentCombination,
      timeBlock1[currentIndex][i],
    ]);
  }
}

// Start with the first array
getAllCombinations(0, []);
console.log(allCombinations);
