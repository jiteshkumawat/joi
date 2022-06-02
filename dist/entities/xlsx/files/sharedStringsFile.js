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
var node_1 = require("../../base/node");
var parser_1 = require("../../../util/parser");
var attribute_1 = require("../../base/attribute");
var constants_1 = require("../../../util/constants");
/**
 * Define new Shared string file
 */
var SharedStringsFile = /** @class */ (function (_super) {
    __extends(SharedStringsFile, _super);
    /**
     * Initialize new workbook file
     */
    function SharedStringsFile() {
        var _this = _super.call(this, new node_1.Node("sst", [], true, "", constants_1.Constants.Namespace.Workbook), constants_1.Constants.FileName.SharedString, constants_1.Constants.FilePath.Workbook) || this;
        // this.rootNode.addNamespace(
        //   "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        //   "r"
        // );
        _this.resetCount();
        return _this;
    }
    /**
     * Add a new shared string in workbook
     * @param {string} value - The shared string
     * @returns { index: number; value: string } - The shared string index
     */
    SharedStringsFile.prototype.add = function (value) {
        var saved = this.get(value);
        if (saved) {
            return saved;
        }
        else {
            var uniqueCount = parseInt(this.uniqueCountAttribute.value);
            this.uniqueCountAttribute.value = (++uniqueCount).toString(10);
        }
        var si = new node_1.Node("si", [], true, this.defaultNamespace);
        var t = new node_1.Node("t", [], true, this.defaultNamespace);
        t.value = value;
        si.child(t);
        this.rootNode.child(si);
        var index = this.rootNode.children.length;
        return { index: index, value: value };
    };
    /**
     * Get the shared string index
     * @param {string} value - The shared string
     * @returns {number} - The shared string index
     */
    SharedStringsFile.prototype.get = function (value) {
        for (var index = 0; index < this.rootNode.children.length; index++) {
            var tNode = this.rootNode.children[index].child("t", this.defaultNamespace);
            if ((tNode !== null &&
                typeof value === "string" &&
                tNode.value === value) ||
                (typeof value === "number" && index + 1 === value)) {
                return {
                    index: index + 1,
                    value: tNode.value
                };
            }
        }
        return null;
    };
    /**
     * Total count of shared string used
     * @param count - Total count of shared strings used
     */
    SharedStringsFile.prototype.setCount = function (count) {
        this.countAttribute.value = count.toString();
    };
    /**
     * Add count
     */
    SharedStringsFile.prototype.addCount = function () {
        var count = parseInt(this.countAttribute.value);
        this.countAttribute.value = (++count).toString(10);
        return count;
    };
    /**
     * Load a file
     * @param content - File Content
     * @param fileName - File Name
     * @param filePath - File Path
     * @returns {Promise<SharedStringsFile>}: - The Promise resolving Shared string file
     */
    SharedStringsFile.load = function (content, fileName, filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var sharedStringsFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sharedStringsFile = new SharedStringsFile();
                        sharedStringsFile.fileName = fileName;
                        sharedStringsFile.filePath = filePath;
                        return [4 /*yield*/, parser_1.XmlParser.parse(content, sharedStringsFile, constants_1.Constants.Namespace.Workbook)];
                    case 1:
                        _a.sent();
                        sharedStringsFile.resetCount();
                        return [2 /*return*/, sharedStringsFile];
                }
            });
        });
    };
    SharedStringsFile.prototype.resetCount = function () {
        var savedUniqueCount = this.rootNode.attribute("uniqueCount", this.defaultNamespace), savedCount = this.rootNode.attribute("count", this.defaultNamespace);
        if (!savedUniqueCount) {
            this.uniqueCountAttribute = new attribute_1.Attribute("uniqueCount", this.rootNode.children.length.toString(10), true, this.defaultNamespace);
            this.rootNode.attribute(this.uniqueCountAttribute);
        }
        else {
            this.uniqueCountAttribute = savedUniqueCount;
        }
        if (!savedCount) {
            this.countAttribute = new attribute_1.Attribute("count", "0", true, this.defaultNamespace);
            this.rootNode.attribute(this.countAttribute);
        }
        else {
            this.countAttribute = savedCount;
        }
    };
    return SharedStringsFile;
}(xml_1.Xml));
exports.SharedStringsFile = SharedStringsFile;
//# sourceMappingURL=sharedStringsFile.js.map