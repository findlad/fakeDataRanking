// import { debtLevel, interestRate, noOfCompoundsPerYear } from "3costofMoney.js";
let interestRate = 0.15;
function setInterestRate(newInterestRate) {
  interestRate = newInterestRate;
}
let noOfCompoundsPerYear = 365;
function setCompounds(newCompound) {
  noOfCompoundsPerYear = newCompound;
}

function calculateInterest(debtLevel, days) {
  return (
    debtLevel * Math.pow(1 + interestRate / noOfCompoundsPerYear, days) -
    debtLevel
  );
}

export { calculateInterest, setInterestRate, setCompounds };
