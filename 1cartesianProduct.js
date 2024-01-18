import { phase1, phase2, phase3, phase4 } from "./data.js";
import json from "big-json";

import fs from "fs";

// cartesian product, dont ask, i dont know, but it works
const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

//run all combinations
console.log("1");
let phase1Comb = cartesian(...phase1);
console.log("2");
let phase2Comb = cartesian(...phase2);
console.log("3");
let phase3Comb = cartesian(...phase3);
console.log("4");
let phase4Comb = cartesian(...phase4);
console.log("5");
let allCombinations = cartesian(phase1Comb, phase2Comb, phase3Comb, phase4Comb);
console.log("6");

// allCombFile = JSON.stringify(allCombinations);

const stringifyStream = json.createStringifyStream({
  body: allCombinations,
});

console.log("7");

stringifyStream.on("data", function (strChunk) {});

console.log("8");

fs.writeFileSync("allComb.json", stringifyStream, "utf-8");
