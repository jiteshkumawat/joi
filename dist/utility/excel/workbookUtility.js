"use strict";
exports.__esModule = true;
var workbook_1 = require("../../xmlElements/xmlFiles/xlsx/workbook");
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
        this.eventBus = eventBus;
        this.workbook = new workbook_1.Workbook();
        this.eventBus.trigger("addFile", this.workbook);
        this.relations = new relationships_1.Relationships("workbook.xml.rels", "workbook/_rels");
        this.eventBus.trigger("addFile", this.relations);
        this.bindListeners();
    }
    /**
     * Intantiate new sheet in workbook
     * @param name - Sheet name
     * @returns {SheetUtility} The sheet instance
     */
    WorkbookUtility.prototype.sheet = function (name) {
        var sheetUtility = new sheetUtility_1.SheetUtility(this.workbook, this.eventBus, name);
        return sheetUtility;
    };
    /**
     * Bind Event Listeners on Bus
     */
    WorkbookUtility.prototype.bindListeners = function () {
        var _this = this;
        this.eventBus.startListening("addWorkbookRelation", function (target, type, id) {
            _this.relations.addRelationship(target, type, id);
        });
        this.eventBus.startListening("activateTab", function (tabNumber) {
            _this.workbook.ActiveTab.Value = tabNumber.toString(10);
        });
    };
    return WorkbookUtility;
}());
exports.WorkbookUtility = WorkbookUtility;
//# sourceMappingURL=workbookUtility.js.map