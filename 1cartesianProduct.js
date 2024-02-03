import fs from "fs";
// import {
//   concurrentWP1,
//   concurrentWP2,
//   concurrentWP3,
//   // concurrentWP4,
// } from "./0data.js";
import {
  concurrentWP1,
  concurrentWP2,
  concurrentWP3,
  // concurrentWP4,
} from "./testData.js";

let startDay = "jan 01 2024";

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

// let allcombSample = allCombinations.slice(0, 9);
// let sampleFile = JSON.stringify(allcombSample);
// fs.writeFileSync("cartesianSample.json", sampleFile, "utf-8");

export { startDay, allCombinations };
