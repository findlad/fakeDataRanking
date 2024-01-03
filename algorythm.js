import timeBlock1 from "./data.js";
console.log("timeblock1 ", timeBlock1);
import timeBlock2 from "./data.js";
console.log("timeblock2 ", timeBlock2);
import timeBlock3 from "./data.js";
console.log("timeblock3 ", timeBlock3);
import timeBlock4 from "./data.js";
console.log("timeblock4 ", timeBlock4);

let results = [];

let masterArray = [timeBlock1, timeBlock2, timeBlock3, timeBlock4];

timeBlock1.forEach((time1) => {
  timeBlock2.forEach((time2) => {
    timeBlock3.forEach((time3) => {
      timeBlock4.forEach((time4) => {
        results.push(
          time1.vendor,
          time1.cost,
          time2.vendor,
          time2.cost,
          time3.vendor,
          time3.cost,
          time4.vendor,
          time4.cost,
          { total: time1.cost + time2.cost + time3.cost + time4.cost }
        );
        console.log(time1.cost + time2.cost + time3.cost + time4.cost);
      });
    });
  });
});
