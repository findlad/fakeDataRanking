import { timeBlock1, timeBlock2, timeBlock3, timeBlock4 } from "./data.js";
// console.log("timeblock1 ", timeBlock1);

let masterArray = [timeBlock1, timeBlock2, timeBlock3, timeBlock4];
// console.log(masterArray[0][0][0]);
// An array to store each combination
let allCombinations = [];
let time1Combinations = [];
let time2Combinations = [];
let time3Combinations = [];
let count = 0;
// Nested loops to iterate through each array and its elements

for (let i = 0; i < timeBlock1[0].length; i++) {
  for (let j = 0; j < timeBlock1[1].length; j++) {
    for (let k = 0; k < timeBlock1[2].length; k++) {
      let combination = {
        iteration: count,
        totalCost:
          Number(timeBlock1[0][i].cost) +
          Number(timeBlock1[1][j].cost) +
          Number(timeBlock1[2][k].cost),
        jobs: [
          {
            job: i,
            vendor: timeBlock1[0][i].vendor,
            cost: timeBlock1[0][i].cost,
          },
          {
            job: j,
            vendor: timeBlock1[1][j].vendor,
            cost: timeBlock1[1][j].cost,
          },
          {
            job: k,
            vendor: timeBlock1[2][k].vendor,
            cost: timeBlock1[2][k].cost,
          },
        ],
      };
      time1Combinations.push(combination);
      count++;
    }
  }
}

console.log(time1Combinations);
