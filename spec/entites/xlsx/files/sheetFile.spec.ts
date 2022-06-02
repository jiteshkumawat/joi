// import { SheetFile } from "../../../../entities/xlsx/files/sheetFile";
// import { expect } from "chai";
// import { Attribute } from "../../../../entities/base/attribute";
// import { Node } from "../../../../entities/base/node";
// import { RowNode } from "../../../../entities/xlsx/nodes/rowNode";

// xdescribe("Relationships", function() {
//   describe("initialize", function() {
//     it("define default values without parameters", function() {
//       // ARRANGE, ACT
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ASSERT
//       this.message = `
//           Namespace should be defined.
//           Actual Result: ${this.sheetFile.rootNode.namespaces[0].value}
//           Expected Result: http://schemas.openxmlformats.org/spreadsheetml/2006/main
//           `;
//       expect(this.sheetFile.rootNode.namespaces[0].value, this.message).equal(
//         "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
//       );

//       this.message = `
//           Name should be defined.
//           Actual Result: ${this.sheetFile.rootNode.name}
//           Expected Result: worksheet
//           `;
//       expect(this.sheetFile.rootNode.name, this.message).equal("worksheet");

//       this.message = `
//           FileName should be defined.
//           Actual Result: ${this.sheetFile.fileName}
//           Expected Result: sheet1.xml
//           `;
//       expect(this.sheetFile.fileName, this.message).equal("sheet1.xml");

//       this.message = `
//           FilePath should be defined.
//           Actual Result: ${this.sheetFile.filePath}
//           Expected Result: workbook/sheets
//           `;
//       expect(this.sheetFile.filePath, this.message).equal("workbook/sheets");

//       this.message = `
//           rId should be defined.
//           Actual Result: ${this.sheetFile.rId}
//           Expected Result: rId1
//           `;
//       expect(this.sheetFile.rId, this.message).equal("rId1");

//       this.message = `
//           id should be defined.
//           Actual Result: ${this.sheetFile.id}
//           Expected Result: id
//           `;
//       expect(this.sheetFile.id, this.message).equal(1);

//       this.message = `
//           name should be defined.
//           Actual Result: ${this.sheetFile.name}
//           Expected Result: Sheet1
//           `;
//       expect(this.sheetFile.name, this.message).equal("Sheet1");

//       this.message = `
//           sheetData should be defined.
//           Actual Result: ${this.sheetFile.rootNode.children[1].name}
//           Expected Result: sheetData
//           `;
//       expect(this.sheetFile.rootNode.children[1].name, this.message).equal(
//         "sheetData"
//       );

//       this.message = `
//           sheetData should be defined.
//           Actual Result: ${this.sheetFile.rootNode.children[1].name}
//           Expected Result: sheetData
//           `;
//       expect(this.sheetFile.rootNode.children[1].name, this.message).equal(
//         "sheetData"
//       );

//       this.message = `
//           tabSelected should be defined.
//           Actual Result: ${this.sheetFile.tabSelected instanceof Attribute}
//           Expected Result: true
//           `;
//       expect(
//         this.sheetFile.tabSelected instanceof Attribute,
//         this.message
//       ).equal(true);

//       this.message = `
//           pane should be defined.
//           Actual Result: ${this.sheetFile.pane instanceof Node}
//           Expected Result: true
//           `;
//       expect(this.sheetFile.pane instanceof Node, this.message).equal(true);

//       this.message = `
//           pane should be inactive.
//           Actual Result: ${this.sheetFile.pane.isActive}
//           Expected Result: false
//           `;
//       expect(this.sheetFile.pane.isActive, this.message).equal(false);

//       this.message = `
//           pane state should be defined.
//           Actual Result: ${this.sheetFile.pane.attributes[0].name}
//           Expected Result: state
//           `;
//       expect(this.sheetFile.pane.attributes[0].name, this.message).equal(
//         "state"
//       );

//       this.message = `
//           pane state should have value.
//           Actual Result: ${this.sheetFile.pane.attributes[0].value}
//           Expected Result: frozen
//           `;
//       expect(this.sheetFile.pane.attributes[0].value, this.message).equal(
//         "frozen"
//       );

//       this.message = `
//           pane activePane should be defined.
//           Actual Result: ${this.sheetFile.pane.attributes[1].name}
//           Expected Result: activePane
//           `;
//       expect(this.sheetFile.pane.attributes[1].name, this.message).equal(
//         "activePane"
//       );

//       this.message = `
//           pane activePane should have value.
//           Actual Result: ${this.sheetFile.pane.attributes[1].value}
//           Expected Result: topRight
//           `;
//       expect(this.sheetFile.pane.attributes[1].value, this.message).equal(
//         "topRight"
//       );

//       this.message = `
//           pane topLeftCell should be defined.
//           Actual Result: ${this.sheetFile.pane.attributes[2].name}
//           Expected Result: topLeftCell
//           `;
//       expect(this.sheetFile.pane.attributes[2].name, this.message).equal(
//         "topLeftCell"
//       );

//       this.message = `
//           pane topLeftCell should have value.
//           Actual Result: ${this.sheetFile.pane.attributes[2].value}
//           Expected Result: A1
//           `;
//       expect(this.sheetFile.pane.attributes[2].value, this.message).equal("A1");

//       this.message = `
//           pane ySplit should be defined.
//           Actual Result: ${this.sheetFile.pane.attributes[3].name}
//           Expected Result: ySplit
//           `;
//       expect(this.sheetFile.pane.attributes[3].name, this.message).equal(
//         "ySplit"
//       );

//       this.message = `
//           pane ySplit should have value.
//           Actual Result: ${this.sheetFile.pane.attributes[3].value}
//           Expected Result: 1
//           `;
//       expect(this.sheetFile.pane.attributes[3].value, this.message).equal("1");

//       this.message = `
//           pane xSplit should be defined.
//           Actual Result: ${this.sheetFile.pane.attributes[4].name}
//           Expected Result: xSplit
//           `;
//       expect(this.sheetFile.pane.attributes[4].name, this.message).equal(
//         "xSplit"
//       );

//       this.message = `
//           pane xSplit should have value.
//           Actual Result: ${this.sheetFile.pane.attributes[4].value}
//           Expected Result: 1
//           `;
//       expect(this.sheetFile.pane.attributes[4].value, this.message).equal("1");

//       this.message = `
//           selections should be defined.
//           Actual Result: ${this.sheetFile.selections instanceof Node}
//           Expected Result: true
//           `;
//       expect(this.sheetFile.selections[0] instanceof Node, this.message).equal(
//         true
//       );

//       this.message = `
//           selections should be defined.
//           Actual Result: ${this.sheetFile.selections[0] instanceof Node}
//           Expected Result: true
//           `;
//       expect(this.sheetFile.selections[0] instanceof Node, this.message).equal(
//         true
//       );

//       this.message = `
//           selections should have sqref attribute.
//           Actual Result: ${this.sheetFile.selections[0].attributes[0].name}
//           Expected Result: sqref
//           `;
//       expect(
//         this.sheetFile.selections[0].attributes[0].name,
//         this.message
//       ).equal("sqref");

//       this.message = `
//           selections should have activeCell attribute.
//           Actual Result: ${this.sheetFile.selections[0].attributes[1].name}
//           Expected Result: activeCell
//           `;
//       expect(
//         this.sheetFile.selections[0].attributes[1].name,
//         this.message
//       ).equal("activeCell");

//       this.message = `
//           First cell should be selected.
//           Actual Result: ${this.sheetFile.selections[0].attributes[0].value}
//           Expected Result: A1
//           `;
//       expect(
//         this.sheetFile.selections[0].attributes[0].value,
//         this.message
//       ).equal("A1");

//       this.message = `
//           First cell should be active.
//           Actual Result: ${this.sheetFile.selections[0].attributes[1].value}
//           Expected Result: A1
//           `;
//       expect(
//         this.sheetFile.selections[0].attributes[1].value,
//         this.message
//       ).equal("A1");
//     });
//   });

//   describe("addSelection method", function() {
//     it("add without parameter", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.sheetFile.addSelection();

//       // ASSERT
//       this.message = `
//           Adds a new node selection.
//           Actual Result: ${this.sheetFile.selections[1].name}
//           Expected Result: selection
//           `;
//       expect(this.sheetFile.selections[1].name, this.message).equal(
//         "selection"
//       );

//       this.message = `
//           Selection has attribute sqref.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].name}
//           Expected Result: sqref
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].name,
//         this.message
//       ).equal("sqref");

//       this.message = `
//           Selection has attribute sqref value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].value}
//           Expected Result: A1
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].value,
//         this.message
//       ).equal("A1");

//       this.message = `
//           Selection has attribute sqref disabled.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].isActive}
//           Expected Result: false
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].isActive,
//         this.message
//       ).equal(false);

//       this.message = `
//           Selection has attribute activeCell.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].name}
//           Expected Result: activeCell
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].name,
//         this.message
//       ).equal("activeCell");

//       this.message = `
//           Selection has attribute activeCell value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].value}
//           Expected Result: A1
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].value,
//         this.message
//       ).equal("A1");

//       this.message = `
//           Selection has attribute activeCell isActive.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].isActive}
//           Expected Result: false
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].isActive,
//         this.message
//       ).equal(false);

//       this.message = `
//           Selection has attribute pane.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].name}
//           Expected Result: pane
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].name,
//         this.message
//       ).equal("pane");

//       this.message = `
//           Selection has attribute pane value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].value}
//           Expected Result: bottomRight
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].value,
//         this.message
//       ).equal("bottomRight");

//       this.message = `
//           Selection has attribute pane disabled.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].isActive}
//           Expected Result: false
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].isActive,
//         this.message
//       ).equal(false);
//     });

//     it("add with activeCell", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.sheetFile.addSelection("A3");

//       // ASSERT
//       this.message = `
//           Adds a new node selection.
//           Actual Result: ${this.sheetFile.selections[1].name}
//           Expected Result: selection
//           `;
//       expect(this.sheetFile.selections[1].name, this.message).equal(
//         "selection"
//       );

//       this.message = `
//           Selection has attribute sqref.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].name}
//           Expected Result: sqref
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].name,
//         this.message
//       ).equal("sqref");

//       this.message = `
//           Selection has attribute sqref value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].value}
//           Expected Result: A3
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].value,
//         this.message
//       ).equal("A3");

//       this.message = `
//           Selection has attribute sqref disabled.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].isActive}
//           Expected Result: true
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].isActive,
//         this.message
//       ).equal(true);

//       this.message = `
//           Selection has attribute activeCell.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].name}
//           Expected Result: activeCell
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].name,
//         this.message
//       ).equal("activeCell");

//       this.message = `
//           Selection has attribute activeCell value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].value}
//           Expected Result: A3
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].value,
//         this.message
//       ).equal("A3");

//       this.message = `
//           Selection has attribute activeCell isActive.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].isActive}
//           Expected Result: true
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].isActive,
//         this.message
//       ).equal(true);

//       this.message = `
//           Selection has attribute pane.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].name}
//           Expected Result: pane
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].name,
//         this.message
//       ).equal("pane");

//       this.message = `
//           Selection has attribute pane value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].value}
//           Expected Result: bottomRight
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].value,
//         this.message
//       ).equal("bottomRight");

//       this.message = `
//           Selection has attribute pane disabled.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].isActive}
//           Expected Result: false
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].isActive,
//         this.message
//       ).equal(false);
//     });

//     it("add with activeCell, pane", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.sheetFile.addSelection("A3", "bottomLeft");

//       // ASSERT
//       this.message = `
//           Adds a new node selection.
//           Actual Result: ${this.sheetFile.selections[1].name}
//           Expected Result: selection
//           `;
//       expect(this.sheetFile.selections[1].name, this.message).equal(
//         "selection"
//       );

//       this.message = `
//           Selection has attribute sqref.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].name}
//           Expected Result: sqref
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].name,
//         this.message
//       ).equal("sqref");

//       this.message = `
//           Selection has attribute sqref value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].value}
//           Expected Result: A3
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].value,
//         this.message
//       ).equal("A3");

//       this.message = `
//           Selection has attribute sqref disabled.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].isActive}
//           Expected Result: true
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].isActive,
//         this.message
//       ).equal(true);

//       this.message = `
//           Selection has attribute activeCell.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].name}
//           Expected Result: activeCell
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].name,
//         this.message
//       ).equal("activeCell");

//       this.message = `
//           Selection has attribute activeCell value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].value}
//           Expected Result: A3
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].value,
//         this.message
//       ).equal("A3");

//       this.message = `
//           Selection has attribute activeCell isActive.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].isActive}
//           Expected Result: true
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].isActive,
//         this.message
//       ).equal(true);

//       this.message = `
//           Selection has attribute pane.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].name}
//           Expected Result: pane
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].name,
//         this.message
//       ).equal("pane");

//       this.message = `
//           Selection has attribute pane value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].value}
//           Expected Result: bottomLeft
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].value,
//         this.message
//       ).equal("bottomLeft");

//       this.message = `
//           Selection has attribute pane disabled.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].isActive}
//           Expected Result: false
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].isActive,
//         this.message
//       ).equal(false);
//     });

//     it("add with activeCell, pane, sqref", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.sheetFile.addSelection("A3", "bottomLeft", "A2");

//       // ASSERT
//       this.message = `
//           Adds a new node selection.
//           Actual Result: ${this.sheetFile.selections[1].name}
//           Expected Result: selection
//           `;
//       expect(this.sheetFile.selections[1].name, this.message).equal(
//         "selection"
//       );

//       this.message = `
//           Selection has attribute sqref.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].name}
//           Expected Result: sqref
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].name,
//         this.message
//       ).equal("sqref");

//       this.message = `
//           Selection has attribute sqref value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].value}
//           Expected Result: A2
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].value,
//         this.message
//       ).equal("A2");

//       this.message = `
//           Selection has attribute sqref disabled.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].isActive}
//           Expected Result: true
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].isActive,
//         this.message
//       ).equal(true);

//       this.message = `
//           Selection has attribute activeCell.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].name}
//           Expected Result: activeCell
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].name,
//         this.message
//       ).equal("activeCell");

//       this.message = `
//           Selection has attribute activeCell value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].value}
//           Expected Result: A3
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].value,
//         this.message
//       ).equal("A3");

//       this.message = `
//           Selection has attribute activeCell isActive.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].isActive}
//           Expected Result: true
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].isActive,
//         this.message
//       ).equal(true);

//       this.message = `
//           Selection has attribute pane.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].name}
//           Expected Result: pane
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].name,
//         this.message
//       ).equal("pane");

//       this.message = `
//           Selection has attribute pane value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].value}
//           Expected Result: bottomLeft
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].value,
//         this.message
//       ).equal("bottomLeft");

//       this.message = `
//           Selection has attribute pane disabled.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].isActive}
//           Expected Result: false
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].isActive,
//         this.message
//       ).equal(false);
//     });

//     it("add with activeCell, pane, sqref, activePane", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.sheetFile.addSelection("A3", "bottomLeft", "A2", true);

//       // ASSERT
//       this.message = `
//           Adds a new node selection.
//           Actual Result: ${this.sheetFile.selections[1].name}
//           Expected Result: selection
//           `;
//       expect(this.sheetFile.selections[1].name, this.message).equal(
//         "selection"
//       );

//       this.message = `
//           Selection has attribute sqref.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].name}
//           Expected Result: sqref
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].name,
//         this.message
//       ).equal("sqref");

//       this.message = `
//           Selection has attribute sqref value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].value}
//           Expected Result: A2
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].value,
//         this.message
//       ).equal("A2");

//       this.message = `
//           Selection has attribute sqref disabled.
//           Actual Result: ${this.sheetFile.selections[1].attributes[0].isActive}
//           Expected Result: true
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[0].isActive,
//         this.message
//       ).equal(true);

//       this.message = `
//           Selection has attribute activeCell.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].name}
//           Expected Result: activeCell
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].name,
//         this.message
//       ).equal("activeCell");

//       this.message = `
//           Selection has attribute activeCell value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].value}
//           Expected Result: A3
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].value,
//         this.message
//       ).equal("A3");

//       this.message = `
//           Selection has attribute activeCell isActive.
//           Actual Result: ${this.sheetFile.selections[1].attributes[1].isActive}
//           Expected Result: true
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[1].isActive,
//         this.message
//       ).equal(true);

//       this.message = `
//           Selection has attribute pane.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].name}
//           Expected Result: pane
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].name,
//         this.message
//       ).equal("pane");

//       this.message = `
//           Selection has attribute pane value.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].value}
//           Expected Result: bottomLeft
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].value,
//         this.message
//       ).equal("bottomLeft");

//       this.message = `
//           Selection has attribute pane disabled.
//           Actual Result: ${this.sheetFile.selections[1].attributes[2].isActive}
//           Expected Result: true
//           `;
//       expect(
//         this.sheetFile.selections[1].attributes[2].isActive,
//         this.message
//       ).equal(true);
//     });
//   });

//   describe("clearSelection method", function() {
//     it("clear selections", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");
//       this.sheetFile.addSelection("A3");

//       // ACT
//       this.sheetFile.clearSelections();

//       // ASSERT
//       this.message = `
//           pane should be defined.
//           Actual Result: ${this.sheetFile.pane instanceof Node}
//           Expected Result: true
//           `;
//       expect(this.sheetFile.pane instanceof Node, this.message).equal(true);

//       this.message = `
//           pane should be inactive.
//           Actual Result: ${this.sheetFile.pane.isActive}
//           Expected Result: false
//           `;
//       expect(this.sheetFile.pane.isActive, this.message).equal(false);

//       this.message = `
//           pane state should be defined.
//           Actual Result: ${this.sheetFile.pane.attributes[0].name}
//           Expected Result: state
//           `;
//       expect(this.sheetFile.pane.attributes[0].name, this.message).equal(
//         "state"
//       );

//       this.message = `
//           pane state should have value.
//           Actual Result: ${this.sheetFile.pane.attributes[0].value}
//           Expected Result: frozen
//           `;
//       expect(this.sheetFile.pane.attributes[0].value, this.message).equal(
//         "frozen"
//       );

//       this.message = `
//           pane activePane should be defined.
//           Actual Result: ${this.sheetFile.pane.attributes[1].name}
//           Expected Result: activePane
//           `;
//       expect(this.sheetFile.pane.attributes[1].name, this.message).equal(
//         "activePane"
//       );

//       this.message = `
//           pane activePane should have value.
//           Actual Result: ${this.sheetFile.pane.attributes[1].value}
//           Expected Result: topRight
//           `;
//       expect(this.sheetFile.pane.attributes[1].value, this.message).equal(
//         "topRight"
//       );

//       this.message = `
//           pane topLeftCell should be defined.
//           Actual Result: ${this.sheetFile.pane.attributes[2].name}
//           Expected Result: topLeftCell
//           `;
//       expect(this.sheetFile.pane.attributes[2].name, this.message).equal(
//         "topLeftCell"
//       );

//       this.message = `
//           pane topLeftCell should have value.
//           Actual Result: ${this.sheetFile.pane.attributes[2].value}
//           Expected Result: A1
//           `;
//       expect(this.sheetFile.pane.attributes[2].value, this.message).equal("A1");

//       this.message = `
//           pane ySplit should be defined.
//           Actual Result: ${this.sheetFile.pane.attributes[3].name}
//           Expected Result: ySplit
//           `;
//       expect(this.sheetFile.pane.attributes[3].name, this.message).equal(
//         "ySplit"
//       );

//       this.message = `
//           pane ySplit should have value.
//           Actual Result: ${this.sheetFile.pane.attributes[3].value}
//           Expected Result: 1
//           `;
//       expect(this.sheetFile.pane.attributes[3].value, this.message).equal("1");

//       this.message = `
//           pane xSplit should be defined.
//           Actual Result: ${this.sheetFile.pane.attributes[4].name}
//           Expected Result: xSplit
//           `;
//       expect(this.sheetFile.pane.attributes[4].name, this.message).equal(
//         "xSplit"
//       );

//       this.message = `
//           pane xSplit should have value.
//           Actual Result: ${this.sheetFile.pane.attributes[4].value}
//           Expected Result: 1
//           `;
//       expect(this.sheetFile.pane.attributes[4].value, this.message).equal("1");

//       this.message = `
//           selections should be defined.
//           Actual Result: ${this.sheetFile.selections instanceof Node}
//           Expected Result: true
//           `;
//       expect(this.sheetFile.selections[0] instanceof Node, this.message).equal(
//         true
//       );

//       this.message = `
//           selections should be defined.
//           Actual Result: ${this.sheetFile.selections[0] instanceof Node}
//           Expected Result: true
//           `;
//       expect(this.sheetFile.selections[0] instanceof Node, this.message).equal(
//         true
//       );

//       this.message = `
//           selections should have sqref attribute.
//           Actual Result: ${this.sheetFile.selections[0].attributes[0].name}
//           Expected Result: sqref
//           `;
//       expect(
//         this.sheetFile.selections[0].attributes[0].name,
//         this.message
//       ).equal("sqref");

//       this.message = `
//           selections should have activeCell attribute.
//           Actual Result: ${this.sheetFile.selections[0].attributes[1].name}
//           Expected Result: activeCell
//           `;
//       expect(
//         this.sheetFile.selections[0].attributes[1].name,
//         this.message
//       ).equal("activeCell");

//       this.message = `
//           First cell should be selected.
//           Actual Result: ${this.sheetFile.selections[0].attributes[0].value}
//           Expected Result: A1
//           `;
//       expect(
//         this.sheetFile.selections[0].attributes[0].value,
//         this.message
//       ).equal("A1");

//       this.message = `
//           First cell should be active.
//           Actual Result: ${this.sheetFile.selections[0].attributes[1].value}
//           Expected Result: A1
//           `;
//       expect(
//         this.sheetFile.selections[0].attributes[1].value,
//         this.message
//       ).equal("A1");
//     });
//   });

//   describe("addCol method", function() {
//     it("add non hidden column with best fit width and custom width", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.result = this.sheetFile.addCol(2, 3, 50, true, false);

//       // Assert
//       this.message = `
//       Add new cols node if not already
//       Actual Result: ${this.sheetFile.rootNode.child("cols") instanceof Node}
//       Expected Result: true
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols") instanceof Node,
//         this.message
//       ).equal(true);

//       this.message = `
//       Add new col node
//       Actual Result: ${this.sheetFile.rootNode.child("cols").children[0].name}
//       Expected Result: col
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].name,
//         this.message
//       ).equal("col");

//       this.message = `
//       Add new col node attribute min
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("min").value
//       }
//       Expected Result: 2
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("min")
//           .value,
//         this.message
//       ).equal("2");

//       this.message = `
//       Add new col node attribute max
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("max").value
//       }
//       Expected Result: 3
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("max")
//           .value,
//         this.message
//       ).equal("3");

//       this.message = `
//       Add new col node attribute width
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("width")
//           .value
//       }
//       Expected Result: 50
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("width")
//           .value,
//         this.message
//       ).equal("50");

//       this.message = `
//       Add new col node attribute customWidth
//       Actual Result: ${
//         this.sheetFile.rootNode
//           .child("cols")
//           .children[0].attribute("customWidth").value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode
//           .child("cols")
//           .children[0].attribute("customWidth").value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Add new col node attribute bestFit
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("bestFit")
//           .value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("bestFit")
//           .value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Result to be node
//       Actual Result: ${this.result instanceof Node}
//       Expected Result: true
//       `;
//       expect(this.result instanceof Node, this.message).equal(true);
//     });

//     it("add non hidden column with best fit width", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.result = this.sheetFile.addCol(2, 5, 0, true, false);

//       // Assert
//       this.message = `
//       Add new cols node if not already
//       Actual Result: ${this.sheetFile.rootNode.child("cols") instanceof Node}
//       Expected Result: true
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols") instanceof Node,
//         this.message
//       ).equal(true);

//       this.message = `
//       Add new col node
//       Actual Result: ${this.sheetFile.rootNode.child("cols").children[0].name}
//       Expected Result: col
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].name,
//         this.message
//       ).equal("col");

//       this.message = `
//       Add new col node attribute min
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("min").value
//       }
//       Expected Result: 2
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("min")
//           .value,
//         this.message
//       ).equal("2");

//       this.message = `
//       Add new col node attribute max
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("max").value
//       }
//       Expected Result: 5
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("max")
//           .value,
//         this.message
//       ).equal("5");

//       this.message = `
//       Add new col node attribute bestFit
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("bestFit")
//           .value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("bestFit")
//           .value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Result to be node
//       Actual Result: ${this.result instanceof Node}
//       Expected Result: true
//       `;
//       expect(this.result instanceof Node, this.message).equal(true);
//     });

//     it("add non hidden column with custom width", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.result = this.sheetFile.addCol(1, 1, 50, false, false);

//       // Assert
//       this.message = `
//       Add new cols node if not already
//       Actual Result: ${this.sheetFile.rootNode.child("cols") instanceof Node}
//       Expected Result: true
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols") instanceof Node,
//         this.message
//       ).equal(true);

//       this.message = `
//       Add new col node
//       Actual Result: ${this.sheetFile.rootNode.child("cols").children[0].name}
//       Expected Result: col
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].name,
//         this.message
//       ).equal("col");

//       this.message = `
//       Add new col node attribute min
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("min").value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("min")
//           .value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Add new col node attribute max
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("max").value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("max")
//           .value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Add new col node attribute width
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("width")
//           .value
//       }
//       Expected Result: 50
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("width")
//           .value,
//         this.message
//       ).equal("50");

//       this.message = `
//       Add new col node attribute customWidth
//       Actual Result: ${
//         this.sheetFile.rootNode
//           .child("cols")
//           .children[0].attribute("customWidth").value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode
//           .child("cols")
//           .children[0].attribute("customWidth").value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Result to be node
//       Actual Result: ${this.result instanceof Node}
//       Expected Result: true
//       `;
//       expect(this.result instanceof Node, this.message).equal(true);
//     });

//     it("add a hidden column", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.result = this.sheetFile.addCol(2, 3, 50, false, true);

//       // Assert
//       this.message = `
//       Add new cols node if not already
//       Actual Result: ${this.sheetFile.rootNode.child("cols") instanceof Node}
//       Expected Result: true
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols") instanceof Node,
//         this.message
//       ).equal(true);

//       this.message = `
//       Add new col node
//       Actual Result: ${this.sheetFile.rootNode.child("cols").children[0].name}
//       Expected Result: col
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].name,
//         this.message
//       ).equal("col");

//       this.message = `
//       Add new col node attribute min
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("min").value
//       }
//       Expected Result: 2
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("min")
//           .value,
//         this.message
//       ).equal("2");

//       this.message = `
//       Add new col node attribute max
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("max").value
//       }
//       Expected Result: 3
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("max")
//           .value,
//         this.message
//       ).equal("3");

//       this.message = `
//       Add new col node attribute width
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("width")
//           .value
//       }
//       Expected Result: 50
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("width")
//           .value,
//         this.message
//       ).equal("50");

//       this.message = `
//       Add new col node attribute customWidth
//       Actual Result: ${
//         this.sheetFile.rootNode
//           .child("cols")
//           .children[0].attribute("customWidth").value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode
//           .child("cols")
//           .children[0].attribute("customWidth").value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Add new col node attribute collapsed
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("collapsed")
//           .value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("collapsed")
//           .value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Add new col node attribute hidden
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("hidden")
//           .value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("hidden")
//           .value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Result to be node
//       Actual Result: ${this.result instanceof Node}
//       Expected Result: true
//       `;
//       expect(this.result instanceof Node, this.message).equal(true);
//     });

//     it("adds multiple column with custom width", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.sheetFile.addCol(1, 1, 50, false, false);
//       this.sheetFile.addCol(2, 3, 100, false, false);
//       this.sheetFile.addCol(4, 4, 50, false, false);

//       // Assert
//       this.message = `
//       Add new cols node if not already
//       Actual Result: ${this.sheetFile.rootNode.child("cols") instanceof Node}
//       Expected Result: true
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols") instanceof Node,
//         this.message
//       ).equal(true);

//       this.message = `
//       Add 3 new col node
//       Actual Result: ${this.sheetFile.rootNode.child("cols").children.length}
//       Expected Result: 3
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children.length,
//         this.message
//       ).equal(3);

//       this.message = `
//       Add new col node attribute min
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("min").value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("min")
//           .value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Add new col node attribute max
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("max").value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("max")
//           .value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Add new col node attribute min
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[1].attribute("min").value
//       }
//       Expected Result: 2
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[1].attribute("min")
//           .value,
//         this.message
//       ).equal("2");

//       this.message = `
//       Add new col node attribute max
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[1].attribute("max").value
//       }
//       Expected Result: 3
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[1].attribute("max")
//           .value,
//         this.message
//       ).equal("3");

//       this.message = `
//       Add new col node attribute width
//       Actual Result: ${
//         this.sheetFile.rootNode.child("cols").children[0].attribute("width")
//           .value
//       }
//       Expected Result: 50
//       `;
//       expect(
//         this.sheetFile.rootNode.child("cols").children[0].attribute("width")
//           .value,
//         this.message
//       ).equal("50");

//       this.message = `
//       Add new col node attribute customWidth
//       Actual Result: ${
//         this.sheetFile.rootNode
//           .child("cols")
//           .children[0].attribute("customWidth").value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode
//           .child("cols")
//           .children[0].attribute("customWidth").value,
//         this.message
//       ).equal("1");
//     });
//   });

//   describe("mergeCells method", function() {
//     it("merge cell with cell string", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.sheetFile.mergeCells("A1:C3");

//       this.message = `
//       Add new mergeCells node
//       Actual Result: ${this.sheetFile.rootNode.child("mergeCells") instanceof
//         Node}
//       Expected Result: true
//       `;
//       expect(
//         this.sheetFile.rootNode.child("mergeCells") instanceof Node,
//         this.message
//       ).equal(true);

//       this.message = `
//       Add new mergeCells node with count
//       Actual Result: ${
//         this.sheetFile.rootNode.child("mergeCells").attribute("count").value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.rootNode.child("mergeCells").attribute("count").value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Add new mergeCell node
//       Actual Result: ${
//         this.sheetFile.rootNode.child("mergeCells").children[0].name
//       }
//       Expected Result: mergeCell
//       `;
//       expect(
//         this.sheetFile.rootNode.child("mergeCells").children[0].name,
//         this.message
//       ).equal("mergeCell");

//       this.message = `
//       Add new mergeCell with ref attribute
//       Actual Result: ${
//         this.sheetFile.rootNode.child("mergeCells").children[0].attribute("ref")
//           .value
//       }
//       Expected Result: A1:C3
//       `;
//       expect(
//         this.sheetFile.rootNode.child("mergeCells").children[0].attribute("ref")
//           .value,
//         this.message
//       ).equal("A1:C3");
//     });

//     it("merge cell multiple times", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.sheetFile.mergeCells("A1:C3");
//       this.sheetFile.mergeCells("C4:D6");

//       // ASSERT
//       this.message = `
//       Add new mergeCells node
//       Actual Result: ${this.sheetFile.rootNode.child("mergeCells") instanceof
//         Node}
//       Expected Result: true
//       `;
//       expect(
//         this.sheetFile.rootNode.child("mergeCells") instanceof Node,
//         this.message
//       ).equal(true);

//       this.message = `
//       Add new mergeCells node with count
//       Actual Result: ${
//         this.sheetFile.rootNode.child("mergeCells").attribute("count").value
//       }
//       Expected Result: 2
//       `;
//       expect(
//         this.sheetFile.rootNode.child("mergeCells").attribute("count").value,
//         this.message
//       ).equal("2");

//       this.message = `
//       Add new mergeCell with ref attribute
//       Actual Result: ${
//         this.sheetFile.rootNode.child("mergeCells").children[0].attribute("ref")
//           .value
//       }
//       Expected Result: A1:C3
//       `;
//       expect(
//         this.sheetFile.rootNode.child("mergeCells").children[0].attribute("ref")
//           .value,
//         this.message
//       ).equal("A1:C3");

//       this.message = `
//       Add new mergeCell with ref attribute
//       Actual Result: ${
//         this.sheetFile.rootNode.child("mergeCells").children[1].attribute("ref")
//           .value
//       }
//       Expected Result: C4:D6
//       `;
//       expect(
//         this.sheetFile.rootNode.child("mergeCells").children[1].attribute("ref")
//           .value,
//         this.message
//       ).equal("C4:D6");
//     });
//   });

//   describe("addRow method", function() {
//     it("add row node", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.result = this.sheetFile.addRow(2);

//       // ASSERT
//       this.message = `
//       Returns row node
//       Actual Result: ${this.result instanceof RowNode}
//       Expected Result: true
//       `;
//       expect(this.result instanceof RowNode, this.message).equal(true);

//       this.message = `
//       Adds a row node
//       Actual Result: ${this.sheetFile.sheetData.children[0] instanceof RowNode}
//       Expected Result: true
//       `;
//       expect(
//         this.sheetFile.sheetData.children[0] instanceof RowNode,
//         this.message
//       ).equal(true);
//     });

//     it("add multiple row node in series of index", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.sheetFile.addRow(2);
//       this.sheetFile.addRow(4);
//       this.sheetFile.addRow(3);
//       this.sheetFile.addRow(1);

//       // ASSERT
//       this.message = `
//       Adds 4 row nodes
//       Actual Result: ${this.sheetFile.sheetData.children.length}
//       Expected Result: true
//       `;
//       expect(this.sheetFile.sheetData.children.length, this.message).equal(4);

//       this.message = `
//       Adds 1 row node first
//       Actual Result: ${
//         this.sheetFile.sheetData.children[0].attribute("r").value
//       }
//       Expected Result: 1
//       `;
//       expect(
//         this.sheetFile.sheetData.children[0].attribute("r").value,
//         this.message
//       ).equal("1");

//       this.message = `
//       Adds 2 row node second
//       Actual Result: ${
//         this.sheetFile.sheetData.children[1].attribute("r").value
//       }
//       Expected Result: 2
//       `;
//       expect(
//         this.sheetFile.sheetData.children[1].attribute("r").value,
//         this.message
//       ).equal("2");

//       this.message = `
//       Adds 3 row node third
//       Actual Result: ${
//         this.sheetFile.sheetData.children[2].attribute("r").value
//       }
//       Expected Result: 3
//       `;
//       expect(
//         this.sheetFile.sheetData.children[2].attribute("r").value,
//         this.message
//       ).equal("3");

//       this.message = `
//       Adds 4 row node fourth
//       Actual Result: ${
//         this.sheetFile.sheetData.children[3].attribute("r").value
//       }
//       Expected Result: 4
//       `;
//       expect(
//         this.sheetFile.sheetData.children[3].attribute("r").value,
//         this.message
//       ).equal("4");
//     });

//     it("get row when added with same index", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.sheetFile.addRow(2);
//       this.sheetFile.addRow(2);

//       // ASSERT
//       this.message = `
//       Returns row node
//       Actual Result: ${this.result instanceof RowNode}
//       Expected Result: true
//       `;
//       expect(this.result instanceof RowNode, this.message).equal(true);

//       this.message = `
//       Adds a row node
//       Actual Result: ${this.sheetFile.sheetData.children.length}
//       Expected Result: 1
//       `;
//       expect(this.sheetFile.sheetData.children.length, this.message).equal(1);

//       this.message = `
//       Adds row node with index 2
//       Actual Result: ${
//         this.sheetFile.sheetData.children[0].attribute("r").value
//       }
//       Expected Result: 2
//       `;
//       expect(
//         this.sheetFile.sheetData.children[0].attribute("r").value,
//         this.message
//       ).equal("2");
//     });
//   });

//   describe("getRow method", function() {
//     it("get row when not added", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");

//       // ACT
//       this.result = this.sheetFile.getRow(2);

//       // ASSERT
//       this.message = `
//       Returns undefined
//       Actual Result: ${this.result}
//       Expected Result: undefined
//       `;
//       expect(this.result, this.message).equal(undefined);
//     });

//     it("get row when added", function() {
//       // ARRANGE
//       this.sheetFile = new SheetFile(1, "sheet1", "rId1");
//       this.sheetFile.addRow(2);

//       // ACT
//       this.result = this.sheetFile.getRow(2);

//       // ASSERT
//       this.message = `
//       Returns row node
//       Actual Result: ${this.result instanceof RowNode}
//       Expected Result: true
//       `;
//       expect(this.result instanceof RowNode, this.message).equal(true);
      
//       this.message = `
//       Returns row node with index
//       Actual Result: ${this.result.attribute("r").value}
//       Expected Result: 2
//       `;
//       expect(this.result.attribute("r").value, this.message).equal("2");
//     });
//   });
// });
