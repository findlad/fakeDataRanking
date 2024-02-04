import {
  concurrentWP1,
  concurrentWP2,
  concurrentWP3,
  // concurrentWP4,
} from "./testData.js";

let startDay = "jan 01 2024";
startDay = new Date(startDay);

// cartesian product

const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

let concurrentWP1Comb = cartesian(...concurrentWP1);

let concurrentWP2Comb = cartesian(...concurrentWP2);

let concurrentWP3Comb = cartesian(...concurrentWP3);

// let concurrentWP4Comb = cartesian(...concurrentWP4);

let allCombinations = cartesian(
  concurrentWP1Comb,
  concurrentWP2Comb,
  concurrentWP3Comb
  // concurrentWP4Comb
);

import { filterCWPs } from "./2manipulateDates.js";
import assert from "assert";
// console.log(test);

// function filterCWPs(iteration, CWP) {
//   console.log(iteration[0]);
//   return iteration.filter((combo) => combo.concurrentWP === CWP);
// }
console.log("a");
let jobsInCWP = filterCWPs(allCombinations, 1);
console.log(jobsInCWP);
assert(jobsInCWP[0].concurrentWP === 1);
jobsInCWP.sort((a, b) => b.length - a.length);
console.log(jobsInCWP[0].length);

// jobsInCWP = filterCWPs(allCombinations, 2);
// console.log(jobsInCWP)
// assert(jobsInCWP[0].concurrentWP === 2);
// jobsInCWP.sort((a, b) => b.length - a.length);
// console.log(jobsInCWP[0].length);

// jobsInCWP = filterCWPs(allCombinations, 3);
// console.log(jobsInCWP)
// assert(jobsInCWP[0].concurrentWP === 3);
// jobsInCWP.sort((a, b) => b.length - a.length);
// console.log(jobsInCWP[0].length);
