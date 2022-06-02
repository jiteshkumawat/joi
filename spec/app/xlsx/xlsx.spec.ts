import { Xlsx } from "../../../app/xlsx/xlsx.util";
import { expect } from "chai";
import { XlsxBuilder } from "../../../app/xlsx/xlsx.util.builder";

describe("App - Xlsx", function() {
  describe("initialize", function() {
    it("initialize without filename", function() {
      // ARRANGE, ACT
      this.xlsx = XlsxBuilder.default();

      // ASSERT
      this.message = `
          Filename should be Document.xlsx.
          Actual Result: ${this.xlsx.fileName}
          Expected Result: Document.xlsx
          `;
      expect(this.xlsx.fileName, this.message).equal("Document.xlsx");
    });

    it("initialize with filename ending without .xlsx", function() {
      // ARRANGE, ACT
      this.xlsx = XlsxBuilder.default("worksheet1");

      // ASSERT
      this.message = `
          Filename should be worksheet1.xlsx.
          Actual Result: ${this.xlsx.fileName}
          Expected Result: worksheet1.xlsx
          `;
      expect(this.xlsx.fileName, this.message).equal("worksheet1.xlsx");
    });

    it("initialize with filename ending with .xlsx", function() {
      // ARRANGE, ACT
      this.xlsx = XlsxBuilder.default("worksheet2.xlsx");

      // ASSERT
      this.message = `
     Filename should be worksheet2.xlsx.
     Actual Result: ${this.xlsx.fileName}
     Expected Result: worksheet2.xlsx
     `;
      expect(this.xlsx.fileName, this.message).equal("worksheet2.xlsx");
    });
  });

  describe("download", function() {
    it("download with filename", function() {});
    it("download with filename and callback", function() {});
    it("download with callback", function() {});
  });

  describe("load", function() {
    this.beforeAll(function() {
      let fs = require("fs");
      this.xlsxFile = fs.readFileSync(__dirname + "/../../spec.xlsx");
    });
    it("load file without any options", function(done) {
      // ARRANGE, ACT
      let self = this;
      this.xlsx = Xlsx.load(this.xlsxFile).then(xls => {
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
    it("load file with fileName", function(done) {
      // ARRANGE, ACT
      let self = this;
      this.xlsx = Xlsx.load(
        this.xlsxFile,
        undefined,
        "workbook.xlsx"
      ).then(xls => {
        // ASSERT
        self.message = `
        Filename should be defined.
        Actual Result: ${xls.fileName}
        Expected Result: workbook.xlsx
        `;
        expect(xls.fileName, self.message).equal("workbook.xlsx");
        done();
      });
    });
    it("load file with callback", function(done) {
      // ARRANGE, ACT
      let self = this;
      this.xlsx = Xlsx.load(
        this.xlsxFile,
        undefined,
        "workbook.xlsx",
        (xls: Xlsx) => {
          // ASSERT
          self.message = `
        Filename should be defined.
        Actual Result: ${xls.fileName}
        Expected Result: workbook.xlsx
        `;
          expect(xls.fileName, self.message).equal("workbook.xlsx");
          done();
        }
      );
    });
  });
});
