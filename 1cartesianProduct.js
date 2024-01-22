import {
  concurrentWP1,
  concurrentWP2,
  concurrentWP3,
  concurrentWP4,
} from "./0data.js";
import json from "big-json";
import JSONStream from "JSONStream";
import fs from "fs";

// cartesian product
const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

console.log("1");
let concurrentWP1Comb = cartesian(...concurrentWP1);
console.log("2");
let concurrentWP2Comb = cartesian(...concurrentWP2);
console.log("3");
let concurrentWP3Comb = cartesian(...concurrentWP3);
console.log("4");
let concurrentWP4Comb = cartesian(...concurrentWP4);
console.log("5");
let allCombinations = cartesian(
  concurrentWP1Comb,
  concurrentWP2Comb,
  concurrentWP3Comb,
  concurrentWP4Comb
);
console.log("6");

// fs.writeFile("allComb.json", JSON.stringify(allCombinations));

console.log("7");
export { allCombinations };
