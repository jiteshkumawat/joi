"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var documentationNode_1 = require("./documentationNode");
/**
 * Define a new xml file
 */
var XmlFile = /** @class */ (function () {
    /**
     * Creates new instance of xml file
     * @param {XmlRootNode} rootNode - The root node of xml
     * @param {string} fileName - The file name of xml
     * @param {string} filePath - The file path of xml
     */
    function XmlFile(rootNode, fileName, filePath) {
        if (rootNode === void 0) { rootNode = null; }
        if (fileName === void 0) { fileName = ""; }
        if (filePath === void 0) { filePath = ""; }
        this.rootNode = rootNode;
        this.fileName = fileName;
        this.filePath = filePath;
        this.documentation = new documentationNode_1.XmlDocumentation();
    }
    /**
     * Add a new node to root node, or defines a new root node
     * @param {XmlNode} node - The new xml node
     * @returns {XmlNode} - The newly added node
     */
    XmlFile.prototype.addNode = function (node) {
        if (this.rootNode) {
            this.rootNode.child(node);
        }
        else {
            this.rootNode = node;
        }
        return node;
    };
    /**
     * Get string representation of xml file
     * @returns {string} - The string content of file
     */
    XmlFile.prototype.toString = function () {
        var documentation = this.documentation.toString();
        var rootNode = this.rootNode ? this.rootNode.toString() : "";
        return documentation + rootNode;
    };
    /**
     * Save the xml file
     * @param zipFile - JSZip instance to save file
     * @returns - The saved JSZip instance
     */
    XmlFile.prototype.saveFile = function (zipFile) {
        var content = this.toString();
        var path;
        if (this.filePath) {
            path = zipFile.folder(this.filePath);
        }
        (path || zipFile).file(this.fileName, content);
        return zipFile;
    };
    return XmlFile;
}());
exports.XmlFile = XmlFile;
//# sourceMappingURL=xmlFile.js.map