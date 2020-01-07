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
var node_1 = require("../base/node");
var attribute_1 = require("../base/attribute");
var parser_1 = require("../../util/parser");
/**
 * Content Types file
 */
var ContentTypes = /** @class */ (function (_super) {
    __extends(ContentTypes, _super);
    /**
     * Creates new instance of content types
     */
    function ContentTypes(eventBus, fileName) {
        var _this = this;
        if (!fileName) {
            _this = _super.call(this, new node_1.Node("Types", [], true, "", "http://schemas.openxmlformats.org/package/2006/content-types"), "[Content_Types].xml") || this;
        }
        _this.defaults = {};
        _this.overrides = {};
        _this.bindListeners(eventBus);
        return _this;
    }
    /**
     * Add a new default node
     * @param {string} contentType - The content type string
     * @param {string} extension - The extension string
     * @returns {Node} - The default node
     */
    ContentTypes.prototype.addDefault = function (contentType, extension) {
        var defaultNode = new node_1.Node("Default", [
            new attribute_1.Attribute("ContentType", contentType, true, this.defaultNamespace),
            new attribute_1.Attribute("Extension", extension, true, this.defaultNamespace)
        ], true, this.defaultNamespace);
        this.rootNode.child(defaultNode);
        this.defaults[contentType] = extension;
        return defaultNode;
    };
    /**
     * Add a new override node
     * @param {string} contentType - The content type string
     * @param {string} partName - The part name string
     * @returns {Node} - The override node
     */
    ContentTypes.prototype.addOverride = function (contentType, partName) {
        var overrideNode = new node_1.Node("Override", [
            new attribute_1.Attribute("ContentType", contentType, true, this.defaultNamespace),
            new attribute_1.Attribute("PartName", partName, true, this.defaultNamespace)
        ], true, this.defaultNamespace);
        this.rootNode.child(overrideNode);
        this.overrides[contentType] = partName;
        return overrideNode;
    };
    /**
     * Load a file
     * @param file - File Adapter
     * @param eventBus = Event Bus
     * @returns {Promise<ContentTypes>}: - The Content Types object
     */
    ContentTypes.load = function (file, eventBus) {
        return __awaiter(this, void 0, void 0, function () {
            var contentTypes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentTypes = new ContentTypes(eventBus, file.fileNameWithExtention);
                        return [4 /*yield*/, parser_1.XmlParser.parse(file.fileContent, contentTypes, "http://schemas.openxmlformats.org/package/2006/content-types")];
                    case 1:
                        _a.sent();
                        contentTypes.rootNode.children.forEach(function (childNode) {
                            if (childNode.name.toLowerCase() === "default" &&
                                childNode.namespace === contentTypes.defaultNamespace) {
                                var contentType = childNode.attribute("ContentType", contentTypes.defaultNamespace).value;
                                contentTypes.defaults[contentType] = childNode.attribute("Extension", contentTypes.defaultNamespace).value;
                            }
                            else if (childNode.name.toLowerCase() === "override" &&
                                childNode.namespace === contentTypes.defaultNamespace) {
                                var contentType_1 = childNode.attribute("ContentType", contentTypes.defaultNamespace).value;
                                contentTypes.overrides[contentType_1] = childNode.attribute("PartName", contentTypes.defaultNamespace).value;
                            }
                        });
                        contentTypes.bindListeners(eventBus);
                        file.xmlFile = contentTypes;
                        file.processed = true;
                        return [2 /*return*/, contentTypes];
                }
            });
        });
    };
    /**
     * Bind Listeners
     * @param eventBus - Event Bus
     */
    ContentTypes.prototype.bindListeners = function (eventBus) {
        var _this = this;
        eventBus.stopListening("addContentType");
        eventBus.startListening("addContentType", function (type, contentType, arg) {
            if (type.toLowerCase() === "default") {
                _this.addDefault(contentType, arg);
            }
            else {
                _this.addOverride(contentType, arg);
            }
        });
    };
    return ContentTypes;
}(xml_1.Xml));
exports.ContentTypes = ContentTypes;
//# sourceMappingURL=contentTypes.js.map