import fs from "fs";
import msgpack from "msgpack-lite";
import { allCombinations, startDay } from "./2manipulateDates.js";
import { addDaysToDate, subtractDaysFromDate } from "./timeAddFunctions.js";
import JSONStream from "JSONStream";
// import {
//   updateDocument,
//   readDocument,
//   newDocument,
//   postDocument,
// } from "./firestore.js";

let allowedToPrint = true;
function print(printThis) {
  if (allowedToPrint) {
    console.log(printThis);
  }
}

console.log("A");

const interestRate = 0.15;
const freeMoney = 50000;
let count = 0;

console.log("B");

for (let i = 0; i < allCombinations.length; i++) {
  allCombinations[i] = allCombinations[i]
    // .filter((iter) => iter.concurrentWP > 0)
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

  //set variables for each iteration
  let dayOfMonthForInterest = 1;
  let runTotal = 0;
  let daysSinceLastBid = 0;
  let interestSinceLastBid = 0;
  let interestRunningTotal = 0;
  let inDebt = false;
  let debtStart = 0;
  let debtLevel = 0;
  let durationRunningTotal = 0;
  //lastProcessDate initially set to the end date of first bid allCombinations[i] for testing iteration[0] for real
  let lastProcessDate = allCombinations[i].endDate;

  allCombinations[i].forEach((bid) => {
    //calculate construction cost as we go
    runTotal += bid.cost;
    bid.runningTotal = runTotal;
    // console.log(bid.ID, "--------------");
    // console.log("running total ", bid.runningTotal);
    //cost of money, we need to know interest rate, amount borrowed, and time its been borrowed
    //figure out time since last bid was processed
    daysSinceLastBid = (bid.endDate - lastProcessDate) / 86400000;
    // console.log("days since last bid: ", daysSinceLastBid);
    //set lastprocessdate for the analysis of the next bid. This must update as we go along like running total
    lastProcessDate = bid.endDate;
    // console.log("last bid process date: ", lastProcessDate);
    //figure out how far we are into the project
    bid.daysIntoProject = Number((bid.endDate - new Date(startDay)) / 86400000);
    // console.log("days into project: ", bid.daysIntoProject);
    //test to see if we need to spend the loan
    if (inDebt === true) {
      //using borrowed money: simple interest! Do we need compound? Loan structure compounds monthly
      interestSinceLastBid =
        ((debtLevel * interestRate) / 365.25) * daysSinceLastBid;
      // console.log("interest since last bid: ", interestSinceLastBid);
      interestRunningTotal += interestSinceLastBid;
      // console.log("interest running total: ", interestRunningTotal);
      bid.costOfMoney = interestRunningTotal;
      //set new debt level for the analysis of the next bid
      debtLevel = runTotal - freeMoney;
      // console.log("debt level: ", debtLevel);
      //haven`t paid any interest yet! only just borrowed it
      bid.borrowAmount = debtLevel;
    } else if (runTotal - freeMoney > 0) {
      //set up to calculate interest next time
      inDebt = true;
      debtStart = bid.endDate;
      debtLevel = runTotal - freeMoney;
      bid.costOfMoney = 0;
      bid.borrowAmount = debtLevel;
    } else {
      //using free money
      bid.costOfMoney = 0;
      bid.borrowAmount = 0;
    }
    durationRunningTotal = bid.durationToDate;
  });
  //once all bids in iteration are processed, add the meta data
  allCombinations[i].unshift({
    iterationID: count,
    constructionCost: runTotal,
    interest: interestRunningTotal.toFixed(2),
    totalCost: Number(runTotal) + Number(interestRunningTotal.toFixed(2)),
    totalDuration: durationRunningTotal,
  });

  count++;
}
console.log("D");
//sort by total cost and save out to a specific array
allCombinations.sort((a, b) => a[0].totalCost - b[0].totalCost);
console.log("E");
// too big for stringify
// allCombInterest = JSON.stringify(allCombinations);
// fs.writeFileSync("allCombIntz.json", allCombInterest, "utf-8");
let top100 = allCombinations.slice(0, 9);
console.log("F");

const stream = fs.createWriteStream("allCombIntz.json");
const jsonStream = JSONStream.stringify();
jsonStream.pipe(stream);

// Assuming allCombinations is an array
allCombinations.forEach((combination) => {
  jsonStream.write(combination);
});

jsonStream.end();

console.log("G");

let top100File = JSON.stringify(top100);
fs.writeFileSync("TopTenz.json", top100File, "utf-8");
