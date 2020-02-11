"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../util/constants");
/**
 * Define a new worksheet file
 */
var Sheet = /** @class */ (function () {
    function Sheet(sheetFile, eventBus, workbookFile) {
        var self = this;
        eventBus.trigger(constants_1.Constants.Events.AddFile, sheetFile);
        this.defineNameProperty(sheetFile, workbookFile);
        /**
         * Configure Sheet Properties
         * @param properties - Sheet Properties JSON
         * @returns {Sheet} - Sheet Object
         */
        this.configure = function (properties) {
            self.configureInternal(properties, sheetFile);
            return self;
        };
    }
    Sheet.prototype.defineNameProperty = function (sheetFile, workbookFile) {
        Object.defineProperty(this, "name", {
            get: function () {
                return sheetFile.name;
            },
            set: function (value) {
                sheetFile.name = value;
                workbookFile.updateSheetName(value, sheetFile.id);
            },
            enumerable: true,
            configurable: true
        });
    };
    Sheet.prototype.configureInternal = function (options, sheetFile) {
        if (options.showGridLines === true) {
            sheetFile.showGridLines = true;
        }
        else if (options.showGridLines === false) {
            sheetFile.showGridLines = false;
        }
        if (options.showFormula === true) {
            sheetFile.showFormula = true;
        }
        else if (options.showFormula === false) {
            sheetFile.showFormula = false;
        }
        if (options.showRowColHeaders === true) {
            sheetFile.showRowColHeaders = true;
        }
        else if (options.showRowColHeaders === false) {
            sheetFile.showRowColHeaders = false;
        }
        if (options.showRuler === true) {
            sheetFile.showRuler = true;
        }
        else if (options.showRuler === false) {
            sheetFile.showRuler = false;
        }
        if (options.showZeros === true) {
            sheetFile.showZeros = true;
        }
        else if (options.showZeros === false) {
            sheetFile.showZeros = false;
        }
        if (options.tabSelected === true) {
            sheetFile.tabSelected = true;
        }
        else if (options.tabSelected === false) {
            sheetFile.tabSelected = false;
        }
    };
    return Sheet;
}());
exports.Sheet = Sheet;
//# sourceMappingURL=sheet.js.map