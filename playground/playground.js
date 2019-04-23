var joi = require("../dist/utility/joi");

console.log(joi);

var newxl = new joi.xlsx();
console.log(newxl);
var sheet = newxl.sheet();
//var cell = sheet.cell(1, 1, 5);
//console.log(JSON.stringify(cell));
newxl.download();
