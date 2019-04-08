"use strict";
exports.__esModule = true;
var documentationNode_1 = require("./documentationNode");
var XmlFile = (function () {
    function XmlFile(rootNode, fileName, filePath) {
        this.Documentation = new documentationNode_1.XmlDocumentation();
        this.RootNode = rootNode || null;
        this.FileName = fileName || "";
        this.FilePath = filePath || "";
    }
    XmlFile.prototype.addNode = function (node) {
        if (this.RootNode) {
            this.RootNode.addChild(node);
        }
        else {
            this.RootNode = node;
        }
        return node;
    };
    XmlFile.prototype.toString = function () {
        var documentation = this.Documentation.toString();
        var rootNode = this.RootNode ? this.RootNode.toString() : "";
        return documentation + rootNode;
    };
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