// import { RowNode } from "../../../../entities/xlsx/nodes/rowNode";
// import { expect } from "chai";

// describe("RowNode", function() {
//   describe("initialize", function() {
//     it("defines default values", function() {
//       // ARRANGE, ACT
//       this.rowNode = new RowNode(2);

//       // ASSERT
//       this.message = `
//       Defines a node row.
//       Actual Result: ${this.rowNode.name}
//       Expected Result: row
//       `;
//       expect(this.rowNode.name, this.message).equal("row");

//       this.message = `
//       Defines a node row with index.
//       Actual Result: ${this.rowNode.index}
//       Expected Result: 2
//       `;
//       expect(this.rowNode.index, this.message).equal(2);

//       this.message = `
//       Defines a node row with attribute r.
//       Actual Result: ${this.rowNode.attributes[0].name}
//       Expected Result: r
//       `;
//       expect(this.rowNode.attributes[0].name, this.message).equal("r");

//       this.message = `
//       Defines a node row with attribute r value.
//       Actual Result: ${this.rowNode.attributes[0].value}
//       Expected Result: 2
//       `;
//       expect(this.rowNode.attributes[0].value, this.message).equal("2");
//     });
//   });

//   describe("index property", function() {
//     it("gets and sets the attribute r of row", function() {
//       // ARRANGE
//       this.rowNode = new RowNode(2);

//       // ACT
//       this.rowNode.index = 3;

//       // ASSERT
//       this.message = `
//         Updates the row attribute.
//         Actual Result: ${this.rowNode.attribute("r").value}
//         Expected Result: 3
//         `;
//       expect(this.rowNode.attribute("r").value, this.message).equal("3");

//       this.message = `
//         Updates the row index.
//         Actual Result: ${this.rowNode.index}
//         Expected Result: 3
//         `;
//       expect(this.rowNode.index, this.message).equal(3);
//     });
//   });

//   describe("getCell method", function() {
//     it("gets cell when defined", function() {
//       // ARRANGE
//       this.rowNode = new RowNode(1);
//       this.rowNode.cell("A2");

//       // ACT
//       this.result = this.rowNode.getCell("A2");

//       // ASSERT
//       this.message = `
//       Get cell node
//       Actual Result: ${this.result.name}
//       Expected Result: c
//       `;
//       expect(this.result.name, this.message).equal("c");

//       this.message = `
//       Get cell node with r attribute
//       Actual Result: ${this.result.attribute("r").value}
//       Expected Result: A2
//       `;
//       expect(this.result.attribute("r").value, this.message).equal("A2");

//       this.message = `
//       Get cell node with t attribute
//       Actual Result: ${this.result.attribute("t").value}
//       Expected Result: inlineStr
//       `;
//       expect(this.result.attribute("t").value, this.message).equal("inlineStr");
//     });

//     it("gets undefined when no child is defined", function() {
//       // ARRANGE
//       this.rowNode = new RowNode(1);

//       // ACT
//       this.result = this.rowNode.getCell("A2");

//       // ASSERT
//       this.message = `
//         Get undefined
//         Actual Result: ${this.result}
//         Expected Result: undefined
//         `;
//       expect(this.result, this.message).equal(undefined);
//     });

//     it("gets undefined when node defined", function() {
//       // ARRANGE
//       this.rowNode = new RowNode(1);
//       this.rowNode.cell("A1");

//       // ACT
//       this.result = this.rowNode.getCell("A2");

//       // ASSERT
//       this.message = `
//         Get undefined
//         Actual Result: ${this.result}
//         Expected Result: undefined
//         `;
//       expect(this.result, this.message).equal(undefined);
//     });
//   });

//   describe("cell method", function() {
//     it("gets cell when defined", function() {
//       // ARRANGE
//       this.rowNode = new RowNode(1);
//       this.rowNode.cell("A2");

//       // ACT
//       this.result = this.rowNode.cell("A2");

//       // ASSERT
//       this.message = `
//       Get cell node
//       Actual Result: ${this.result.name}
//       Expected Result: c
//       `;
//       expect(this.result.name, this.message).equal("c");

//       this.message = `
//       Get cell node with value
//       Actual Result: ${this.result.attribute("r").value}
//       Expected Result: A2
//       `;
//       expect(this.result.attribute("r").value, this.message).equal("A2");

//       this.message = `
//       Get cell node with t attribute
//       Actual Result: ${this.result.attribute("t").value}
//       Expected Result: inlineStr
//       `;
//       expect(this.result.attribute("t").value, this.message).equal("inlineStr");
//     });

//     it("adds cell when not defined", function() {
//       // ARRANGE
//       this.rowNode = new RowNode(1);

//       // ACT
//       this.result = this.rowNode.cell("A2");

//       // ASSERT
//       this.message = `
//       Get cell node
//       Actual Result: ${this.result.name}
//       Expected Result: c
//       `;
//       expect(this.result.name, this.message).equal("c");

//       this.message = `
//       Get cell node with value
//       Actual Result: ${this.result.attribute("r").value}
//       Expected Result: A2
//       `;
//       expect(this.result.attribute("r").value, this.message).equal("A2");

//       this.message = `
//       Get cell node with t attribute
//       Actual Result: ${this.result.attribute("t").value}
//       Expected Result: inlineStr
//       `;
//       expect(this.result.attribute("t").value, this.message).equal("inlineStr");
//     });
//   });
// });
