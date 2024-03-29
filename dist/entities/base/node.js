"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attribute_1 = require("./attribute");
var constants_1 = require("../../util/constants");
/**
 * Xml Node
 */
var Node = /** @class */ (function () {
    /**
     * Creates new instance of XML Node
     * @param {string} name - The node name
     * @param {Attribute[]} attributes - The attribute collection
     */
    function Node(name, attributes, isActive, namespace, xmlns) {
        if (attributes === void 0) { attributes = []; }
        if (isActive === void 0) { isActive = true; }
        if (namespace === void 0) { namespace = ""; }
        if (xmlns === void 0) { xmlns = ""; }
        this.name = name;
        this.attributes = attributes;
        this.isActive = isActive;
        this.namespace = namespace;
        this._children = [];
        this.namespaces = {};
        if (xmlns) {
            this.namespaces[xmlns] = "";
            var namespaceAttr = new attribute_1.Attribute(constants_1.Constants.Common.Xmlns, xmlns);
            this.attributes.push(namespaceAttr);
        }
    }
    Object.defineProperty(Node.prototype, "children", {
        /**
         * The child nodes collection
         */
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a new namespace in root node
     * @param {string} namespace - The namespace string
     * @param {string} prefix - The prefix string
     * @returns {Attribute} - The namespace attribute
     */
    Node.prototype.addNamespace = function (namespace, prefix) {
        this.namespaces[namespace] = prefix;
        prefix = prefix ? ":" + prefix : "";
        var namespaceAttr = new attribute_1.Attribute(constants_1.Constants.Common.Xmlns + prefix, namespace);
        this.addAttribute(namespaceAttr);
        return namespaceAttr;
    };
    /**
     * Get prefix using namespace, which can be used on node.
     * Eg. For Relationship Prefix.
     * Input: http://schemas.openxmlformats.org/officeDocument/2006/relationships.
     * Possible Output: r
     * @param namespace - The namespace string
     */
    Node.prototype.getNamespacePrefix = function (namespace) {
        if (this.namespaces && this.namespaces[namespace]) {
            return this.namespaces[namespace];
        }
        if (this.parent) {
            return this.parent.getNamespacePrefix(namespace);
        }
        return null;
    };
    /**
     * Gets or adds a child of node
     * @param {Node | string} node - The node or node name to get or add. Use string value to search child and node value to append.
     * @param {string} namespace - The namespace of node
     * @param {number} index - The child index
     * @returns {Node} - The child node
     */
    Node.prototype.child = function (node, namespace, index) {
        if (typeof node === "string") {
            return this.getChild(namespace ? namespace + ":" + node : node);
        }
        else {
            return this.addChild(node, index);
        }
    };
    /**
     * Gets or adds Attributes of node
     * @param {Attribute | string} attribute - The attribute or attribute name to get or add. Use string value to search attribute and attribute value to append.
     * @param {string} namespace - The namespace
     * @returns {Attribute} - The xml attribute
     */
    Node.prototype.attribute = function (attribute, namespace) {
        if (typeof attribute === "string") {
            if (namespace) {
                attribute = namespace + ":" + attribute;
            }
            return this.getAttribute(attribute);
        }
        else {
            return this.addAttribute(attribute);
        }
    };
    /**
     * Get saved attribute in a node
     * @param attribute - Attribute string or entity
     */
    Node.prototype.getAttribute = function (attribute) {
        var savedAttribute = null, attrName = typeof attribute === "string" ? attribute : attribute.name, attrNamespace = typeof attribute === "string" ? "" : attribute.namespace;
        if (typeof attribute === "string" &&
            attribute.indexOf(":") > 0 &&
            !attribute.startsWith(constants_1.Constants.Common.Xmlns + ":")) {
            var attrValues = attribute.split(":");
            attrName = attrValues[1];
            attrNamespace = attrValues[0];
        }
        this.attributes.forEach(function (a) {
            if (a.name.toLowerCase() === attrName.toLowerCase() &&
                a.namespace === attrNamespace) {
                savedAttribute = a;
                return a;
            }
        });
        return savedAttribute;
    };
    /**
     * Gets string for node
     * @returns {string} - Node string (<Node Attributes><Child/></Node>)
     */
    Node.prototype.toString = function () {
        if (!this.name || !this.isActive) {
            return "";
        }
        var nodeName = this.namespace
            ? this.namespace + ":" + this.name
            : this.name;
        var attributes = "", childString = "", xmlns = "";
        this.attributes.forEach(function (attribute) {
            if (attribute.name.startsWith(constants_1.Constants.Common.Xmlns)) {
                xmlns = xmlns + " " + attribute.toString();
            }
            else {
                attributes = attributes + " " + attribute.toString();
            }
        });
        this.children.forEach(function (childNode) {
            childString += childNode.toString();
        });
        if (!childString) {
            if (!this.value) {
                return "<" + nodeName + xmlns + attributes + "/>";
            }
            else {
                return ("<" +
                    nodeName +
                    xmlns +
                    attributes +
                    ">" +
                    this.value +
                    "</" +
                    nodeName +
                    ">");
            }
        }
        else {
            return ("<" +
                nodeName +
                xmlns +
                attributes +
                ">" +
                childString +
                "</" +
                nodeName +
                ">");
        }
    };
    /**
     * Convert Node to JSON
     */
    Node.prototype.toJSON = function () {
        return {
            name: this.name,
            attributes: this.attributes,
            isActive: this.isActive,
            namespace: this.namespace,
            namespaces: this.namespaces,
            children: this._children
        };
    };
    Node.prototype.addAttribute = function (attribute) {
        var savedAttr = this.getAttribute(attribute);
        if (savedAttr) {
            savedAttr.value = attribute.value;
            return savedAttr;
        }
        this.attributes.push(attribute);
        return attribute;
    };
    Node.prototype.addChild = function (node, index) {
        node.parent = this;
        if (isNaN(index)) {
            this._children.push(node);
        }
        else {
            this._children.splice(index, 0, node);
        }
        return node;
    };
    Node.prototype.getChild = function (name) {
        var child = null, nodeName = name, nodeNamespace = "";
        if (name.indexOf(":") > 0) {
            var nodeNameAttr = name.split(":");
            nodeName = nodeNameAttr[1];
            nodeNamespace = nodeNameAttr[0];
        }
        this.children.forEach(function (a) {
            if (a.name === nodeName && a.namespace === nodeNamespace) {
                child = a;
                return a;
            }
        });
        return child;
    };
    return Node;
}());
exports.Node = Node;
//# sourceMappingURL=node.js.map