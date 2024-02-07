import fs from "fs";
// use for real
import {
  concurrentWP1,
  concurrentWP2,
  concurrentWP3,
  // concurrentWP4,
} from "./0data.js";

// use for testing
// import {
//   concurrentWP1,
//   concurrentWP2,
//   concurrentWP3,
//   // concurrentWP4,
// } from "./testData.js";

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

// let allcombSample = allCombinations[242789];
// let previousComb = allCombinations[242788];
// let sampleFile = JSON.stringify(allcombSample);
// let sampleFile1 = JSON.stringify(previousComb);
// fs.writeFileSync("cartesianSample.json", sampleFile, "utf-8");
// fs.writeFileSync("cartesianSample1.json", sampleFile1, "utf-8");
export { startDay, allCombinations };
