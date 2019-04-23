"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define a new node of an xml file
 */
var XmlNode = /** @class */ (function () {
    /**
     * Creates new instance of XML Node
     * @param {string} name - The Node Name
     * @param {XmlAttribute[]} attributes - The Attribute Collection
     */
    function XmlNode(name, attributes) {
        if (attributes === void 0) { attributes = []; }
        this.name = name;
        this.attributes = attributes;
        this.children = [];
    }
    /**
     * Add or get child of node
     * @param {string | XmlNode} node - The new child node to add
     * @returns {XmlNode} - The newly added node
     */
    XmlNode.prototype.child = function (node) {
        if (typeof node === "string") {
            return this.getChild(node);
        }
        else {
            return this.addChild(node);
        }
    };
    /**
     * Get or adds Attributes of node
     * @param {string | XmlAttribute} attribute - Attribute name or instance. Pass string value to search attribute, and XmlAttribute to add / update.
     * @returns {XmlAttribute} - The Xml Attribute
     */
    XmlNode.prototype.attribute = function (attribute) {
        if (typeof attribute === "string") {
            return this.getAttribute(attribute);
        }
        else {
            return this.addAttribute(attribute);
        }
    };
    /**
     * Get string representation of a node
     * @returns {string} - String representation (<Node Attributes/>)
     */
    XmlNode.prototype.toString = function () {
        if (!this.name) {
            return "";
        }
        var attributes = "", childString = "";
        this.attributes.forEach(function (attribute) {
            attributes = " " + attribute.toString() + attributes;
        });
        this.children.forEach(function (childNode) {
            childString += childNode.toString();
        });
        if (!childString) {
            if (!this.value) {
                return "<" + this.name + attributes + "/>";
            }
            else {
                return ("<" +
                    this.name +
                    attributes +
                    ">" +
                    this.value +
                    "</" +
                    this.name +
                    ">");
            }
        }
        else {
            return ("<" +
                this.name +
                attributes +
                ">" +
                childString +
                "</" +
                this.name +
                ">");
        }
    };
    /**
     * Add new attribute to node
     * @param {XmlAttribute} attribute - The new attribute to add
     * @returns {XmlAttribute} - The newly added attribute
     */
    XmlNode.prototype.addAttribute = function (attribute) {
        var savedAttr = this.getAttribute(attribute.name);
        if (savedAttr) {
            savedAttr.value = attribute.value;
            return savedAttr;
        }
        this.attributes.push(attribute);
        return attribute;
    };
    /**
     * Get Attribute of node
     * @param {string} name - Name of Attribute
     * @returns {XmlAttribute} - The Xml Attribute
     */
    XmlNode.prototype.getAttribute = function (name) {
        var attribute = null;
        this.attributes.forEach(function (a) {
            if (a.name === name) {
                attribute = a;
                return a;
            }
        });
        return attribute;
    };
    /**
     * Add new child to node
     * @param {XmlNode} node - The new child node to add
     * @returns {XmlNode} - The newly added node
     */
    XmlNode.prototype.addChild = function (node) {
        this.children.push(node);
        return node;
    };
    /**
     * Search for a child node
     * @param {string} name - The child node name
     * @returns {XmlNode} - The child node
     */
    XmlNode.prototype.getChild = function (name) {
        var child = null;
        this.children.forEach(function (a) {
            if (a.name === name) {
                child = a;
                return a;
            }
        });
        return child;
    };
    return XmlNode;
}());
exports.XmlNode = XmlNode;
//# sourceMappingURL=xmlNode.js.map