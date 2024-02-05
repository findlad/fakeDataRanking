const debug = (...args) => console.log(...args);

// get rid of the console.logs
console.log = function () {};

import {
  addDaysToDate,
  subtractDaysFromDate,
  convertToDate,
} from "./timeAddFunctions.js";
import fs from "fs";
import { startDay, allCombinations } from "./1cartesianProduct.js";

// console.log(startDay);

function filterCWPs(iteration, CWP) {
  return iteration.filter((combo) => combo.concurrentWP === CWP);
}

// console.log("a");
//document all CWP in dataset
let CWPNumberArray = [];
allCombinations[0].forEach((bid) => {
  if (CWPNumberArray.indexOf(bid.concurrentWP) === -1)
    CWPNumberArray.push(bid.concurrentWP);
});
console.log(CWPNumberArray);
let processedAllComb = [];
// console.log("b");

function moveDatesForCWP(allComb) {
  allComb.forEach((original, index) => {
    // if (index !== 0) return; //use to only run once, for debugging
    // check if theres a split bid in this iteration, if so, dont run
    //let run=true
    //let noOfTiedBids=0
    //for each bid, if tiedBidFlag=true, noOfTiedBide +=1,
    const iteration = JSON.parse(JSON.stringify(original));

    let CWPStart = new Date(startDay);
    // console.log("CWP Start : ", CWPStart);
    let durationRunTotal = 0;

    CWPNumberArray.forEach((CWP) => {
      // console.log("project start date", CWPStart);
      //filter on each CWP
      let jobsInCWP = filterCWPs(iteration, CWP);
      // console.log(jobsInCWP);
      //sort the CWP so the longest job is first
      jobsInCWP.sort((a, b) => b.length - a.length);
      // console.log(jobsInCWP);
      //figure out the length of the longest job
      let CWPDuration = Number(jobsInCWP[0].length);
      // if (CWPDuration === 13) {
      //   debug("cwp np ", CWP);
      //   debug("jobs on CWP ", jobsInCWP);
      //   process.exit();
      // }
      // console.log(CWPDuration);
      durationRunTotal += CWPDuration;
      // console.log("duration run total", durationRunTotal);
      //calculate the end date
      let CWPEnd = addDaysToDate(CWPStart, CWPDuration);
      // console.log("CWP end date ", CWPEnd);
      // console.log("------------------");
      jobsInCWP.forEach((bid) => {
        // console.log("bid ID ", bid.ID);
        // console.log("current CWP ", bid.concurrentWP);
        // console.log("current WP ", bid.workPackage);
        bid.durationToDate = durationRunTotal;
        //convert start and end dates to date objects
        bid.startDate = convertToDate(bid.startDate);
        // console.log("Bid start date ", bid.startDate);
        bid.endDate = convertToDate(bid.endDate);
        // console.log("Bid end date ", bid.endDate);
        // console.log("current bid length: ", bid.length);
        bid.CWPDuration = CWPDuration;
        // console.log("CWP length " + bid.CWPLength);
        //add the CWP start date to each bid
        bid.CWPStart = CWPStart;
        // console.log("CWP start date ", bid.CWPStart);
        //calculate the end date for the bid, which will be the end date for the CWP
        bid.newEndDate = CWPEnd;
        // Subtract the bid duration from the End date to back calculate the start date
        bid.newStartDate = subtractDaysFromDate(CWPEnd, Number(bid.length));
        // console.log("altered Bid Start Date: ", bid.newStartDate);
        // console.log("altered Bid End Date: ", bid.newEndDate);
        // console.log("CWP END: ", CWPEnd);
        // console.log("------------------");
      });
      //reset date for next CWP
      CWPStart = CWPEnd;
      // console.log("updated CWP start date ", CWPStart);
    });

    iteration.sort((a, b) => a.workPackage - b.workPackage);
    processedAllComb.push(iteration);
  });
}

moveDatesForCWP(allCombinations);

// let moveDateSample = processedAllComb.slice(0, 9);

// let moveDateJson = JSON.stringify(moveDateSample);

// fs.writeFileSync("moveDataz.json", moveDateJson, "utf-8");
export { processedAllComb as allCombinations, filterCWPs };
