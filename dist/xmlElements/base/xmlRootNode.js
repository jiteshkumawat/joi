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
Object.defineProperty(exports, "__esModule", { value: true });
var xmlNode_1 = require("./xmlNode");
var xmlAttribute_1 = require("./xmlAttribute");
/**
 * Define a new root node of an xml file
 */
var XmlRootNode = /** @class */ (function (_super) {
    __extends(XmlRootNode, _super);
    /**
     * Creates new instance of XML Root Node
     * @param {string} name - The Node Name
     * @param {string} namespace - The Namespace of root node
     * @param {XmlAttribute[]} attributes - The Attribute Collection
     */
    function XmlRootNode(name, namespace, attributes) {
        var _this = _super.call(this, name, attributes) || this;
        _this.namespaces = [];
        if (namespace) {
            _this.namespaces.push(new xmlAttribute_1.XmlAttribute("xmlns", namespace));
        }
        return _this;
    }
    /**
     * Add a new namespace in root node
     * @param {string} namespace - The Namespace string
     * @param {string} prefix - The prefix string
     * @returns {XmlAttribute} - The namespace attribute
     */
    XmlRootNode.prototype.addNamespace = function (namespace, prefix) {
        prefix = prefix ? ":" + prefix : "";
        var namespaceAttr = new xmlAttribute_1.XmlAttribute("xmlns" + prefix, namespace);
        this.namespaces.push(namespaceAttr);
        return namespaceAttr;
    };
    /**
     * Get string representation of a root node
     * @returns {string} - String representation (<Node Namespace Attributes/>)
     */
    XmlRootNode.prototype.toString = function () {
        var attributes = "", childString = "", namespace = "";
        this.namespaces.forEach(function (ns) {
            namespace += " " + ns.toString();
        });
        this.attributes.forEach(function (attribute) {
            attributes += " " + attribute.toString();
        });
        this.children.forEach(function (childNode) {
            childString += childNode.toString();
        });
        if (!childString) {
            return "<" + this.name + namespace + attributes + "/>";
        }
        else {
            return ("<" +
                this.name +
                namespace +
                attributes +
                ">" +
                childString +
                "</" +
                this.name +
                ">");
        }
    };
    return XmlRootNode;
}(xmlNode_1.XmlNode));
exports.XmlRootNode = XmlRootNode;
//# sourceMappingURL=xmlRootNode.js.map