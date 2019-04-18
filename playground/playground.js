var joi = require("../dist/utility/joi");

console.log(joi);

var newxl = new joi.Xlsx();
var sheet1 = newxl.sheet();
sheet1.merge("A1:A5");
newxl.download();
