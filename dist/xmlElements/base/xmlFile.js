"use strict";
exports.__esModule = true;
var documentationNode_1 = require("./documentationNode");
/**
 * Define a new xml file
 */
var XmlFile = /** @class */ (function () {
    /**
     * Creates new instance of xml file
     * @param rootNode - The root node of xml
     * @param fileName - The file name of xml
     * @param filePath - The file path of xml
     */
    function XmlFile(rootNode, fileName, filePath) {
        this.Documentation = new documentationNode_1.XmlDocumentation();
        this.RootNode = rootNode || null;
        this.FileName = fileName || "";
        this.FilePath = filePath || "";
    }
    /**
     * Add a new node to root node, or defines a new root node
     * @param node - The new xml node
     * @returns - The newly added node
     */
    XmlFile.prototype.addNode = function (node) {
        if (this.RootNode) {
            this.RootNode.child(node);
        }
        else {
            this.RootNode = node;
        }
        return node;
    };
    /**
     * Get string representation of xml file
     * @returns - The string content of file
     */
    XmlFile.prototype.toString = function () {
        var documentation = this.Documentation.toString();
        var rootNode = this.RootNode ? this.RootNode.toString() : "";
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
        if (this.FilePath) {
            path = zipFile.folder(this.FilePath);
        }
        (path || zipFile).file(this.FileName, content);
        return zipFile;
    };
    return XmlFile;
}());
exports.XmlFile = XmlFile;
//# sourceMappingURL=xmlFile.js.map