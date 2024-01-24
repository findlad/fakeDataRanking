import fs from "fs";
import msgpack from "msgpack-lite";
import {
  concurrentWP1,
  concurrentWP2,
  concurrentWP3,
  // concurrentWP4,
} from "./0data.js";

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
// let concurrentWP4Comb = cartesian(...concurrentWP4);
console.log("5");
let allCombinations = cartesian(
  concurrentWP1Comb,
  concurrentWP2Comb,
  concurrentWP3Comb
  // concurrentWP4Comb
);
console.log("6");
// //nothing saves out
// var writeStream = fs.createWriteStream("allcomb.msp");
// console.log("7");
// var encodeStream = msgpack.createEncodeStream();
// console.log("8");
// encodeStream.pipe(writeStream);
// console.log("9");
// // send multiple objects to stream
// encodeStream.write(allCombinations);
// console.log("10");
// // call this once you're done writing to the stream.
// encodeStream.end();

let allcombSample = allCombinations.slice(0, 9);
let sampleFile = JSON.stringify(allcombSample);
fs.writeFileSync("cartesianSample.json", sampleFile, "utf-8");

export { allCombinations };
