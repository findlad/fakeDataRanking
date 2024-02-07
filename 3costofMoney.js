import fs from "fs";

import { allCombinations } from "./2manipulateDates.js";
import {
  calculateInterest,
  setInterestRate,
  setCompounds,
} from "./interestCalc.js";
import { startDay } from "./1cartesianProduct.js";
import { subtractDateFromDate } from "./timeAddFunctions.js";

import JSONStream from "JSONStream";

const interestRate = 0.15;
const freeMoney = 150000;
let count = 0;
let noOfCompoundsPerYear = 365;

setInterestRate(interestRate);
setCompounds(noOfCompoundsPerYear);

allCombinations.forEach((iteration, index) => {
  // if (index !== 0) return; //use to only run once, for debugging

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
  let start = new Date(startDay);
  let interestAtDelivery = 0;
  let interestOnDownPayment = 0;

  //what am i thinking here?
  let lastProcessDate = iteration.newEndDate;

  iteration.forEach((bid) => {
    //calculate construction cost as we go
    if (bid.quote === false) {
      bid.oldCost = bid.cost;
      bid.cost = bid.cost * bid.estimateAcuracy;
    }

    runTotal += bid.cost;
    bid.runTotal = runTotal;
    //cost of money, we need to know interest rate, amount borrowed, and time its been borrowed
    //figure out time since last bid was processed
    daysSinceLastBid = subtractDateFromDate(
      new Date(bid.newEndDate),
      new Date(lastProcessDate)
    );
    if (isNaN(daysSinceLastBid)) {
      daysSinceLastBid = 0;
    }
    //set lastprocessdate for the analysis of the next bid. This must update as we go along like running total
    lastProcessDate = bid.newEndDate;
    //figure out how far we are into the project
    durationRunningTotal = subtractDateFromDate(bid.newEndDate, start);
    bid.durationRunningTotal = durationRunningTotal;
    //test to see if we need to spend the loan

    if (inDebt === true) {
      //using borrowed money: compound interest!
      if (bid.type === "delivery") {
        interestAtDelivery = calculateInterest(debtLevel, daysSinceLastBid);
        interestOnDownPayment = calculateInterest(debtLevel, daysSinceLastBid);
        interestSinceLastBid = interestAtDelivery + interestOnDownPayment;
      } else {
        interestSinceLastBid = calculateInterest(debtLevel, daysSinceLastBid);
      }

      interestRunningTotal += interestSinceLastBid;
      bid.interestRunningTotal = interestRunningTotal;
      //set new debt level for the analysis of the next bid
      debtLevel = runTotal - freeMoney;
      //haven`t paid any interest yet! only just borrowed it
      bid.debtLevel = debtLevel;
    } else if (runTotal - freeMoney > 0) {
      //set up to calculate interest next time
      inDebt = true;
      debtStart = bid.newEndDate;
      debtLevel = runTotal - freeMoney;
      bid.costOfMoney = 0;
      bid.debtLevel = debtLevel;
    } else {
      //using free money
      bid.costOfMoney = 0;
      bid.borrowAmount = 0;
      console.log("no debt");
    }
  });
  //once all bids in iteration are processed, add the meta data
  iteration.unshift({
    iterationID: count,
    constructionCost: runTotal,
    interest: interestRunningTotal.toFixed(2),
    totalCost: Number(runTotal) + Number(interestRunningTotal.toFixed(2)),
    totalDuration: durationRunningTotal,
    debtStart: debtStart,
  });
  iteration.sort((a, b) => a.workPackage - b.workPackage);
  count++;
});

console.log("D");
//sort by total cost and save out to a specific array
allCombinations.sort((a, b) => a[0].totalCost - b[0].totalCost);
console.log("E");
// too big for stringify
// allCombInterest = JSON.stringify(allCombinations);
// fs.writeFileSync("allCombIntz.json", allCombInterest, "utf-8");
let top10 = allCombinations.slice(0, 9);
console.log("F");

//stream the output to file
// const stream = fs.createWriteStream("allCombIntz.json");
// const jsonStream = JSONStream.stringify();
// jsonStream.pipe(stream);

// // Assuming allCombinations is an array
// allCombinations.forEach((combination) => {
//   jsonStream.write(combination);
// });

// jsonStream.end();

console.log("G");

let top10File = JSON.stringify(top10);
fs.writeFileSync("TopTenz.json", top10File, "utf-8");
