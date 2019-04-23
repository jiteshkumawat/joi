"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contentTypes_1 = require("../../xmlElements/xmlFiles/contentTypes");
var relationships_1 = require("../../xmlElements/xmlFiles/relationships");
var fileHandler_1 = require("../../shared/fileHandler");
var eventBus_1 = require("../../shared/eventBus");
var workbookUtility_1 = require("./workbookUtility");
/**
 * Define a new xlsx / excel file
 */
var Xlsx = /** @class */ (function () {
    /**
     * Initialize a new xlsx / excel file
     * @param fileName - The file name
     */
    function Xlsx(fileName) {
        var _this = this;
        var files = [];
        var contentTypes = this.initContentTypes(files);
        this.initRels(files);
        this.fileName = (fileName && fileName.trim()) || "Document.xlsx";
        var fileHandler = new fileHandler_1.FileHandler();
        var eventBus = new eventBus_1.EventBus();
        this.bindListeners(contentTypes, files, eventBus);
        var workbookUtility = new workbookUtility_1.WorkbookUtility(eventBus);
        /**
         * Download the file
         * @param {string} fileName - The file name to download
         * @param {Function} callback - Callback for download complete
         */
        this.download = function (fn, callback) {
            fn = (fn && fn.trim()) || _this.fileName;
            if (fn) {
                if (!fn.endsWith(".xlsx")) {
                    fn += ".xlsx";
                }
                return fileHandler.saveFile(files, fn, callback);
            }
        };
        /**
         * Adds a new sheet to workbook
         * @param {string} name - The Sheet Name
         */
        this.sheet = function (name) {
            return workbookUtility.sheet(name);
        };
    }
    /**
     * Initialize content types
     */
    Xlsx.prototype.initContentTypes = function (files) {
        var contentTypes = new contentTypes_1.ContentTypes();
        files.push(contentTypes);
        contentTypes.addDefault("application/vnd.openxmlformats-package.relationships+xml", "rels");
        contentTypes.addDefault("application/xml", "xml");
        contentTypes.addOverride("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml", "/workbook/workbook.xml");
        return contentTypes;
    };
    /**
     * Initialize relationships
     */
    Xlsx.prototype.initRels = function (files) {
        var relationships = new relationships_1.Relationships();
        files.push(relationships);
        relationships.addRelationship("workbook/workbook.xml", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument");
        return relationships;
    };
    /**
     * Bind Event Listeners on Bus
     */
    Xlsx.prototype.bindListeners = function (contentTypes, files, eventBus) {
        eventBus.startListening("addFile", function (file) {
            files.push(file);
        });
        eventBus.startListening("addContentType", function (type, contentType, arg) {
            if (type.toLowerCase() === "default") {
                contentTypes.addDefault(contentType, arg);
            }
            else {
                contentTypes.addOverride(contentType, arg);
            }
        });
    };
    return Xlsx;
}());
exports.Xlsx = Xlsx;
//# sourceMappingURL=xlsx.js.map