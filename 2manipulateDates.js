import {
  addDaysToDate,
  subtractDaysFromDate,
  convertToDate,
} from "./timeAddFunctions.js";
import fs from "fs";
import msgpack from "msgpack-lite";
import { allCombinations } from "./1cartesianProduct.js";

// var readStream = fs.createReadStream("allcomb.msp");
// var allCombinations = msgpack.createDecodeStream();
// readStream.pipe(allCombinations).on("data", console.warn);

let startDay = "jan 01 2024";

console.log("a");
//document all CWP in dataset
let CWPNumberArray = [];
allCombinations[0].forEach((bid) => {
  if (CWPNumberArray.indexOf(bid.concurrentWP) === -1)
    CWPNumberArray.push(bid.concurrentWP);
});
// console.log(CWPNumberArray);
console.log("b");

function moveDatesForCWP(allComb) {
  allComb.forEach((iteration, index) => {
    // if (index !== 0) return; //use to only run once, for debugging
    let CWPStart = new Date(startDay);
    CWPNumberArray.forEach((CWP) => {
      // console.log("project start date", CWPStart);
      //filter on each CWP
      let jobsInCWP = iteration.filter((combo) => combo.concurrentWP === CWP);
      //sort the CWP so the longest job is first
      jobsInCWP.sort((a, b) => b.length - a.length);
      let CWPEnd;

      jobsInCWP.forEach((bid) => {
        // console.log("current CWP ", bid.concurrentWP);
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
        // console.log("altered Bid End Date: ", bid.endDate);
        bid.startDate = subtractDaysFromDate(bid.endDate, Number(bid.length));
        // console.log("altered Bid Start Date: ", bid.startDate);
        CWPEnd = addDaysToDate(CWPStart, Number(jobsInCWP[0].length));
        // console.log("CWP END: ", CWPEnd);
        // console.log("------------------");
      });
      //something wrong here
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

fs.writeFileSync("moveData.json", moveDateJson, "utf-8");

// var writeStream = fs.createWriteStream("dateOptimised.msp");
// console.log("g");
// var encodeStream = msgpack.createEncodeStream();
// console.log("h");
// encodeStream.pipe(writeStream);
// console.log("i");
// // send multiple objects to stream
// encodeStream.write(allCombinations);
// console.log("j");
// // call this once you're done writing to the stream.
// encodeStream.end();

export { allCombinations, startDay };
