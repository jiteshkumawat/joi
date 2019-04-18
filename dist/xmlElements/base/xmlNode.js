"use strict";
exports.__esModule = true;
/**
 * Define a new node of an xml file
 */
var XmlNode = /** @class */ (function () {
    /**
     * Creates new instance of XML Node
     * @param name - The Node Name
     * @param attributes - The Attribute Collection
     */
    function XmlNode(name, attributes) {
        this.Name = name;
        this.Attributes = attributes || [];
        this.Children = [];
    }
    /**
     * Add new child to node
     * @param node - The new child node to add
     * @returns - The newly added node
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
     * @param attribute - Attribute name or instance. Pass string value to search attribute, and XmlAttribute to add / update.
     * @returns - The Xml Attribute
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
     * @returns - String representation (<Node Attributes/>)
     */
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
    /**
     * Add new attribute to node
     * @param attribute - The new attribute to add
     * @returns - The newly added attribute
     */
    XmlNode.prototype.addAttribute = function (attribute) {
        var savedAttr = this.getAttribute(attribute.Name);
        if (savedAttr) {
            savedAttr.Value = attribute.Value;
            return savedAttr;
        }
        this.Attributes.push(attribute);
        return attribute;
    };
    /**
     * Get Attribute of node
     * @param name - Name of Attribute
     * @returns - The Xml Attribute
     */
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
    /**
     * Add new child to node
     * @param node - The new child node to add
     * @returns - The newly added node
     */
    XmlNode.prototype.addChild = function (node) {
        this.Children.push(node);
        return node;
    };
    /**
     * Search for a child node
     * @param name - The child node name
     * @returns - The child node
     */
    XmlNode.prototype.getChild = function (name) {
        var child = null;
        this.Children.forEach(function (a) {
            if (a.Name === name) {
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