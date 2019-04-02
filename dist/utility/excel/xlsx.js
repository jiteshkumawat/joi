"use strict";
exports.__esModule = true;
var contentTypes_1 = require("../../xmlElements/xmlFiles/contentTypes");
var relationships_1 = require("../../xmlElements/xmlFiles/relationships");
var fileHandler_1 = require("../../shared/fileHandler");
var eventBus_1 = require("../../shared/eventBus");
var workbookUtility_1 = require("./workbookUtility");
var Xlsx = (function () {
    function Xlsx(fileName) {
        this.files = [];
        this.initContentTypes();
        this.initRels();
        this.FileName = (fileName && fileName.trim()) || "Document.xlsx";
        this.fileHandler = new fileHandler_1.FileHandler();
        this.eventBus = new eventBus_1.EventBus();
        this.bindListeners();
        this.workbookUtility = new workbookUtility_1.WorkbookUtility(this.eventBus);
    }
    Xlsx.prototype.download = function (fileName, callback) {
        fileName = (fileName && fileName.trim()) || this.FileName;
        if (fileName) {
            if (!fileName.endsWith(".xlsx")) {
                fileName += ".xlsx";
            }
            return this.fileHandler.saveFile(this.files, fileName, callback);
        }
    };
    Xlsx.prototype.sheet = function (name) {
        return this.workbookUtility.sheet(name);
    };
    Xlsx.prototype.initContentTypes = function () {
        this.contentTypes = new contentTypes_1.ContentTypes();
        this.files.push(this.contentTypes);
        this.contentTypes.addDefault("application/vnd.openxmlformats-package.relationships+xml", "rels");
        this.contentTypes.addDefault("application/xml", "xml");
        this.contentTypes.addOverride("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml", "/workbook/workbook.xml");
    };
    Xlsx.prototype.initRels = function () {
        this.relationships = new relationships_1.Relationships();
        this.files.push(this.relationships);
        this.relationships.addRelationship("workbook/workbook.xml", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument");
    };
    Xlsx.prototype.bindListeners = function () {
        var _this = this;
        this.eventBus.startListening("addFile", function (file) {
            _this.files.push(file);
        });
        this.eventBus.startListening("addContentType", function (type, contentType, arg) {
            if (type.toLowerCase() === "default") {
                _this.contentTypes.addDefault(contentType, arg);
            }
            else {
                _this.contentTypes.addOverride(contentType, arg);
            }
        });
    };
    return Xlsx;
}());
exports.Xlsx = Xlsx;
//# sourceMappingURL=xlsx.js.map