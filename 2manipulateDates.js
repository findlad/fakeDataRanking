import { addDaysToDate, subtractDaysFromDate } from "./timeAddFunctions.js";
import fs from "fs";
import { allCombinations } from "./1cartesianProduct.js";
//const combinations = fs.readFileSync("allComb.json", "utf-8");
let interestRate = 0.15;
let freeMoney = 50000;
let startDay = "jan 01 2024";
let count = 0;

//document all phases in dataset
let phaseNumberArray = [];
allCombinations[0].forEach((bid) => {
  if (phaseNumberArray.indexOf(bid.phase) === -1)
    phaseNumberArray.push(bid.phase);
});

function moveDatesForPhase(allComb) {
  allComb.forEach((iteration) => {
    let phaseStart = new Date(startDay);
    phaseNumberArray.forEach((phase) => {
      let jobsInPhase = iteration.filter((combo) => combo.phase === phase);
      jobsInPhase.sort((a, b) => b.length - a.length);
      let phaseEnd;

      jobsInPhase.forEach((bid) => {
        bid.phaseLength = jobsInPhase[0].length;
        bid.phaseStart = phaseStart;
        bid.endDate = addDaysToDate(phaseStart, Number(jobsInPhase[0].length));
        bid.startDate = subtractDaysFromDate(bid.endDate, Number(bid.length));
        phaseEnd = addDaysToDate(phaseStart, Number(jobsInPhase[0].length));
      });

      phaseStart = addDaysToDate(phaseEnd, 1);
    });

    iteration.sort((a, b) => a.workPackage - b.workPackage);
  });
}

moveDatesForPhase(allCombinations);

// dateOptimisedFile = JSON.stringify(combinations);
// fs.writeFileSync("dateOptimised.json", allCombFile, "utf-8");
export { allCombinations };
