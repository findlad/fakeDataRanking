import {
  addDaysToDate,
  subtractDaysFromDate,
  convertToDate,
} from "./timeAddFunctions.js";
import fs from "fs";
import { allCombinations } from "./1cartesianProduct.js";

let startDay = "jan 01 2024";

let allowedToPrint = true;
function debug(printThis) {
  if (allowedToPrint) {
    console.log(printThis);
  }
}

console.log("a");
//document all CWP in dataset
let CWPNumberArray = [];
allCombinations[0].forEach((bid) => {
  if (CWPNumberArray.indexOf(bid.concurrentWP) === -1)
    CWPNumberArray.push(bid.concurrentWP);
});
console.log(CWPNumberArray);
console.log("b");
function moveDatesForCWP(allComb) {
  allComb.forEach((iteration, index) => {
    // if (index !== 0) return; //use to only run once, for debugging
    let CWPStart = new Date(startDay);
    let durationRunTotal = 0;
    CWPNumberArray.forEach((CWP) => {
      // console.log("project start date", CWPStart);
      //filter on each CWP
      let jobsInCWP = iteration.filter((combo) => combo.concurrentWP === CWP);
      //sort the CWP so the longest job is first
      jobsInCWP.sort((a, b) => b.length - a.length);
      let CWPEnd;
      durationRunTotal += Number(jobsInCWP[0].length);
      // console.log(
      //   "duration run total",
      //   durationRunTotal,
      //   typeof durationRunTotal
      // );
      // console.log("------------------");
      jobsInCWP.forEach((bid) => {
        // console.log("current CWP ", bid.concurrentWP);
        // console.log("current WP ", bid.workPackage);
        bid.durationToDate = Number(durationRunTotal);
        //convert start and end dates to date objects
        bid.startDate = convertToDate(bid.startDate);
        // console.log("Bid start date ", bid.startDate);
        bid.endDate = convertToDate(bid.endDate);
        // console.log("Bid end date ", bid.endDate);
        // console.log("current bid length: ", bid.length);
        //figure out the length of the longest job
        bid.CWPLength = Number(jobsInCWP[0].length);
        // console.log("CWP length " + bid.CWPLength);
        //add the CWP start date to each bid
        bid.CWPStart = CWPStart;
        // console.log("CWP start date ", bid.CWPStart);
        bid.endDate = addDaysToDate(CWPStart, bid.CWPLength);
        bid.startDate = subtractDaysFromDate(bid.endDate, Number(bid.length));
        // console.log("altered Bid Start Date: ", bid.startDate);
        // console.log("altered Bid End Date: ", bid.endDate);
        CWPEnd = addDaysToDate(CWPStart, Number(jobsInCWP[0].length));
        // console.log("CWP END: ", CWPEnd);
        // console.log("------------------");
      });
      //reset date for next CWP
      CWPStart = addDaysToDate(CWPEnd, 1);
      // console.log("updated CWP start date ", CWPStart);
    });

    iteration.sort((a, b) => a.workPackage - b.workPackage);
  });
}

console.log("c");

moveDatesForCWP(allCombinations);

console.log("d");

let moveDateSample = allCombinations.slice(0, 9);

console.log("e");

let moveDateJson = JSON.stringify(moveDateSample);

console.log("f");

fs.writeFileSync("moveDataz.json", moveDateJson, "utf-8");

export { allCombinations, startDay };
