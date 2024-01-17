//functions to add and subtract time

function addDaysToDate(dateInQuestion, daysForAdding) {
  var numberOfMlSeconds = dateInQuestion;
  var addMlSeconds = daysForAdding * 86400000;
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
  return newDateObj;
}
function subtractDaysFromDate(dateInQuestion, daysForAdding) {
  var numberOfMlSeconds = dateInQuestion;
  var addMlSeconds = daysForAdding * 86400000;
  var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
  return newDateObj;
}

export { addDaysToDate, subtractDaysFromDate };
