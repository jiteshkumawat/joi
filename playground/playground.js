var joi = require("../dist/utility/joi");

console.log(joi);

var newxl = new joi.Xlsx()
.sheet()
.merge("A1:A5");

newxl.download();
