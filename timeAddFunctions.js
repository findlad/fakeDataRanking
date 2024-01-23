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

// Function to convert date string to JS Date object
function convertToDate(dateString) {
  if (dateString && typeof dateString === "string") {
    const dateParts = dateString.split(" ");
    if (dateParts.length === 2) {
      const [month, day] = dateParts;
      const year = new Date().getFullYear(); // Assuming current year

      return new Date(`${month} ${day}, ${year}`);
    }
  }

  return null; // Return null for invalid date strings
}

export { addDaysToDate, subtractDaysFromDate, convertToDate };
