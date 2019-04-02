"use strict";
exports.__esModule = true;
var documentationNode_1 = require("./documentationNode");
var XmlFile = (function () {
    function XmlFile(rootNode, fileName) {
        this.Documentation = new documentationNode_1.XmlDocumentation();
        this.RootNode = rootNode || null;
        this.FileName = fileName;
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
    return XmlFile;
}());
exports.XmlFile = XmlFile;
//# sourceMappingURL=xmlFile.js.map