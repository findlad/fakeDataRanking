import { phase1, phase2, phase3, phase4 } from "./data.js";
import { addDaysToDate, subtractDaysFromDate } from "./timeAddFunctions.js";
import fs from "fs";

// cartesian product, dont ask, i dont know, but it works
const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

//run all combinations

let phase1Comb = cartesian(...phase1);
let phase2Comb = cartesian(...phase2);
let phase3Comb = cartesian(...phase3);
let phase4Comb = cartesian(...phase4);
let allCombinations = cartesian(phase1Comb, phase2Comb, phase3Comb, phase4Comb);

allCombFile = JSON.stringify(allCombinations);
fs.writeFileSync("allComb.json", allCombFile, "utf-8");
