import fs from "fs";

const combinations = fs.readFileSync("dateOptomised.json", "utf-8");

//REAL THINGfor every iteration, uncoment this and comment out the for loop when you want to do everything
//allCombinations.forEach((iteration) => {
// iteration = iteration
//   .filter((iter) => iter.phase > 0)
//   .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
//for loop for testing
for (let i = 0; i < combinations.length; i++) {
  //TESTING sort by work package end date
  combinations[i] = combinations[i]
    .filter((iter) => iter.phase > 0)
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

  //set variables for each iteration
  let runTotal = 0;
  let daysSinceLastBid = 0;
  let interestSinceLastBid = 0;
  let interestRunningTotal = 0;
  let inDebt = false;
  let debtStart = 0;
  let debtLevel = 0;
  //lastProcessDate initially set to the end date of first bid combinations[i] for testing iteration[0] for real
  let lastProcessDate = combinations[i].endDate;

  combinations[i].forEach((bid) => {
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
      //using borrowed money: simple interest! Do we need compound?
      interestSinceLastBid =
        ((debtLevel * interestRate) / 365.25) * daysSinceLastBid;
      interestRunningTotal = interestRunningTotal + interestSinceLastBid;
      bid.costOfMoney = interestRunningTotal;
      //set new debt level for the analysis of the next bid
      debtLevel = runTotal - freeMoney;
      //havent paid nay interest yet! only just borrowed it
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
  //iteration for real, combinations[i] for testing]
  combinations[i].unshift({
    iterationID: count,
    constructionCost: runTotal,
    interest: interestRunningTotal.toFixed(2),
    totalCost: Number(runTotal) + Number(interestRunningTotal.toFixed(2)),
  });

  count++;
}

//sort by total cost and save out to a specific array
combinations.sort((a, b) => a[0].totalCost - b[0].totalCost);
allCombInterest = JSON.stringify(combinations);
fs.writeFileSync("TopTen", allCombInterest, "utf-8");
let topTen = combinations.slice(0, 9);
topTenFile = JSON.stringify(topTen);
fs.writeFileSync("TopTen", topTenFile, "utf-8");
console.log(topTen);
