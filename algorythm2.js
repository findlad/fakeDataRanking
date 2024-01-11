import * as phases from "./data.js";

let allCombinations = [];
let count = 0;

function generateCombinations(phase, currentIndex, currentCombination) {
  if (currentIndex === phase.length) {
    let combination = {
      iteration: count,
      totalCost: currentCombination.reduce(
        (acc, job) => acc + Number(job.cost),
        0
      ),
      jobs: currentCombination.map((job, index) => ({
        job: index,
        vendor: job.vendor,
        cost: job.cost,
      })),
    };

    allCombinations.push(combination);
    count++;
    return;
  }

  for (let i = 0; i < phase[currentIndex].length; i++) {
    generateCombinations(phase, currentIndex + 1, [
      ...currentCombination,
      phase[currentIndex][i],
    ]);
  }
}

// Iterate through each phase
Object.values(phases).forEach((phase) => {
  generateCombinations(phase, 0, []);
});

let countAll = 0;

for (let i = 0; i < allCombinations.length; i++) {
  for (let j = 0; j < allCombinations.length; j++) {
    // Repeat the loop for each phase in your combination
    let combination = {
      iteration: countAll,
      totalCost: allCombinations[i].totalCost + allCombinations[j].totalCost,
      jobs: {
        phase1: allCombinations[i].jobs,
        phase2: allCombinations[j].jobs,
        // Repeat for additional phases as needed
      },
    };

    allCombinations.push(combination);
    countAll++;
  }
}

allCombinations.sort((a, b) => a.totalCost - b.totalCost);
let topTen = allCombinations.slice(0, 9);
console.log(topTen);
