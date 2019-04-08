var joi = require("../dist/utility/joi");

console.log(joi);

var newxl = new joi.Xlsx();
var sheet1 = newxl.sheet();
sheet1.selectCell("B3");
sheet1.freezePane(2, 2);
sheet1.selectCell("C2");

newxl.download();
