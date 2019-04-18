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
exports.__esModule = true;
var xmlNode_1 = require("./xmlNode");
var xmlAttribute_1 = require("./xmlAttribute");
/**
 * Define a new root node of an xml file
 */
var XmlRootNode = /** @class */ (function (_super) {
    __extends(XmlRootNode, _super);
    /**
     * Creates new instance of XML Root Node
     * @param name - The Node Name
     * @param namespace - The Namespace of root node
     * @param attributes - The Attribute Collection
     */
    function XmlRootNode(name, namespace, attributes) {
        var _this = _super.call(this, name, attributes) || this;
        _this.Namespaces = [];
        if (namespace) {
            _this.Namespaces.push(new xmlAttribute_1.XmlAttribute("xmlns", namespace));
        }
        return _this;
    }
    /**
     * Add a new namespace in root node
     * @param namespace - The Namespace string
     * @param prefix - The prefix string
     */
    XmlRootNode.prototype.addNamespace = function (namespace, prefix) {
        prefix = prefix ? ":" + prefix : "";
        var namespaceAttr = new xmlAttribute_1.XmlAttribute("xmlns" + prefix, namespace);
        this.Namespaces.push(namespaceAttr);
        return namespaceAttr;
    };
    /**
     * Get string representation of a root node
     * @returns - String representation (<Node Namespace Attributes/>)
     */
    XmlRootNode.prototype.toString = function () {
        var attributes = "", childString = "", namespace = "";
        this.Namespaces.forEach(function (ns) {
            namespace += " " + ns.toString();
        });
        this.Attributes.forEach(function (attribute) {
            attributes += " " + attribute.toString();
        });
        this.Children.forEach(function (childNode) {
            childString += childNode.toString();
        });
        if (!childString) {
            return "<" + this.Name + namespace + attributes + "/>";
        }
        else {
            return ("<" +
                this.Name +
                namespace +
                attributes +
                ">" +
                childString +
                "</" +
                this.Name +
                ">");
        }
    };
    return XmlRootNode;
}(xmlNode_1.XmlNode));
exports.XmlRootNode = XmlRootNode;
//# sourceMappingURL=xmlRootNode.js.map