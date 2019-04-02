"use strict";
exports.__esModule = true;
var workbook_1 = require("../../xmlElements/xmlFiles/xlsx/workbook");
var sheet_1 = require("../../xmlElements/xmlFiles/xlsx/sheet");
var relationships_1 = require("../../xmlElements/xmlFiles/relationships");
var WorkbookUtility = (function () {
    function WorkbookUtility(eventBus) {
        this.eventBus = eventBus;
        this.workbook = new workbook_1.Workbook();
        this.eventBus.trigger("addFile", this.workbook);
        this.relations = new relationships_1.Relationships("workbook.xml.rels", "workbook/_rels");
        this.eventBus.trigger("addFile", this.relations);
    }
    WorkbookUtility.prototype.sheet = function (name) {
        var sheet = new sheet_1.Sheet(this.workbook.TotalSheet + 1, name);
        this.workbook.addSheet(sheet);
        this.eventBus.trigger("addFile", sheet);
        this.eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", "/" + sheet.FilePath + "/" + sheet.FileName);
        this.relations.addRelationship("sheets/" + sheet.FileName, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", sheet.Id);
        return sheet;
    };
    return WorkbookUtility;
}());
exports.WorkbookUtility = WorkbookUtility;
//# sourceMappingURL=workbookUtility.js.map