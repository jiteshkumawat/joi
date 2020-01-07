import { expect } from "chai";
import { WorkbookUtilityBuilder } from "../../../app/xlsx/workbook.util.builder";
import { EventBus } from "../../../util/eventBus";
import { WorkbookFile } from "../../../entities/xlsx/files/workbookFile";
import { Relationships } from "../../../entities/files/relationships";
import { WorkbookUtility } from "../../../app/xlsx/workbook.util";
import { Sheet } from "../../../app/xlsx/sheet";
import { SharedStringsFile } from "../../../entities/xlsx/files/sharedStringsFile";
import * as sinon from "sinon";
import { joi } from "../../../app/joi";

describe("App - Workbook Utility", function() {
  describe("initialize", function() {
    it("default create", function() {
      // ARRANGE
      this.eventBus = new EventBus();
      this.addedFiles = [];
      let self = this;
      this.eventBus.startListening("addFile", function(file: any) {
        self.addedFiles.push(file);
      });
      this.eventBus.startListening("addContentType", function(
        override: string,
        contentType: string,
        part: string
      ) {
        self.override = override;
        self.contentType = contentType;
        self.part = part;
      });

      // ACT
      this.workbookUtilityFile = WorkbookUtilityBuilder.default(this.eventBus);

      // ARRANGE
      this.message = `
        Trigger addFile event for workbook file
        Actual Result: ${this.addedFiles[0] instanceof WorkbookFile}
        Expected Result: true
        `;

      expect(this.addedFiles[0] instanceof WorkbookFile, this.message).equal(
        true
      );

      this.message = `
        Trigger addFile event for Relationships file
        Actual Result: ${this.addedFiles[1] instanceof Relationships}
        Expected Result: true
        `;

      expect(this.addedFiles[1] instanceof Relationships, this.message).equal(
        true
      );

      this.message = `
        Trigger addContentType event for Workbook part
        Actual Result: ${self.override}
        Expected Result: Override
        `;

      expect(self.override, this.message).equal("Override");

      this.message = `
        Trigger addContentType event for Workbook part
        Actual Result: ${self.contentType}
        Expected Result: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml
        `;

      expect(self.contentType, this.message).equal(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"
      );

      this.message = `
        Trigger addContentType event for Workbook part
        Actual Result: ${self.part}
        Expected Result: /workbook/workbook.xml
        `;

      expect(self.part, this.message).equal("/workbook/workbook.xml");

      this.message = `
      Returns Workbook Utility
      Actual Result: ${this.workbookUtilityFile instanceof WorkbookUtility}
      Expected Result: true
      `;

      expect(
        this.workbookUtilityFile instanceof WorkbookUtility,
        this.message
      ).equal(true);
    });
  });

  describe("sheet method", function() {
    it("call sheet method with name", function() {
      // ARRANGE
      this.eventBus = new EventBus();
      this.workbookUtility = WorkbookUtilityBuilder.default(this.eventBus);

      // ACT
      this.result = this.workbookUtility.sheet("Sheet1");

      // ASSERT
      this.message = `
      Returns Sheet 
      Actual Result: ${this.result instanceof Sheet}
      Expected Result: true
      `;

      expect(this.result instanceof Sheet, this.message).equal(true);
    });

    it("call sheet method without name", function() {
      // ARRANGE
      this.eventBus = new EventBus();
      this.workbookUtility = WorkbookUtilityBuilder.default(this.eventBus);

      // ACT
      this.result = this.workbookUtility.sheet();

      // ASSERT
      this.message = `
      Returns Sheet 
      Actual Result: ${this.result instanceof Sheet}
      Expected Result: true
      `;

      expect(this.result instanceof Sheet, this.message).equal(true);
    });
  });

  describe("sharedString method", function() {
    it("shared string called with value string", function() {
      // ARRANGE
      this.addedFiles = [];
      let self = this;
      this.eventBus = new EventBus();
      this.eventBus.startListening("addFile", function(file: any) {
        self.addedFiles.push(file);
      });

      this.eventBus.startListening("addContentType", function(
        override: string,
        contentType: string,
        part: string
      ) {
        self.override = override;
        self.contentType = contentType;
        self.part = part;
      });

      this.workbookUtility = WorkbookUtilityBuilder.default(this.eventBus);
      this.relationships = this.addedFiles[1] as Relationships;
      sinon
        .stub(this.relationships, "addRelationship")
        .callsFake((name, relationshipString) => {
          self.relationshipName = name;
          self.relationshipString = relationshipString;
        });

      // ACT
      this.result = this.workbookUtility.sharedString("Dummy Text");

      // ASSERT
      this.message = `
      Trigger addFile with shared string file
      Actual Result: ${self.addedFiles[2] instanceof SharedStringsFile}
      Expected Result: true
      `;

      expect(
        self.addedFiles[2] instanceof SharedStringsFile,
        this.message
      ).equal(true);

      this.message = `
        Trigger addContentType event for Workbook part
        Actual Result: ${self.override}
        Expected Result: Override
        `;

      expect(self.override, this.message).equal("Override");

      this.message = `
        Trigger addContentType event for Workbook part
        Actual Result: ${self.contentType}
        Expected Result: application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml
        `;

      expect(self.contentType, this.message).equal(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"
      );

      this.message = `
        Trigger addContentType event for Workbook part
        Actual Result: ${self.part}
        Expected Result: /workbook/sharedstrings.xml
        `;

      expect(self.part, this.message).equal("/workbook/sharedstrings.xml");

      this.message = `
        Add Relationship for sharedstrings.xml
        Actual Result: ${self.relationshipName}
        Expected Result: sharedstrings.xml
        `;

      expect(self.relationshipName, this.message).equal("sharedstrings.xml");

      this.message = `
        Add Relationship for sharedstrings.xml
        Actual Result: ${self.relationshipString}
        Expected Result: http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings
        `;

      expect(self.relationshipString, this.message).equal(
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings"
      );

      this.message = `
        Add count and return index
        Actual Result: ${self.result.index}
        Expected Result: 1
        `;

      expect(self.result.index, this.message).equal(1);

      this.message = `
        Add count and return value
        Actual Result: ${self.result.value}
        Expected Result: Dummy Text
        `;

      expect(self.result.value, this.message).equal("Dummy Text");
    });

    it("shared string called with value index", function() {
      // ARRANGe
      this.eventBus = new EventBus();
      this.workbookUtility = WorkbookUtilityBuilder.default(this.eventBus);
      this.workbookUtility.sharedString("Dummy Text 1");
      this.workbookUtility.sharedString("Dummy Text 2");
      this.workbookUtility.sharedString("Dummy Text 3");

      // ACT
      this.result = this.workbookUtility.sharedString(2);

      // ASSERT
      this.message = `
        Add count and return index
        Actual Result: ${this.result.index}
        Expected Result: 2
        `;

      expect(this.result.index, this.message).equal(2);

      this.message = `
        Add count and return value
        Actual Result: ${this.result.value}
        Expected Result: Dummy Text 2
        `;

      expect(this.result.value, this.message).equal("Dummy Text 2");
    });
  });
  describe("bind events", function() {
    it("bind addWorkbookRelation", function() {
      // ARRANGE
      this.addedFiles = [];
      let self = this;
      this.eventBus = new EventBus();
      this.eventBus.startListening("addFile", function(file: any) {
        self.addedFiles.push(file);
      });

      this.workbookUtility = WorkbookUtilityBuilder.default(this.eventBus);
      this.relationships = this.addedFiles[1] as Relationships;
      sinon
        .stub(this.relationships, "addRelationship")
        .callsFake((name, relationshipString, relationshipIndex) => {
          self.relationshipName = name;
          self.relationshipString = relationshipString;
          self.relationshipIndex = relationshipIndex;
        });

      // ACT
      this.eventBus.trigger("addWorkbookRelation", "target", "type");

      // ASSERT
      this.message = `
      Add Relationship with target
      Actual Value: ${this.relationshipName}
      Expected Value: target
      `;

      expect(this.relationshipName, this.message).equal("target");

      this.message = `
      Add Relationship with type
      Actual Value: ${this.relationshipString}
      Expected Value: type
      `;

      expect(this.relationshipString, this.message).equal("type");
    });

    it("bind activateTab", function() {
      // ARRANGE
      this.addedFiles = [];
      let self = this;
      this.eventBus = new EventBus();
      this.eventBus.startListening("addFile", function(file: any) {
        self.addedFiles.push(file);
      });

      this.eventBus.startListening("addContentType", function(
        override: string,
        contentType: string,
        part: string
      ) {
        self.override = override;
        self.contentType = contentType;
        self.part = part;
      });

      this.workbookUtility = WorkbookUtilityBuilder.default(this.eventBus);
      this.workbookFile = this.addedFiles[0] as WorkbookFile;

      // ACT
      this.eventBus.trigger("activateTab", 3);

      // // ASSERT
      // this.message = `
      // Activate tab
      // Actual Value: ${this.workbookFile.activeTab.value}
      // Expected Value: 3
      // `;

      // expect(this.workbookFile.activeTab.value, this.message).equal("3");
    });

    it("bind sharedString", function(done) {
      // ARRANGE
      let self = this;
      this.eventBus = new EventBus();

      this.workbookUtility = WorkbookUtilityBuilder.default(this.eventBus);

      // ACT
      this.eventBus.trigger("sharedString", "Dummy string 1");
      this.eventBus.trigger(
        "sharedString",
        1,
        (ss: { index: number; value: string }) => {
          // ASSERT
          this.message = `
          Add Shared string Dummy string 1
          Actual Value: ${ss.value}
          Expected Value: Dummy string 1
          `;

          expect(ss.value, this.message).equal("Dummy string 1");

          this.message = `
          Add Shared string at index 1
          Actual Value: ${ss.index}
          Expected Value: 1
          `;

          expect(ss.index, this.message).equal(1);

          done();
        }
      );
    });
  });

  describe("load", function() {
    this.beforeAll(function() {
      let fs = require("fs");
      this.xlsxFile = fs.readFileSync(__dirname + "/../../spec.xlsx");
    });
    it("load file without any options", function(done) {
      // ARRANGE, ACT
      let self = this;
      this.xlsx = joi.xlsx.load(this.xlsxFile).then(xls => {

        // ASSERT
        self.message = `
        Filename should be defined.
        Actual Result: ${xls.fileName}
        Expected Result: Document.xlsx
        `;
        expect(xls.fileName, self.message).equal("Document.xlsx");
        done();
      });
    });
  });
});
