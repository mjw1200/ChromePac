const Boundary = Object.freeze({"left":0,"right":1203,"upper":0,"lower":550});
const Direction = Object.freeze({"right":1, "up":2, "down":3, "left":4});
const Arrow = Object.freeze({"up":38, "down":40, "left":37, "right":39});
const Mouth = Object.freeze({"open": 1, "closed" : 2, "half" : 3});

const animationInterval = 150;
const speed = 10;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
