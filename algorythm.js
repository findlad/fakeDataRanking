import { phase1, phase2, phase3, phase4 } from "./data.js";
// console.log("phase1 ", phase1);

// An array to store each combination
let allCombinations = [];
let phase1Combinations = [];
let phase2Combinations = [];
let phase3Combinations = [];
let phase4Combinations = [];
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

iterate(phase1, phase1Combinations);
iterate(phase2, phase2Combinations);
iterate(phase3, phase3Combinations);
iterate(phase4, phase4Combinations);

let countAll = 0;

for (let i = 0; i < phase1Combinations.length; i++) {
  for (let j = 0; j < phase2Combinations.length; j++) {
    for (let k = 0; k < phase3Combinations.length; k++) {
      for (let l = 0; l < phase3Combinations.length; l++) {
        let combination = {
          iteration: countAll,
          totalCost:
            Number(phase1Combinations[i].totalCost) +
            Number(phase2Combinations[j].totalCost) +
            Number(phase3Combinations[k].totalCost) +
            Number(phase4Combinations[l].totalCost),
          jobs: {
            phase1: phase1Combinations[i].jobs,
            phase2: phase2Combinations[j].jobs,
            phase3: phase3Combinations[k].jobs,
            phase4: phase4Combinations[l].jobs,
          },
        };

        allCombinations.push(combination);
        countAll++;
      }
    }
  }
}
// console.log(allCombinations);

allCombinations.sort((a, b) => a.totalCost - b.totalCost);
let topTen = allCombinations.slice(0, 9);
console.log(topTen);
