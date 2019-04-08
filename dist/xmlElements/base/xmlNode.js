"use strict";
exports.__esModule = true;
var XmlNode = (function () {
    function XmlNode(name, attributes) {
        this.Name = name;
        this.Attributes = attributes || [];
        this.Children = [];
    }
    XmlNode.prototype.addChild = function (node) {
        this.Children.push(node);
        return node;
    };
    XmlNode.prototype.attribute = function (attribute) {
        if (typeof attribute === "string") {
            return this.getAttribute(attribute);
        }
        else {
            return this.addAttribute(attribute);
        }
    };
    XmlNode.prototype.toString = function () {
        if (!this.Name) {
            return "";
        }
        var attributes = "", childString = "";
        this.Attributes.forEach(function (attribute) {
            attributes = " " + attribute.toString() + attributes;
        });
        this.Children.forEach(function (childNode) {
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
    XmlNode.prototype.addAttribute = function (attribute) {
        var savedAttr = this.getAttribute(attribute.Name);
        if (savedAttr) {
            savedAttr.Value = attribute.Value;
            return savedAttr;
        }
        this.Attributes.push(attribute);
        return attribute;
    };
    XmlNode.prototype.getAttribute = function (name) {
        var attribute = null;
        this.Attributes.forEach(function (a) {
            if (a.Name === name) {
                attribute = a;
                return a;
            }
        });
        return attribute;
    };
    return XmlNode;
}());
exports.XmlNode = XmlNode;
//# sourceMappingURL=xmlNode.js.map