import { phase1, phase2, phase3, phase4 } from "./data.js";

// console.log(phase1[0]);

// function dateSort(phase) {
//   phase = phase.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
// }
// dateSort(phase1);

// console.log(phase1[0]);

const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
let interestRate = 0.15;
let freeMoney = 500000;

let phase1Comb = cartesian(...phase1);
let phase2Comb = cartesian(...phase2);
let phase3Comb = cartesian(...phase3);
let phase4Comb = cartesian(...phase4);

let allCombinations = cartesian(phase1Comb, phase2Comb, phase3Comb, phase4Comb);
let count = 0;
allCombinations.forEach((iteration) => {
  let sortIteration = iteration
    .filter((iter) => iteration.phase === 1)
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

  let runTotal = 0;
  iteration.forEach((bid) => {
    runTotal = bid.cost + runTotal;
    bid.runningTotal = runTotal;
  });
  iteration.unshift({ iterationID: count, totalCost: runTotal });

  count++;
});
// console.log(allCombinations[0]);
allCombinations.sort((a, b) => a[0].totalCost - b[0].totalCost);
let topTen = allCombinations.slice(0, 9);
console.log(topTen);
