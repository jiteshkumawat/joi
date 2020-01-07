"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var xml_1 = require("../../base/xml");
var parser_1 = require("../../../util/parser");
var node_1 = require("../../base/node");
var attribute_1 = require("../../base/attribute");
var SheetFile = /** @class */ (function (_super) {
    __extends(SheetFile, _super);
    /**
     * Initialize new Sheet file
     * @param id - Sheet Id. Reffered in workbook file.
     * @param name - Sheet Name. Reffered in workbook file.
     */
    function SheetFile(id, name, isLoad) {
        var _this = this;
        if (!isLoad) {
            _this = _super.call(this, new node_1.Node("worksheet", [], true, "", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "sheet" + id + ".xml", "workbook/sheets") || this;
            _this.name = name;
            // this.rId = rId;
            _this.id = id;
            _this.sheetData = _this.rootNode.child(new node_1.Node("sheetData", [], true, _this.defaultNamespace));
        }
        return _this;
    }
    Object.defineProperty(SheetFile.prototype, "showFormula", {
        /**
         * Get Show Formula attribute value
         */
        get: function () {
            return this.getSheetViewBoolAttr("showFormulas");
        },
        /**
         * Set Show Formula attribute value
         */
        set: function (value) {
            this.setSheetViewBoolAttr("showFormulas", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetFile.prototype, "showGridLines", {
        /**
         * Get Show Grid Lines attribute value
         */
        get: function () {
            return this.getSheetViewBoolAttr("showGridLines");
        },
        /**
         * Set Show Grid Lines attribute value
         */
        set: function (value) {
            this.setSheetViewBoolAttr("showGridLines", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetFile.prototype, "showRowColHeaders", {
        /**
         * Get Show Row Col Headers attribute value
         */
        get: function () {
            return this.getSheetViewBoolAttr("showRowColHeaders");
        },
        /**
         * Set Show Row Col Headers attribute value
         */
        set: function (value) {
            this.setSheetViewBoolAttr("showRowColHeaders", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetFile.prototype, "showRuler", {
        /**
         * Get Show Ruler attribute value
         */
        get: function () {
            return this.getSheetViewBoolAttr("showRuler");
        },
        /**
         * Set Show Ruler attribute value
         */
        set: function (value) {
            this.setSheetViewBoolAttr("showRuler", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetFile.prototype, "showZeros", {
        /**
         * Get Show Zeros attribute value
         */
        get: function () {
            return this.getSheetViewBoolAttr("showZeros");
        },
        /**
         * Set Show Zeros attribute value
         */
        set: function (value) {
            this.setSheetViewBoolAttr("showZeros", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetFile.prototype, "tabSelected", {
        /**
         * Get Tab Selected attribute value
         */
        get: function () {
            return this.getSheetViewBoolAttr("tabSelected");
        },
        /**
         * Set Tab Selected attribute value
         */
        set: function (value) {
            this.setSheetViewBoolAttr("tabSelected", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Load a file
     * @param content - File Content
     * @param fileName - File Name
     * @param filePath - File Path
     * @returns {Promise<SheetFile>}: - The Promise resolving Workbook File
     */
    SheetFile.load = function (content, fileName, filePath, id, name) {
        return __awaiter(this, void 0, void 0, function () {
            var sheetFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sheetFile = new SheetFile(undefined, undefined, true);
                        return [4 /*yield*/, parser_1.XmlParser.parse(content, sheetFile, "http://schemas.openxmlformats.org/spreadsheetml/2006/main")];
                    case 1:
                        _a.sent();
                        sheetFile.fileName = fileName;
                        sheetFile.filePath = filePath;
                        sheetFile.id = id;
                        sheetFile.name = name;
                        sheetFile.sheetViews = sheetFile.rootNode.child("sheetViews", sheetFile.defaultNamespace);
                        if (sheetFile.sheetViews) {
                            sheetFile.sheetView = sheetFile.sheetViews.child("sheetView", sheetFile.defaultNamespace);
                        }
                        sheetFile.sheetData = sheetFile.rootNode.child("sheetData", sheetFile.defaultNamespace);
                        return [2 /*return*/, sheetFile];
                }
            });
        });
    };
    SheetFile.prototype.createSheetViews = function () {
        var index = 0;
        if (!this.sheetViews) {
            if (this.rootNode.child("sheetPr", this.defaultNamespace)) {
                index++;
            }
            if (this.rootNode.child("dimension", this.defaultNamespace)) {
                index++;
            }
            this.sheetViews = new node_1.Node("sheetViews", [], true, this.defaultNamespace);
            this.rootNode.children.splice(index, 0, this.sheetViews);
        }
    };
    SheetFile.prototype.createSheetView = function () {
        if (!this.sheetView) {
            this.createSheetViews();
            this.sheetView = this.sheetViews.child(new node_1.Node("sheetView", [], true, this.defaultNamespace));
        }
    };
    SheetFile.prototype.getSheetViewBoolAttr = function (attr) {
        if (!this.sheetViews || !this.sheetView) {
            return false;
        }
        else {
            var showFormulaAttr = this.sheetView.attribute(attr, this.defaultNamespace);
            return (showFormulaAttr &&
                (showFormulaAttr.value === "1" || showFormulaAttr.value === "true"));
        }
    };
    SheetFile.prototype.setSheetViewBoolAttr = function (attr, value) {
        this.createSheetView();
        if (value) {
            this.sheetView.attribute(new attribute_1.Attribute(attr, "1", true, this.defaultNamespace));
        }
        else {
            this.sheetView.attribute(new attribute_1.Attribute(attr, "0", true, this.defaultNamespace));
        }
    };
    return SheetFile;
}(xml_1.Xml));
exports.SheetFile = SheetFile;
//# sourceMappingURL=sheetFile.js.map