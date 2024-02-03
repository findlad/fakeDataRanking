import exportTest from "./testData.js";

import { filterCWPs } from "./2manipulateDates.js";
import assert from "assert";
// console.log(test);

// function filterCWPs(iteration, CWP) {
//   console.log(iteration[0]);
//   return iteration.filter((combo) => combo.concurrentWP === CWP);
// }

let jobsInCWP = filterCWPs(exportTest, 1);
assert(jobsInCWP[0].concurrentWP === 1);
jobsInCWP.sort((a, b) => b.length - a.length);
console.log(jobsInCWP[0].length);

jobsInCWP = filterCWPs(exportTest, 2);
assert(jobsInCWP[0].concurrentWP === 2);
jobsInCWP.sort((a, b) => b.length - a.length);
console.log(jobsInCWP[0].length);

jobsInCWP = filterCWPs(exportTest, 3);
assert(jobsInCWP[0].concurrentWP === 3);
jobsInCWP.sort((a, b) => b.length - a.length);
console.log(jobsInCWP[0].length);
