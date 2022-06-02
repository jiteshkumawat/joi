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
var xml_1 = require("../base/xml");
var attribute_1 = require("../base/attribute");
var node_1 = require("../base/node");
var parser_1 = require("../../util/parser");
var constants_1 = require("../../util/constants");
/**
 * Relationship file
 */
var Relationships = /** @class */ (function (_super) {
    __extends(Relationships, _super);
    /**
     * Creates new instance of relationship file
     * @param {string} fileName - The file name
     * @param {string} filePath - The file path
     */
    function Relationships(fileName, filePath) {
        var _this = _super.call(this, new node_1.Node("Relationships", [], true, "", constants_1.Constants.Namespace.RelationshipPackage), fileName || constants_1.Constants.FileName.Relationship, filePath || constants_1.Constants.FilePath.Relationship) || this;
        _this.id = 1;
        return _this;
    }
    /**
     * Add new relationship in root node
     * @param {string} target - The target string
     * @param {string} type - The type string
     * @param {number} id - The identity number
     * @returns {string} - The relationship identifier
     */
    Relationships.prototype.addRelationship = function (target, type, id) {
        if (typeof id === "string") {
            id = parseInt(id.match(constants_1.Constants.Regex.NumericId)[0], 10);
        }
        if (!id) {
            id = this.id++;
        }
        else {
            this.id = id + 1;
        }
        var node = new node_1.Node("Relationship", [
            new attribute_1.Attribute("Id", "rId" + id.toString(10), true, this.defaultNamespace),
            new attribute_1.Attribute("Type", type, true, this.defaultNamespace),
            new attribute_1.Attribute("Target", target, true, this.defaultNamespace)
        ], true, this.defaultNamespace);
        this.rootNode.child(node);
        return "rId" + id;
    };
    /**
     * Update Id
     */
    Relationships.prototype.updateId = function () {
        var maxId = 1;
        this.rootNode.children.forEach(function (node) {
            var id = parseInt(node.attribute("Id").value.replace("rId", ""), 10);
            if (id > maxId) {
                maxId = id;
            }
        });
        this.id = maxId + 1;
    };
    /**
     * Get Relationship attribute
     * @param relationship - Relationship string
     */
    Relationships.prototype.getByRelationship = function (relationship) {
        var _this = this;
        return this.rootNode.children.find(function (rel) {
            if (rel.namespace === _this.defaultNamespace) {
                var attr = rel.attribute("Type", _this.defaultNamespace);
                return attr.value === relationship;
            }
        });
    };
    /**
     * Get Relationship by Id
     * @param rId - Relationship Id
     */
    Relationships.prototype.getById = function (rId) {
        var _this = this;
        return this.rootNode.children.find(function (rel) {
            var attr = rel.attribute("Id", _this.defaultNamespace);
            return attr.value === rId;
        });
    };
    /**
     * Load a file
     * @param zip - JS Zip file
     * @returns {Relationships}: - The Relationship object
     */
    Relationships.load = function (content, fileName, filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var relationships;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        relationships = new Relationships();
                        return [4 /*yield*/, parser_1.XmlParser.parse(content, relationships, constants_1.Constants.Namespace.RelationshipPackage)];
                    case 1:
                        _a.sent();
                        relationships.filePath = filePath || "";
                        relationships.fileName = fileName;
                        relationships.updateId();
                        return [2 /*return*/, relationships];
                }
            });
        });
    };
    return Relationships;
}(xml_1.Xml));
exports.Relationships = Relationships;
//# sourceMappingURL=relationships.js.map