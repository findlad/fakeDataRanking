let workPackage1 = [
  {
    workPackage: 1,
    concurrentWP: 1,
    vendor: "ericcson",
    uniform2: "abc",
    startDate: "jan 3",
    endDate: "jan 7",
    length: 4,
    cost: 5000,
    quote: false,
    ID: 54325,
  },
];

let workPackage2 = [
  {
    workPackage: 2,
    concurrentWP: 1,
    vendor: "dennys",
    uniform2: "abc",
    startDate: "jan 5",
    endDate: "jan 13",
    length: 8,
    cost: 10000,
    quote: false,
    ID: 54328,
  },
];

let workPackage3 = [
  {
    workPackage: 3,
    concurrentWP: 1,
    vendor: "dennys",
    uniform2: "abc",
    startDate: "jan 4",
    endDate: "jan 12",
    length: 8,
    cost: 12000,
    quote: false,
    ID: 54332,
  },
];

let workPackage4 = [
  {
    workPackage: 4,
    concurrentWP: 1,
    vendor: "bloomberg",
    uniform2: "abc",
    startDate: "jan 2",
    endDate: "jan 14",
    length: 12,
    cost: 90000,
    quote: false,
    ID: 54334,
  },
];

let workPackage5 = [
  {
    workPackage: 5,
    concurrentWP: 2,
    vendor: "amazon",
    uniform2: "abc",
    startDate: "feb 8",
    endDate: "feb 17",
    length: 9,
    cost: 80000,
    quote: false,
    ID: 54337,
  },
];

let workPackage6 = [
  {
    workPackage: 6,
    concurrentWP: 2,
    vendor: "bloomberg",
    uniform2: "abc",
    startDate: "feb 6",
    endDate: "feb 19",
    length: 13,
    cost: 88000,
    quote: false,
    ID: 54342,
  },
];

let workPackage7 = [
  {
    workPackage: 7,
    concurrentWP: 3,
    vendor: "coldgarden",
    uniform2: "abc",
    startDate: "mar 2",
    endDate: "mar 13",
    length: 11,
    cost: 80000,
    quote: true,
    ID: 54347,
  },
];

let workPackage8 = [
  {
    workPackage: 8,
    concurrentWP: 3,
    vendor: "bloomberg",
    uniform2: "abc",
    startDate: "mar 9",
    endDate: "mar 17",
    length: 8,
    cost: 85000,
    quote: false,
    ID: 54350,
  },
];

let workPackage9 = [
  {
    workPackage: 9,
    concurrentWP: 3,
    vendor: "bloomberg",
    uniform2: "abc",
    startDate: "mar 2",
    endDate: "mar 14",
    length: 12,
    cost: 90000,
    quote: false,
    ID: 54354,
  },
  {
    workPackage: 9,
    concurrentWP: 3,
    vendor: "coldgarden",
    uniform2: "abc",
    startDate: "mar 5",
    endDate: "mar 18",
    length: 13,
    cost: 100000,
    quote: true,
    ID: 54355,
  },
];

let concurrentWP1 = [workPackage1, workPackage2, workPackage3, workPackage4];
let concurrentWP2 = [workPackage5, workPackage6];
let concurrentWP3 = [workPackage7, workPackage8, workPackage9];

export { concurrentWP1, concurrentWP2, concurrentWP3 };
