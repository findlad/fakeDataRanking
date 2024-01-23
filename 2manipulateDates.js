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

let startDay = "jan 01";

//document all phases in dataset
console.log("a");
let CWPNumberArray = [];
allCombinations[0].forEach((bid) => {
  if (CWPNumberArray.indexOf(bid.CWP) === -1) CWPNumberArray.push(bid.CWP);
});

console.log("b");

function moveDatesForCWP(allComb) {
  allComb.forEach((iteration) => {
    let CWPStart = new Date(startDay);
    CWPNumberArray.forEach((CWP) => {
      let jobsInCWP = iteration.filter((combo) => combo.CWP === CWP);
      jobsInCWP.sort((a, b) => b.length - a.length);
      let CWPEnd;

      jobsInCWP.forEach((bid) => {
        bid.startDate = convertToDate(bid.startDate);
        bid.endDate = convertToDate(bid.endDate);
        bid.CWPLength = jobsInCWP[0].length;
        bid.CWPStart = CWPStart;
        bid.endDate = addDaysToDate(CWPStart, Number(jobsInCWP[0].length));
        bid.startDate = subtractDaysFromDate(bid.endDate, Number(bid.length));
        CWPEnd = addDaysToDate(CWPStart, Number(jobsInCWP[0].length));
      });

      CWPStart = addDaysToDate(CWPEnd, 1);
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
