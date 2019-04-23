"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var workbookFile_1 = require("../../xmlElements/xmlFiles/xlsx/workbookFile");
var relationships_1 = require("../../xmlElements/xmlFiles/relationships");
var sheetUtility_1 = require("./sheetUtility");
/**
 * Utility class for workbook
 */
var WorkbookUtility = /** @class */ (function () {
    /**
     * Instanciate new workbook utility
     * @param eventBus - Event Bus Instance
     */
    function WorkbookUtility(eventBus) {
        var workbook = new workbookFile_1.WorkbookFile();
        eventBus.trigger("addFile", workbook);
        var relations = new relationships_1.Relationships("workbook.xml.rels", "workbook/_rels");
        eventBus.trigger("addFile", relations);
        this.bindListeners(workbook, relations, eventBus);
        /**
         * Intantiate new sheet in workbook
         * @param {string} name - Sheet name
         * @returns - The sheet instance
         */
        this.sheet = function (name) {
            var sheetUtility = new sheetUtility_1.SheetUtility(workbook, eventBus, name);
            return sheetUtility;
        };
    }
    /**
     * Bind Event Listeners on Bus
     */
    WorkbookUtility.prototype.bindListeners = function (workbook, relations, eventBus) {
        eventBus.startListening("addWorkbookRelation", function (target, type, id) {
            relations.addRelationship(target, type, id);
        });
        eventBus.startListening("activateTab", function (tabNumber) {
            workbook.activeTab.value = tabNumber.toString(10);
        });
    };
    return WorkbookUtility;
}());
exports.WorkbookUtility = WorkbookUtility;
//# sourceMappingURL=workbookUtility.js.map