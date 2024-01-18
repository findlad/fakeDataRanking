import { addDaysToDate, subtractDaysFromDate } from "./timeAddFunctions.js";
import fs from "fs";

const combinations = fs.readFileSync("allComb.json", "utf-8");

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

moveDatesForPhase(combinations);

dateOptimisedFile = JSON.stringify(combinations);
fs.writeFileSync("dateOptimised.json", allCombFile, "utf-8");
