var joi = require("../dist/app/joi");
var fs = require('fs');

console.log(joi);

// fs.readFile('./playground/simple.xlsx', function (err, data) {
//     if (err) {
//       throw err; 
//     }

    
//     debugger;
//     joi.xlsx.load(data, function (newxl) {
//         console.log(newxl);
//       });
//   });

let doc = joi.xlsx("document.xlsx");
