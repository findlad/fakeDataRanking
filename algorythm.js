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
// Nested loops to iterate through each array and its elements
function iterate(phase, phaseArray) {
  for (let i = 0; i < phase[0].length; i++) {
    for (let j = 0; j < phase[1].length; j++) {
      for (let k = 0; k < phase[2].length; k++) {
        let combination = {
          iteration: count,
          totalCost:
            Number(phase[0][i].cost) +
            Number(phase[1][j].cost) +
            Number(phase[2][k].cost),
          jobs: [
            {
              job: i,
              vendor: phase[0][i].vendor,
              cost: phase[0][i].cost,
            },
            {
              job: j,
              vendor: phase[1][j].vendor,
              cost: phase[1][j].cost,
            },
            {
              job: k,
              vendor: phase[2][k].vendor,
              cost: phase[2][k].cost,
            },
          ],
        };
        phaseArray.push(combination);
        count++;
      }
    }
  }
}

iterate(timeBlock1, time1Combinations);
iterate(timeBlock2, time2Combinations);
iterate(timeBlock3, time3Combinations);
iterate(timeBlock4, time4Combinations);

let countAll = 0;

for (let i = 0; i < time1Combinations.length; i++) {
  for (let j = 0; j < time2Combinations.length; j++) {
    for (let k = 0; k < time3Combinations.length; k++) {
      for (let l = 0; l < time3Combinations.length; l++) {
        let combination = {
          iteration: countAll,
          totalCost:
            Number(time1Combinations[i].totalCost) +
            Number(time2Combinations[j].totalCost) +
            Number(time3Combinations[k].totalCost) +
            Number(time4Combinations[l].totalCost),
          jobs: {
            phase1: time1Combinations[i].jobs,
            phase2: time2Combinations[j].jobs,
            phase3: time3Combinations[k].jobs,
            phase4: time4Combinations[l].jobs,
          },
        };

        allCombinations.push(combination);
        countAll++;
      }
    }
  }
}
console.log(allCombinations);
