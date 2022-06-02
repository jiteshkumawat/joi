var joi = require("../dist/app/joi");
var fs = require('fs');

debugger;
fs.readFile('./playground/simple.xlsx', function (err, data) {
    if (err) {
      throw err; 
    }

    
    debugger;
    joi.xlsx.load(data, null, null, (file) => {
      debugger;
      file.sheet("new sheet");
      file.download("test.xlsx");
      });
  });