var joi = require("../dist/utility/joi");

console.log(joi);

var newxl = new joi.xlsx();
var sheet = newxl.sheet();
var cell = sheet.cell(1, 1, { value: "Hello World", type: "sharedString" });
console.log(JSON.stringify(cell));
newxl.download();
