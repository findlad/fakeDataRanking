import { phase1, phase2, phase3, phase4 } from "./data.js";

const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

let phase1Comb = cartesian(...phase1);
let phase2Comb = cartesian(...phase2);
let phase3Comb = cartesian(...phase3);
let phase4Comb = cartesian(...phase4);

let allCombinations = cartesian(
  ...phase1Comb,
  phase2Comb,
  phase3Comb,
  phase4Comb
);

allCombinations.sort((a, b) => a.totalCost - b.totalCost);
let topTen = allCombinations.slice(0, 9);
console.log(topTen);
