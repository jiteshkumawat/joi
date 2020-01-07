"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var documentationNode_1 = require("./documentationNode");
/**
 * Xml file
 */
var Xml = /** @class */ (function () {
    /**
     * Creates new instance of xml file
     * @param {Node} rootNode - The root node of xml
     * @param {string} fileName - The file name of xml
     * @param {string} filePath - The file path of xml
     */
    function Xml(rootNode, fileName, filePath) {
        if (rootNode === void 0) { rootNode = null; }
        if (fileName === void 0) { fileName = ""; }
        if (filePath === void 0) { filePath = ""; }
        this.rootNode = rootNode;
        this.fileName = fileName;
        this.filePath = filePath;
        this.documentation = new documentationNode_1.DocumentationNode();
        this.defaultNamespace = "";
    }
    /**
     * Adds a new node to root node or file
     * @param {Node} node - The new xml node
     * @returns {Node} - The newly added node
     */
    Xml.prototype.addNode = function (node) {
        if (this.rootNode) {
            this.rootNode.child(node);
        }
        else {
            this.rootNode = node;
        }
        return node;
    };
    /**
     * Gets string for xml file
     * @returns {string} - File content
     */
    Xml.prototype.toString = function () {
        var documentation = this.documentation.toString();
        var rootNode = this.rootNode ? this.rootNode.toString() : "";
        return documentation + rootNode;
    };
    /**
     * Saves xml file
     * @param zipFile - JSZip instance to save file
     * @returns - The saved JSZip instance
     */
    Xml.prototype.saveFile = function (zipFile) {
        var content = this.toString();
        var path;
        if (this.filePath) {
            path = zipFile.folder(this.filePath);
        }
        (path || zipFile).file(this.fileName, content);
        return zipFile;
    };
    return Xml;
}());
exports.Xml = Xml;
//# sourceMappingURL=xml.js.map