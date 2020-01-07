import { expect } from "chai";
import { WorkbookFile } from "../../../../entities/xlsx/files/workbookFile";
import { SheetFile } from "../../../../entities/xlsx/files/sheetFile";
import { Attribute } from "../../../../entities/base/attribute";
import { Node } from "../../../../entities/base/node";
import { EventBus } from "../../../../util/eventBus";

describe("workbookFile", function() {
  this.beforeEach(function() {
    this.eventBus = new EventBus();
  });

  describe("initialize", function() {
    it("initialize default values", function() {
      // ARRANGE, ACT
      this.workbookFile = new WorkbookFile(this.eventBus);

      // ASSERT
      this.message = `
      Define filename
      Actual Value: ${this.workbookFile.fileName}
      Expected Value: workbook.xml
      `;
      expect(this.workbookFile.fileName, this.message).equal("workbook.xml");

      this.message = `
      Define filepath
      Actual Value: ${this.workbookFile.filePath}
      Expected Value: workbook
      `;
      expect(this.workbookFile.filePath, this.message).equal("workbook");

      this.message = `
      Define rootnode
      Actual Value: ${this.workbookFile.rootNode.name}
      Expected Value: workbook
      `;
      expect(this.workbookFile.rootNode.name, this.message).equal("workbook");

      this.message = `
      Define rootnode spreadsheet namespace
      Actual Value: ${this.workbookFile.rootNode.namespaces["http://schemas.openxmlformats.org/spreadsheetml/2006/main"]}
      Expected Value: ''
      `;
      expect(
        this.workbookFile.rootNode.namespaces[
          "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
        ],
        this.message
      ).equal("");

      this.message = `
      Define rootnode relationship namespace
      Actual Value: ${this.workbookFile.rootNode.namespaces["http://schemas.openxmlformats.org/officeDocument/2006/relationships"]}
      Expected Value: r
      `;
      expect(
        this.workbookFile.rootNode.namespaces[
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
        ],
        this.message
      ).equal("r");

      // this.message = `
      // Define activeTab
      // Actual Value: ${this.workbookFile.activeTab instanceof Attribute}
      // Expected Value: true
      // `;
      // expect(
      //   this.workbookFile.activeTab instanceof Attribute,
      //   this.message
      // ).equal(true);

      // this.message = `
      // Define activeTab value
      // Actual Value: ${this.workbookFile.activeTab.value}
      // Expected Value: 0
      // `;
      // expect(this.workbookFile.activeTab.value, this.message).equal("0");

      this.message = `
      Define bookviews
      Actual Value: ${this.workbookFile.rootNode.child("bookViews") instanceof
        Node}
      Expected Value: true
      `;
      expect(
        this.workbookFile.rootNode.child("bookViews") instanceof Node,
        this.message
      ).equal(true);

      this.message = `
      Define workbookView
      Actual Value: ${this.workbookFile.rootNode
        .child("bookViews")
        .child("workbookView") instanceof Node}
      Expected Value: true
      `;
      expect(
        this.workbookFile.rootNode
          .child("bookViews")
          .child("workbookView") instanceof Node,
        this.message
      ).equal(true);

      this.message = `
      Define sheets
      Actual Value: ${this.workbookFile.rootNode.child("sheets") instanceof
        Node}
      Expected Value: true
      `;
      expect(
        this.workbookFile.rootNode.child("sheets") instanceof Node,
        this.message
      ).equal(true);

      // this.message = `
      // Define totalSheet
      // Actual Value: ${this.workbookFile.totalSheet}
      // Expected Value: 0
      // `;
      // expect(this.workbookFile.totalSheet, this.message).equal(0);
    });
    it("initialize default values with fileName", function() {
      // ARRANGE, ACT
      this.workbookFile = new WorkbookFile(this.eventBus, "book.xml");

      // ASSERT
      this.message = `
        Define filename
        Actual Value: ${this.workbookFile.fileName}
        Expected Value: book.xml
        `;
      expect(this.workbookFile.fileName, this.message).equal("book.xml");

      this.message = `
        Define filepath
        Actual Value: ${this.workbookFile.filePath}
        Expected Value: workbook
        `;
      expect(this.workbookFile.filePath, this.message).equal("workbook");

      this.message = `
        Define rootnode
        Actual Value: ${this.workbookFile.rootNode.name}
        Expected Value: workbook
        `;
      expect(this.workbookFile.rootNode.name, this.message).equal("workbook");

      this.message = `
        Define rootnode spreadsheet namespace
        Actual Value: ${this.workbookFile.rootNode.namespaces["http://schemas.openxmlformats.org/spreadsheetml/2006/main"]}
        Expected Value: ""
        `;
      expect(
        this.workbookFile.rootNode.namespaces[
          "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
        ],
        this.message
      ).equal("");

      this.message = `
        Define rootnode relationship namespace
        Actual Value: ${this.workbookFile.rootNode.namespaces["http://schemas.openxmlformats.org/officeDocument/2006/relationships"]}
        Expected Value: r
        `;
      expect(
        this.workbookFile.rootNode.namespaces[
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
        ],
        this.message
      ).equal("r");

      // this.message = `
      //   Define activeTab
      //   Actual Value: ${this.workbookFile.activeTab instanceof Attribute}
      //   Expected Value: true
      //   `;
      // expect(
      //   this.workbookFile.activeTab instanceof Attribute,
      //   this.message
      // ).equal(true);

      // this.message = `
      //   Define activeTab value
      //   Actual Value: ${this.workbookFile.activeTab.value}
      //   Expected Value: 0
      //   `;
      // expect(this.workbookFile.activeTab.value, this.message).equal("0");

      this.message = `
        Define bookviews
        Actual Value: ${this.workbookFile.rootNode.child("bookViews") instanceof
          Node}
        Expected Value: true
        `;
      expect(
        this.workbookFile.rootNode.child("bookViews") instanceof Node,
        this.message
      ).equal(true);

      this.message = `
        Define workbookView
        Actual Value: ${this.workbookFile.rootNode
          .child("bookViews")
          .child("workbookView") instanceof Node}
        Expected Value: true
        `;
      expect(
        this.workbookFile.rootNode
          .child("bookViews")
          .child("workbookView") instanceof Node,
        this.message
      ).equal(true);

      this.message = `
        Define sheets
        Actual Value: ${this.workbookFile.rootNode.child("sheets") instanceof
          Node}
        Expected Value: true
        `;
      expect(
        this.workbookFile.rootNode.child("sheets") instanceof Node,
        this.message
      ).equal(true);

      // this.message = `
      //   Define totalSheet
      //   Actual Value: ${this.workbookFile.totalSheet}
      //   Expected Value: 0
      //   `;
      // expect(this.workbookFile.totalSheet, this.message).equal(0);
    });
    it("initialize default values with fileName and filePath", function() {
      // ARRANGE, ACT
      this.workbookFile = new WorkbookFile(this.eventBus, "book.xml", "book");

      // ASSERT
      this.message = `
          Define filename
          Actual Value: ${this.workbookFile.fileName}
          Expected Value: book.xml
          `;
      expect(this.workbookFile.fileName, this.message).equal("book.xml");

      this.message = `
          Define filepath
          Actual Value: ${this.workbookFile.filePath}
          Expected Value: book
          `;
      expect(this.workbookFile.filePath, this.message).equal("book");

      this.message = `
          Define rootnode
          Actual Value: ${this.workbookFile.rootNode.name}
          Expected Value: workbook
          `;
      expect(this.workbookFile.rootNode.name, this.message).equal("workbook");

      this.message = `
          Define rootnode spreadsheet namespace
          Actual Value: ${this.workbookFile.rootNode.namespaces["http://schemas.openxmlformats.org/spreadsheetml/2006/main"]}
          Expected Value: ''
          `;
      expect(
        this.workbookFile.rootNode.namespaces[
          "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
        ],
        this.message
      ).equal("");

      this.message = `
          Define rootnode relationship namespace
          Actual Value: ${this.workbookFile.rootNode.namespaces["http://schemas.openxmlformats.org/officeDocument/2006/relationships"]}
          Expected Value: r
          `;
      expect(
        this.workbookFile.rootNode.namespaces[
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
        ],
        this.message
      ).equal("r");

      // this.message = `
      //     Define activeTab
      //     Actual Value: ${this.workbookFile.activeTab instanceof Attribute}
      //     Expected Value: true
      //     `;
      // expect(
      //   this.workbookFile.activeTab instanceof Attribute,
      //   this.message
      // ).equal(true);

      // this.message = `
      //     Define activeTab value
      //     Actual Value: ${this.workbookFile.activeTab.value}
      //     Expected Value: 0
      //     `;
      // expect(this.workbookFile.activeTab.value, this.message).equal("0");

      this.message = `
          Define bookviews
          Actual Value: ${this.workbookFile.rootNode.child(
            "bookViews"
          ) instanceof Node}
          Expected Value: true
          `;
      expect(
        this.workbookFile.rootNode.child("bookViews") instanceof Node,
        this.message
      ).equal(true);

      this.message = `
          Define workbookView
          Actual Value: ${this.workbookFile.rootNode
            .child("bookViews")
            .child("workbookView") instanceof Node}
          Expected Value: true
          `;
      expect(
        this.workbookFile.rootNode
          .child("bookViews")
          .child("workbookView") instanceof Node,
        this.message
      ).equal(true);

      this.message = `
          Define sheets
          Actual Value: ${this.workbookFile.rootNode.child("sheets") instanceof
            Node}
          Expected Value: true
          `;
      expect(
        this.workbookFile.rootNode.child("sheets") instanceof Node,
        this.message
      ).equal(true);

      // this.message = `
      //     Define totalSheet
      //     Actual Value: ${this.workbookFile.totalSheet}
      //     Expected Value: 0
      //     `;
      // expect(this.workbookFile.totalSheet, this.message).equal(0);
    });
  });

  describe("addSheet method", function() {
    it("add sheet", function() {
      // ARRANGE
      this.workbookFile = new WorkbookFile(this.eventBus);
      let sheetFile = new SheetFile(1, "sheet1");

      // ACT
      this.workbookFile.addSheet(sheetFile);

      // // ASSERT
      // this.message = `
      // Increase totalSheet
      // Actual Value: ${this.workbookFile.totalSheet}
      // Expected Value: 1
      // `;
      // expect(this.workbookFile.totalSheet, this.message).equal(1);

      this.message = `
      Add sheet node
      Actual Value: ${
        this.workbookFile.rootNode.child("sheets").children[0].name
      }
      Expected Value: sheet
      `;
      expect(
        this.workbookFile.rootNode.child("sheets").children[0].name,
        this.message
      ).equal("sheet");

      this.message = `
      Add sheet node r:id sheetId
      Actual Value: ${
        this.workbookFile.rootNode
          .child("sheets")
          .children[0].attribute("sheetId").value
      }
      Expected Value: ${sheetFile.id.toString(10)}
      `;
      expect(
        this.workbookFile.rootNode
          .child("sheets")
          .children[0].attribute("sheetId").value,
        this.message
      ).equal(sheetFile.id.toString(10));

      this.message = `
      Add sheet node r:id name
      Actual Value: ${
        this.workbookFile.rootNode.child("sheets").children[0].attribute("name")
          .value
      }
      Expected Value: ${sheetFile.name}
      `;
      expect(
        this.workbookFile.rootNode.child("sheets").children[0].attribute("name")
          .value,
        this.message
      ).equal(sheetFile.name);
    });
  });

  describe("createSheet method", function() {
    it("add new sheet", function() {
      // ARRANGE
      this.workbookFile = new WorkbookFile(this.eventBus, "book.xml", "book");

      // ACT
      this.result = this.workbookFile.createSheet();

      // // ASSERT
      // this.message = `
      // Increase totalSheet
      // Actual Value: ${this.workbookFile.totalSheet}
      // Expected Value: 1
      // `;
      // expect(this.workbookFile.totalSheet, this.message).equal(1);

      this.message = `
      Add sheet node
      Actual Value: ${
        this.workbookFile.rootNode.child("sheets").children[0].name
      }
      Expected Value: sheet
      `;
      expect(
        this.workbookFile.rootNode.child("sheets").children[0].name,
        this.message
      ).equal("sheet");
    });
  });
});
