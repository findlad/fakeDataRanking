import { addDaysToDate, subtractDaysFromDate } from "./timeAddFunctions.js";
import fs from "fs";
import msgpack from "msgpack-lite";
import { allCombinations } from "./1cartesianProduct.js";

// var readStream = fs.createReadStream("allcomb.msp");
// var allCombinations = msgpack.createDecodeStream();
// readStream.pipe(allCombinations).on("data", console.warn);

let interestRate = 0.15;
let freeMoney = 50000;
let startDay = "jan 01 2024";
let count = 0;

//document all phases in dataset
console.log("a");
let concurrentWPNumberArray = [];
allCombinations[0].forEach((bid) => {
  if (concurrentWPNumberArray.indexOf(bid.concurrentWP) === -1)
    concurrentWPNumberArray.push(bid.concurrentWP);
});
console.log("b");
function moveDatesForconcurrentWP(allComb) {
  allComb.forEach((iteration) => {
    let concurrentWPStart = new Date(startDay);
    concurrentWPNumberArray.forEach((concurrentWP) => {
      let jobsInconcurrentWP = iteration.filter(
        (combo) => combo.concurrentWP === concurrentWP
      );
      jobsInconcurrentWP.sort((a, b) => b.length - a.length);
      let concurrentWPEnd;

      jobsInconcurrentWP.forEach((bid) => {
        bid.concurrentWPLength = jobsInconcurrentWP[0].length;
        bid.concurrentWPStart = concurrentWPStart;
        bid.endDate = addDaysToDate(
          concurrentWPStart,
          Number(jobsInconcurrentWP[0].length)
        );
        bid.startDate = subtractDaysFromDate(bid.endDate, Number(bid.length));
        concurrentWPEnd = addDaysToDate(
          concurrentWPStart,
          Number(jobsInconcurrentWP[0].length)
        );
      });

      concurrentWPStart = addDaysToDate(concurrentWPEnd, 1);
    });

    iteration.sort((a, b) => a.workPackage - b.workPackage);
  });
}
console.log("c");
moveDatesForconcurrentWP(allCombinations);
console.log("d");

// var writeStream = fs.createWriteStream("dateOptimised.msp");
// console.log("e");
// var encodeStream = msgpack.createEncodeStream();
// console.log("f");
// encodeStream.pipe(writeStream);
// console.log("g");
// // send multiple objects to stream
// encodeStream.write(allCombinations);
// console.log("h");
// // call this once you're done writing to the stream.
// encodeStream.end();

export { allCombinations };
