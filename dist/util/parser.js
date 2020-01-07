"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attribute_1 = require("../entities/base/attribute");
var node_1 = require("../entities/base/node");
/**
 * Xml Parser
 */
var XmlParser = /** @class */ (function () {
    function XmlParser() {
    }
    /**
     * Parse xml string to Xml object
     * @param content - The xml content
     * @param file - The Xml file
     * @param defaultNamespace - Default name space
     * @returns {Promise<Xml>} - Promise to resolve Xml file
     */
    XmlParser.parse = function (content, file, defaultNamespace) {
        if (typeof window !== "undefined") {
            return this.parseForBrowser(content, file, defaultNamespace);
        }
        else {
            return this.parseForNodeJS(content, file, defaultNamespace);
        }
    };
    XmlParser.parseForBrowser = function (content, file, defaultNamespace) {
        var parser = new window.DOMParser();
        var parsedXml = parser.parseFromString(content, "text/xml");
        var node = parsedXml.children[0];
        var rootNode = this.createNodeForBrowser(node, false);
        file.rootNode = rootNode;
        file.defaultNamespace = file.rootNode.namespaces[defaultNamespace];
        return Promise.resolve(file);
    };
    XmlParser.createNodeForBrowser = function (node, isChild) {
        var xmlNode, nodeNameParams, nodeName = node.tagName, nodeNamespace = "";
        if (node.tagName.indexOf(":") > 0) {
            nodeNameParams = node.tagName.split(":");
            nodeName = nodeNameParams[1];
            nodeNamespace = nodeNameParams[0];
        }
        xmlNode = new node_1.Node(nodeName, [], true, nodeNamespace);
        this.addNameSpaceForBrowser(node, xmlNode);
        for (var i = 0; i < node.attributes.length; i++) {
            var attr = node.attributes[i], attrName = attr.name, attrNamespace = "";
            if (attr.name.indexOf(":") > 0) {
                var attrParams = attr.name.split(":");
                attrName = attrParams[1];
                attrNamespace = attrParams[0];
            }
            xmlNode.attribute(new attribute_1.Attribute(attrName, attr.value, true, attrNamespace));
        }
        for (var j = 0; j < node.children.length; j++) {
            var child = this.createNodeForBrowser(node.children[j], true);
            xmlNode.child(child);
        }
        if (node.textContent) {
            xmlNode.value = node.textContent;
        }
        return xmlNode;
    };
    XmlParser.addNameSpaceForBrowser = function (node, parsedNode) {
        parsedNode.namespaces = {};
        for (var i = 0; i < node.attributes.length; i++) {
            var attr = node.attributes[i];
            if (attr.name.startsWith("xmlns")) {
                parsedNode.namespaces[attr.value] = attr.name.split(":")[1] || "";
            }
        }
    };
    XmlParser.parseForNodeJS = function (content, file, defaultNamespace) {
        var xml2js = require("xml2js"), self = this;
        return xml2js
            .parseStringPromise(content, {
            preserveChildrenOrder: true,
            explicitArray: true,
            explicitChildren: true
        })
            .then(function (parsedXml) {
            var rootNode;
            for (var node in parsedXml) {
                rootNode = self.createNodeForNodeJS(node, parsedXml, false);
                file.rootNode = rootNode;
                file.defaultNamespace = file.rootNode.namespaces[defaultNamespace];
            }
            return file;
        });
    };
    XmlParser.createNodeForNodeJS = function (nodeName, node, isChild) {
        var xmlNode;
        var nodeNameParams, _nodeName = nodeName, nodeNamespace = "";
        if (nodeName.indexOf(":") > 0) {
            nodeNameParams = nodeName.split(":");
            _nodeName = nodeNameParams[1];
            nodeNamespace = nodeNameParams[0];
        }
        xmlNode = new node_1.Node(_nodeName, [], true, nodeNamespace);
        this.addNameSpaceForNodeJS(nodeName, node, xmlNode);
        if (node[nodeName] && node[nodeName].$) {
            for (var attr in node[nodeName].$) {
                if (!attr.startsWith("xmlns")) {
                    var attrName = attr, attrNamespace = "";
                    if (attr.indexOf(":") > 0) {
                        var attrParams = attr.split(":");
                        attrName = attrParams[1];
                        attrNamespace = attrParams[0];
                    }
                    xmlNode.attribute(new attribute_1.Attribute(attrName, node[nodeName].$[attr], true, attrNamespace));
                }
            }
        }
        if (node[nodeName] && node[nodeName]._) {
            xmlNode.value = node[nodeName]._;
        }
        else {
            var self_1 = this;
            if (node[nodeName] && node[nodeName]["$$"]) {
                node[nodeName]["$$"].forEach(function (child) {
                    var childName = child["#name"];
                    var cNode = {};
                    cNode[childName] = child;
                    var childNode = self_1.createNodeForNodeJS(childName, cNode, true);
                    xmlNode.child(childNode);
                });
            }
        }
        return xmlNode;
    };
    XmlParser.addNameSpaceForNodeJS = function (nodeName, node, rootNode) {
        rootNode.namespaces = {};
        if (node[nodeName] && node[nodeName].$) {
            for (var attr in node[nodeName].$) {
                if (attr.startsWith("xmlns")) {
                    rootNode.namespaces[node[nodeName].$[attr]] =
                        attr.split(":")[1] || "";
                }
            }
        }
    };
    return XmlParser;
}());
exports.XmlParser = XmlParser;
//# sourceMappingURL=parser.js.map