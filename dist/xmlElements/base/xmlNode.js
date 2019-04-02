"use strict";
exports.__esModule = true;
var XmlNode = (function () {
    function XmlNode(name, attributes) {
        this.Name = name;
        this.Attributes = attributes || [];
        this.ChildNodes = [];
    }
    XmlNode.prototype.addAttribute = function (attribute) {
        this.Attributes.push(attribute);
        return attribute;
    };
    XmlNode.prototype.addChild = function (node) {
        this.ChildNodes.push(node);
        return node;
    };
    XmlNode.prototype.toString = function () {
        var attributes = "", childString = "";
        this.Attributes.forEach(function (attribute) {
            attributes += " " + attribute.toString();
        });
        this.ChildNodes.forEach(function (childNode) {
            childString += childNode.toString();
        });
        if (!childString) {
            return "<" + this.Name + attributes + "/>";
        }
        else {
            return ("<" +
                this.Name +
                attributes +
                ">" +
                childString +
                "</" +
                this.Name +
                ">");
        }
    };
    return XmlNode;
}());
exports.XmlNode = XmlNode;
//# sourceMappingURL=xmlNode.js.map