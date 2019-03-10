const leftBoundary = 0;
const rightBoundary = 1203;
const upperBoundary = 0;
const lowerBoundary = 550;

const Direction = Object.freeze({"right":1, "up":2, "down":3, "left":4});

const debugging = false;

const canvas = document.getElementById("canvas"); // $("#canvas")[0];
const ctx = canvas.getContext("2d");

