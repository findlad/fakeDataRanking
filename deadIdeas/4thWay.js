function generateCombinations(allJobs) {
  const combinations = [];

  function generate(index, currentCombination) {
    if (index === allJobs.length) {
      combinations.push({
        iteration: combinations.length + 1,
        workPackage: currentCombination.map((bid) => bid.workPackage),
        bids: currentCombination.map((bid) => ({ ...bid })),
      });
      return;
    }

    const currentJob = allJobs[index];

    for (const bid of [currentJob]) {
      // Modified this line to wrap currentJob in an array
      currentCombination.push({ workPackage: bid.workPackage, ...bid });
      generate(index + 1, currentCombination);
      currentCombination.pop();
    }
  }

  generate(0, []);

  return combinations;
}

// Example usage:
// Import the data
import { allJobs } from "../data2.js";

// Call the function with your data
const result = generateCombinations(allJobs);

// Log the result
console.log(result[0]);
