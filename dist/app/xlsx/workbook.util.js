"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sharedStringsFile_1 = require("../../entities/xlsx/files/sharedStringsFile");
var sheet_builder_1 = require("./sheet.builder");
/**
 * Utility class for workbook
 */
var WorkbookUtility = /** @class */ (function () {
    /**
     * Instanciate new workbook utility
     * @param eventBus - Event Bus Instance
     */
    function WorkbookUtility(eventBus, workbook, relations, sharedStringFile) {
        this.bindListeners(workbook, relations, eventBus);
        /**
         * Intantiate new sheet in workbook
         * @param {string} name - Sheet name
         * @returns - The sheet instance
         */
        this.sheet = function (name) {
            var sheet = sheet_builder_1.SheetBuilder.default(workbook, eventBus, name);
            return sheet;
        };
        /**
         * Add / Get shared string in workbook
         * @param {string} value - The shared string
         * @returns {number} - Shared string id
         */
        this.sharedString = function (value) {
            if (!sharedStringFile) {
                sharedStringFile = new sharedStringsFile_1.SharedStringsFile();
                eventBus.trigger("addFile", sharedStringFile);
                relations.addRelationship("sharedstrings.xml", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings");
                eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml", "/workbook/sharedstrings.xml");
            }
            if (typeof value === "string") {
                sharedStringFile.addCount();
                return sharedStringFile.add(value);
            }
            else {
                return sharedStringFile.get(value);
            }
        };
    }
    // public static load(
    //   eventBus: EventBus,
    //   loadedFiles: IWorkbookUtilityContainer
    // ) {
    //   return new WorkbookUtility(eventBus, loadedFiles);
    // }
    /**
     * Bind Event Listeners on Bus
     */
    WorkbookUtility.prototype.bindListeners = function (workbook, relations, eventBus) {
        var _this = this;
        eventBus.startListening("addWorkbookRelation", function (target, type, callback) {
            var rId = relations.addRelationship(target, type);
            if (callback) {
                callback(rId);
            }
        });
        // eventBus.startListening("activateTab", (tabNumber: number) => {
        //   workbook.activeTab.value = tabNumber.toString(10);
        // });
        eventBus.startListening("sharedString", function (value, callback) {
            var sharedStringIndex = _this.sharedString(value);
            if (callback) {
                callback(sharedStringIndex);
            }
        });
    };
    return WorkbookUtility;
}());
exports.WorkbookUtility = WorkbookUtility;
//# sourceMappingURL=workbook.util.js.map