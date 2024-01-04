import { timeBlock1, timeBlock2, timeBlock3, timeBlock4 } from "./data.js";
// console.log("timeblock1 ", timeBlock1);

let masterArray = [timeBlock1, timeBlock2, timeBlock3, timeBlock4];

// An array to store each combination
const allCombinations = [];

// Nested loops to iterate through each array and its elements
for (let i = 0; i < masterArray[0].length; i++) {
  for (let j = 0; j < masterArray[1].length; j++) {
    for (let k = 0; k < masterArray[2].length; k++) {
      for (let l = 0; l < masterArray[3].length; l++) {
        // Create an object to store the details of the current combination
        const combination = {
          vendor1: masterArray[0][i].vendor,
          cost: masterArray[0][i].cost,
          vendor2: masterArray[1][j].vendor,
          cost: masterArray[1][j].cost,
          vendor3: masterArray[2][k].vendor,
          cost: masterArray[2][k].cost,
          vendor4: masterArray[3][l].vendor,
          cost: masterArray[3][l].cost,
          totalCost:
            Number(masterArray[0][i].cost) +
            Number(masterArray[1][j].cost) +
            Number(masterArray[2][k].cost) +
            Number(masterArray[3][l].cost),
        };

        // Push the combination object to the allCombinations array
        allCombinations.push(combination);
      }
    }
  }
}

// Now, allCombinations contains every possible combination of bids
console.log(allCombinations);
