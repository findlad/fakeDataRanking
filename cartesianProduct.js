import { phase1, phase2, phase3, phase4 } from "./data.js";

// console.log(phase1[0]);

// function dateSort(phase) {
//   phase = phase.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
// }
// dateSort(phase1);

// console.log(phase1[0]);

const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

let interestRate = 0.15;
let freeMoney = 500000;
let startDay = "jan 01";

let phase1Comb = cartesian(...phase1);
let phase2Comb = cartesian(...phase2);
let phase3Comb = cartesian(...phase3);
let phase4Comb = cartesian(...phase4);

let allCombinations = cartesian(phase1Comb, phase2Comb, phase3Comb, phase4Comb);
let count = 0;
//for every iteration
allCombinations.forEach((iteration) => {
  //sort by work package end date
  iteration = iteration
    .filter((iter) => iter.phase === 1)
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

  //set variables for each iteration
  let runTotal = 0;
  let daysSinceLastBid = 0;
  let interestSinceLastBid = 0;
  let interestRunningTotal = 0;
  //lastProcessDate initially set to the end date of first bid
  let lastProcessDate = iteration[0].endDate;
  let inDebt = false;
  let debtStart = 0;

  iteration.forEach((bid) => {
    //calculate construction cost as we go
    runTotal = bid.cost + runTotal;
    bid.runningTotal = runTotal;

    //cost of money, we need to know interest rate, amount borrowed, and time its been borrowed
    //figure out time since last bid was processed
    daysSinceLastBid =
      (new Date(lastProcessDate) - new Date(bid.endDate)) / 86400000; //miliseconds to days

    //set lastprocessdate for the analysis of the next bid. This must update as we go along like running total
    lastProcessDate = bid.endDate;

    //figure out how far we are into the project
    bid.daysIntoProject = new Date(bid.endDate) - new Date(startDay);

    //test to see if we need to spend the loan
    if ((inDebt = true)) {
      //using borrowed money
      interestSinceLastBid =
        ((debtLevel * interestRate) / 365.25) * daysSinceLastBid;
      interestRunningTotal = interestRunningTotal + interestSinceLastBid;
      bid.costOfMoney = interestRunningTotal;
      debtLevel = bid.runningTotal - freeMoney;
      bid.borrowAmount = debtLevel;
    } else if (bid.runningTotal - freeMoney > 0) {
      //set up to calculate interest next time
      inDebt = true;
      debtStart = bid.endDate;
      debtLevel = bid.runningTotal - freeMoney;
      bid.costOfMoney = 0;
      bid.borrowAmount = debtLevel;
    } else {
      //using free money
      bid.costOfMoney = 0;
      bid.borrowAmount = 0;
    }
  });
  iteration.unshift({ iterationID: count, constructionCost: runTotal });

  count++;
});
// console.log(allCombinations[0]);
allCombinations.sort((a, b) => a[0].constructionCost - b[0].constructionCost);
let topTen = allCombinations.slice(0, 9);
console.log(topTen);
