import fs from "fs";
import { addDaysToDate, subtractDaysFromDate } from "./timeAddFunctions.js";
import { allCombinations } from "./2manipulateDates.js";

//fs crashing everything
//const allCombinations = fs.readFileSync("dateOptomised.json", "utf-8");

console.log("A");

let interestRate = 0.15;
let freeMoney = 50000;
let startDay = "jan 01 2025";
let count = 0;

console.log("B");

for (let i = 0; i < 250; i++) {
  //TESTING sort by work package end date
  allCombinations[i] = allCombinations[i]
    .filter((iter) => iter.phase > 0)
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
  //lastProcessDate initially set to the end date of first bid allCombinations[i] for testing iteration[0] for real
  let lastProcessDate = allCombinations[i].endDate;

  allCombinations[i].forEach((bid) => {
    //calculate construction cost as we go
    runTotal = bid.cost + runTotal;
    bid.runningTotal = runTotal;

    //cost of money, we need to know interest rate, amount borrowed, and time its been borrowed
    //figure out time since last bid was processed
    daysSinceLastBid =
      (new Date(bid.endDate) - new Date(lastProcessDate)) / 86400000; //miliseconds to days

    //set lastprocessdate for the analysis of the next bid. This must update as we go along like running total
    lastProcessDate = bid.endDate;

    //figure out how far we are into the project
    bid.daysIntoProject =
      (new Date(bid.endDate) - new Date(startDay)) / 86400000;

    //test to see if we need to spend the loan
    if (inDebt === true) {
      //using borrowed money: simple interest! Do we need compound? Loan structure compounds monthly
      interestSinceLastBid =
        ((debtLevel * interestRate) / 365.25) * daysSinceLastBid;
      interestRunningTotal = interestRunningTotal + interestSinceLastBid;
      bid.costOfMoney = interestRunningTotal;
      //set new debt level for the analysis of the next bid
      debtLevel = runTotal - freeMoney;
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
  });
  //iteration for real, allCombinations[i] for testing]
  allCombinations[i].unshift({
    iterationID: count,
    constructionCost: runTotal,
    interest: interestRunningTotal.toFixed(2),
    totalCost: Number(runTotal) + Number(interestRunningTotal.toFixed(2)),
  });

  count++;
}
console.log("D");
//sort by total cost and save out to a specific array
allCombinations.sort((a, b) => a[0].totalCost - b[0].totalCost);
console.log("E");
// allCombInterest = JSON.stringify(allCombinations);
// fs.writeFileSync("allCombInt.json", allCombInterest, "utf-8");
let top100 = allCombinations.slice(0, 99);
console.log("F");
top100File = JSON.stringify(top100);
// fs.writeFileSync("TopTen.json", top100File, "utf-8");
//nothing saves out
var writeStream = fs.createWriteStream("top100.msp");
console.log("7");
var encodeStream = msgpack.createEncodeStream();
console.log("8");
encodeStream.pipe(writeStream);
console.log("9");
// send multiple objects to stream
encodeStream.write(top100File);
console.log("10");
// call this once you're done writing to the stream.
encodeStream.end();

console.log(topTen);
