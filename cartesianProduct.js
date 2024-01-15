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

  let runTotal = 0;
  iteration.forEach((bid) => {
    //calculate construction cost as we go
    runTotal = bid.cost + runTotal;
    bid.runningTotal = runTotal;
    //cost of money, we need ot know interest rate, amount borrowed, and time its been borrowed
    //figure out how far we are into the project
    bid.daysIntoProject = new Date(bid.endDate) - new Date(startDay);

    let interest = 0;
    //test to see if were using the loan
    if (bid.runningTotal - freeMoney > 0) {
      //using borrowed money
      bid.lastProcessDate = bid.endDate;
      //using free money
    } else {
      bid.costOfMoney = 0;
      bid.lastProcessDate = bid.endDate;
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
