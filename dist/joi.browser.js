(function (root, factory) {
  if (typeof define === 'function'){
    define(factory);
  } else {
    root.joi = factory().joi;
  }
}(this, function () {

        var requirejs,require,define;
!function(e){function n(e,n){return m.call(e,n)}function r(e,n){var r,i,t,o,u,f,l,c,s,p,a,d=n&&n.split("/"),h=g.map,m=h&&h["*"]||{};if(e){for(u=(e=e.split("/")).length-1,g.nodeIdCompat&&y.test(e[u])&&(e[u]=e[u].replace(y,"")),"."===e[0].charAt(0)&&d&&(e=d.slice(0,d.length-1).concat(e)),s=0;s<e.length;s++)if("."===(a=e[s]))e.splice(s,1),s-=1;else if(".."===a){if(0===s||1===s&&".."===e[2]||".."===e[s-1])continue;s>0&&(e.splice(s-1,2),s-=2)}e=e.join("/")}if((d||m)&&h){for(s=(r=e.split("/")).length;s>0;s-=1){if(i=r.slice(0,s).join("/"),d)for(p=d.length;p>0;p-=1)if((t=h[d.slice(0,p).join("/")])&&(t=t[i])){o=t,f=s;break}if(o)break;!l&&m&&m[i]&&(l=m[i],c=s)}!o&&l&&(o=l,f=c),o&&(r.splice(0,f,o),e=r.join("/"))}return e}function i(n,r){return function(){var i=v.call(arguments,0);return"string"!=typeof i[0]&&1===i.length&&i.push(null),c.apply(e,i.concat([n,r]))}}function t(e){return function(n){a[e]=n}}function o(r){if(n(d,r)){var i=d[r];delete d[r],h[r]=!0,l.apply(e,i)}if(!n(a,r)&&!n(h,r))throw new Error("No "+r);return a[r]}function u(e){var n,r=e?e.indexOf("!"):-1;return r>-1&&(n=e.substring(0,r),e=e.substring(r+1,e.length)),[n,e]}function f(e){return e?u(e):[]}var l,c,s,p,a={},d={},g={},h={},m=Object.prototype.hasOwnProperty,v=[].slice,y=/\.js$/;s=function(e,n){var i,t=u(e),f=t[0],l=n[1];return e=t[1],f&&(i=o(f=r(f,l))),f?e=i&&i.normalize?i.normalize(e,function(e){return function(n){return r(n,e)}}(l)):r(e,l):(f=(t=u(e=r(e,l)))[0],e=t[1],f&&(i=o(f))),{f:f?f+"!"+e:e,n:e,pr:f,p:i}},p={require:function(e){return i(e)},exports:function(e){var n=a[e];return void 0!==n?n:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:function(e){return function(){return g&&g.config&&g.config[e]||{}}}(e)}}},l=function(r,u,l,c){var g,m,v,y,j,q,x,b=[],w=typeof l;if(c=c||r,q=f(c),"undefined"===w||"function"===w){for(u=!u.length&&l.length?["require","exports","module"]:u,j=0;j<u.length;j+=1)if(y=s(u[j],q),"require"===(m=y.f))b[j]=p.require(r);else if("exports"===m)b[j]=p.exports(r),x=!0;else if("module"===m)g=b[j]=p.module(r);else if(n(a,m)||n(d,m)||n(h,m))b[j]=o(m);else{if(!y.p)throw new Error(r+" missing "+m);y.p.load(y.n,i(c,!0),t(m),{}),b[j]=a[m]}v=l?l.apply(a[r],b):void 0,r&&(g&&g.exports!==e&&g.exports!==a[r]?a[r]=g.exports:v===e&&x||(a[r]=v))}else r&&(a[r]=l)},requirejs=require=c=function(n,r,i,t,u){if("string"==typeof n)return p[n]?p[n](r):o(s(n,f(r)).f);if(!n.splice){if((g=n).deps&&c(g.deps,g.callback),!r)return;r.splice?(n=r,r=i,i=null):n=e}return r=r||function(){},"function"==typeof i&&(i=t,t=u),t?l(e,n,r,i):setTimeout(function(){l(e,n,r,i)},4),c},c.config=function(e){return c(e)},requirejs._defined=a,(define=function(e,r,i){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");r.splice||(i=r,r=[]),n(a,e)||n(d,e)||(d[e]=[e,r,i])}).amd={jQuery:!0}}();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define("entities/base/attribute", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Xml Attribute
     */
    var Attribute = /** @class */ (function () {
        /**
         * Creates new instance of an xml attribute
         * @param {string} name - The name of attribute
         * @param {string} value - The value of attribute
         * @param {boolean} state - The state of attribute
         */
        function Attribute(name, value, isActive, namespace) {
            if (value === void 0) { value = ""; }
            if (isActive === void 0) { isActive = true; }
            if (namespace === void 0) { namespace = ""; }
            this.name = name;
            this.value = value;
            this.isActive = isActive;
            this.namespace = namespace;
        }
        /**
         * Gets string for attribute
         * @returns {string} - Attribute string (Name="Value")
         */
        Attribute.prototype.toString = function () {
            if (this.name && this.isActive) {
                var attrName = this.namespace
                    ? this.namespace + ":" + this.name
                    : this.name;
                return attrName + '="' + this.value + '"';
            }
            else {
                return "";
            }
        };
        return Attribute;
    }());
    exports.Attribute = Attribute;
});
define("entities/base/documentationNode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Documentation Node
     */
    var DocumentationNode = /** @class */ (function () {
        /**
         * Creates new instance of Documentation Node
         * @param {string} version - The version of xml
         * @param {string} encoding - The encoding of xml
         * @param {boolean} standalone - Determine xml is standalone or not
         */
        function DocumentationNode(version, encoding, standalone) {
            if (version === void 0) { version = "1.0"; }
            if (encoding === void 0) { encoding = "UTF-8"; }
            if (standalone === void 0) { standalone = true; }
            this.version = version;
            this.encoding = encoding;
            this.standalone = standalone;
        }
        /**
         * Get string for node
         * @returns {string} - Node string (<?xml Attributes?>)
         */
        DocumentationNode.prototype.toString = function () {
            return ('<?xml version="' +
                this.version +
                '" encoding="' +
                this.encoding +
                '" standalone="' +
                (this.standalone === true ? "yes" : "no") +
                '"?>\n');
        };
        return DocumentationNode;
    }());
    exports.DocumentationNode = DocumentationNode;
});
define("entities/base/node", ["require", "exports", "entities/base/attribute"], function (require, exports, attribute_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.xmlns = xmlns;
            this.children = [];
            this.namespaces = {};
            if (xmlns) {
                this.namespaces[xmlns] = "";
                var namespaceAttr = new attribute_1.Attribute("xmlns", xmlns);
                this.attributes.push(namespaceAttr);
            }
        }
        /**
         * Adds a new namespace in root node
         * @param {string} namespace - The namespace string
         * @param {string} prefix - The prefix string
         * @returns {Attribute} - The namespace attribute
         */
        Node.prototype.addNamespace = function (namespace, prefix) {
            this.namespaces[namespace] = prefix;
            prefix = prefix ? ":" + prefix : "";
            var namespaceAttr = new attribute_1.Attribute("xmlns" + prefix, namespace);
            this.addAttribute(namespaceAttr);
            return namespaceAttr;
        };
        /**
         * Gets or adds a child of node
         * @param {Node | string} node - The node or node name to get or add. Use string value to search child and node value to append.
         * @param {string} namespace - The namespace of node
         * @returns {Node} - The child node
         */
        Node.prototype.child = function (node, namespace) {
            if (typeof node === "string") {
                return this.getChild(namespace ? namespace + ":" + node : node);
            }
            else {
                return this.addChild(node);
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
                !attribute.startsWith("xmlns:")) {
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
                if (attribute.name.startsWith("xmlns")) {
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
        Node.prototype.addAttribute = function (attribute) {
            var savedAttr = this.getAttribute(attribute);
            if (savedAttr) {
                savedAttr.value = attribute.value;
                return savedAttr;
            }
            this.attributes.push(attribute);
            return attribute;
        };
        Node.prototype.addChild = function (node) {
            this.children.push(node);
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
});
define("entities/base/xml", ["require", "exports", "entities/base/documentationNode"], function (require, exports, documentationNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Xml file
     */
    var Xml = /** @class */ (function () {
        /**
         * Creates new instance of xml file
         * @param {Node} rootNode - The root node of xml
         * @param {string} fileName - The file name of xml
         * @param {string} filePath - The file path of xml
         */
        function Xml(rootNode, fileName, filePath) {
            if (rootNode === void 0) { rootNode = null; }
            if (fileName === void 0) { fileName = ""; }
            if (filePath === void 0) { filePath = ""; }
            this.rootNode = rootNode;
            this.fileName = fileName;
            this.filePath = filePath;
            this.documentation = new documentationNode_1.DocumentationNode();
            this.defaultNamespace = "";
        }
        /**
         * Adds a new node to root node or file
         * @param {Node} node - The new xml node
         * @returns {Node} - The newly added node
         */
        Xml.prototype.addNode = function (node) {
            if (this.rootNode) {
                this.rootNode.child(node);
            }
            else {
                this.rootNode = node;
            }
            return node;
        };
        /**
         * Gets string for xml file
         * @returns {string} - File content
         */
        Xml.prototype.toString = function () {
            var documentation = this.documentation.toString();
            var rootNode = this.rootNode ? this.rootNode.toString() : "";
            return documentation + rootNode;
        };
        /**
         * Saves xml file
         * @param zipFile - JSZip instance to save file
         * @returns - The saved JSZip instance
         */
        Xml.prototype.saveFile = function (zipFile) {
            var content = this.toString();
            var path;
            if (this.filePath) {
                path = zipFile.folder(this.filePath);
            }
            (path || zipFile).file(this.fileName, content);
            return zipFile;
        };
        return Xml;
    }());
    exports.Xml = Xml;
});
define("entities/base/fileBase", ["require", "exports", "entities/base/xml", "entities/base/node"], function (require, exports, xml_1, node_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FileBase = /** @class */ (function (_super) {
        __extends(FileBase, _super);
        /**
         * Creates new instance of xml file
         * @param {Node} rootNode - The root node of xml
         * @param {string} fileName - The file name of xml
         * @param {string} filePath - The file path of xml
         */
        function FileBase(rootNode, fileName, filePath) {
            if (rootNode === void 0) { rootNode = null; }
            if (fileName === void 0) { fileName = ""; }
            if (filePath === void 0) { filePath = ""; }
            var _this = _super.call(this, rootNode, fileName, filePath) || this;
            _this.rootNode = rootNode;
            _this.fileName = fileName;
            _this.filePath = filePath;
            /**
             * Sequential Array of names of child of Root Node
             */
            _this.RootChildNodes = [];
            return _this;
        }
        /**
         * Get Index of child node of Root Node
         * @param node - Child node name to get
         * @returns {number} - Possible index of child node to add
         */
        FileBase.prototype.getRootChildIndex = function (node) {
            if (node === this.RootChildNodes[0]) {
                return 0;
            }
            var i = this.RootChildNodes.indexOf(node);
            while (i > 0) {
                i--;
                var n = this.RootChildNodes[i];
                if (this.rootNode.child(n)) {
                    i++;
                    break;
                }
            }
            return i;
        };
        /**
         * Add child node to root node
         * @param childName - Child node name to add
         * @param namespace - Namespace of node
         * @returns {{new: boolean, node: Node}} - Details of inserted node
         */
        FileBase.prototype.addRootChild = function (childName, namespace) {
            var savedChild = this.rootNode.child(childName, namespace || this.defaultNamespace);
            if (!savedChild) {
                var index = this.getRootChildIndex(childName);
                savedChild = new node_1.Node(childName, [], true, namespace || this.defaultNamespace);
                this.rootNode.children.splice(index, 0, savedChild);
                return { new: true, node: savedChild };
            }
            return { new: false, node: savedChild };
        };
        return FileBase;
    }(xml_1.Xml));
    exports.FileBase = FileBase;
});
define("util/parser", ["require", "exports", "entities/base/attribute", "entities/base/node"], function (require, exports, attribute_2, node_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            xmlNode = new node_2.Node(nodeName, [], true, nodeNamespace);
            this.addNameSpaceForBrowser(node, xmlNode);
            for (var i = 0; i < node.attributes.length; i++) {
                var attr = node.attributes[i], attrName = attr.name, attrNamespace = "";
                if (attr.name.indexOf(":") > 0) {
                    var attrParams = attr.name.split(":");
                    attrName = attrParams[1];
                    attrNamespace = attrParams[0];
                }
                xmlNode.attribute(new attribute_2.Attribute(attrName, attr.value, true, attrNamespace));
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
            xmlNode = new node_2.Node(_nodeName, [], true, nodeNamespace);
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
                        xmlNode.attribute(new attribute_2.Attribute(attrName, node[nodeName].$[attr], true, attrNamespace));
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
});
define("entities/files/relationships", ["require", "exports", "entities/base/xml", "entities/base/attribute", "entities/base/node", "util/parser"], function (require, exports, xml_2, attribute_3, node_3, parser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Relationship file
     */
    var Relationships = /** @class */ (function (_super) {
        __extends(Relationships, _super);
        /**
         * Creates new instance of relationship file
         * @param {string} fileName - The file name
         * @param {string} filePath - The file path
         */
        function Relationships(fileName, filePath) {
            var _this = _super.call(this, new node_3.Node("Relationships", [], true, "", "http://schemas.openxmlformats.org/package/2006/relationships"), fileName || ".rels", filePath || "_rels") || this;
            _this.id = 1;
            return _this;
        }
        /**
         * Add new relationship in root node
         * @param {string} target - The target string
         * @param {string} type - The type string
         * @param {number} id - The identity number
         * @returns {string} - The relationship identifier
         */
        Relationships.prototype.addRelationship = function (target, type, id) {
            if (typeof id === "string") {
                id = parseInt(id.match(/\d+/)[0], 10);
            }
            if (!id) {
                id = this.id++;
            }
            else {
                this.id = id + 1;
            }
            var node = new node_3.Node("Relationship", [
                new attribute_3.Attribute("Id", "rId" + id.toString(10), true, this.defaultNamespace),
                new attribute_3.Attribute("Type", type, true, this.defaultNamespace),
                new attribute_3.Attribute("Target", target, true, this.defaultNamespace)
            ], true, this.defaultNamespace);
            this.rootNode.child(node);
            return "rId" + id;
        };
        /**
         * Update Id
         */
        Relationships.prototype.updateId = function () {
            var maxId = 1;
            this.rootNode.children.forEach(function (node) {
                var id = parseInt(node.attribute("Id").value.replace("rId", ""), 10);
                if (id > maxId) {
                    maxId = id;
                }
            });
            this.id = maxId + 1;
        };
        /**
         * Get Relationship attribute
         * @param relationship - Relationship string
         */
        Relationships.prototype.getByRelationship = function (relationship) {
            var _this = this;
            return this.rootNode.children.find(function (rel) {
                if (rel.namespace === _this.defaultNamespace) {
                    var attr = rel.attribute("Type", _this.defaultNamespace);
                    return attr.value === relationship;
                }
            });
        };
        /**
         * Get Relationship by Id
         * @param rId - Relationship Id
         */
        Relationships.prototype.getById = function (rId) {
            var _this = this;
            return this.rootNode.children.find(function (rel) {
                var attr = rel.attribute("Id", _this.defaultNamespace);
                return attr.value === rId;
            });
        };
        /**
         * Load a file
         * @param zip - JS Zip file
         * @returns {Relationships}: - The Relationship object
         */
        Relationships.load = function (content, fileName, filePath) {
            return __awaiter(this, void 0, void 0, function () {
                var relationships;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            relationships = new Relationships();
                            return [4 /*yield*/, parser_1.XmlParser.parse(content, relationships, "http://schemas.openxmlformats.org/package/2006/relationships")];
                        case 1:
                            _a.sent();
                            relationships.filePath = filePath || "";
                            relationships.fileName = fileName;
                            relationships.updateId();
                            return [2 /*return*/, relationships];
                    }
                });
            });
        };
        return Relationships;
    }(xml_2.Xml));
    exports.Relationships = Relationships;
});
define("util/fileHandler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * File type in Oxml
     */
    var FileType;
    (function (FileType) {
        /**
         * Content Types file
         */
        FileType[FileType["ContentTypes"] = 0] = "ContentTypes";
        /**
         * Relationships file
         */
        FileType[FileType["Relationships"] = 1] = "Relationships";
        /**
         * Workbook file
         */
        FileType[FileType["Workbook"] = 2] = "Workbook";
        /**
         * Worksheet file
         */
        FileType[FileType["Worksheet"] = 3] = "Worksheet";
        /**
         * Shared strings file
         */
        FileType[FileType["SharedStrings"] = 4] = "SharedStrings";
        /**
         * Xml file. For any other type
         */
        FileType[FileType["Xml"] = 5] = "Xml";
    })(FileType = exports.FileType || (exports.FileType = {}));
    /**
     * Adapter class representing JSZip file
     */
    var FileAdapter = /** @class */ (function () {
        function FileAdapter() {
        }
        /**
         * Get Relationship file for a path
         * @param filePath - File Path
         * @param files - Files collection
         * @param relExtention - Relationships extention
         */
        FileAdapter.getRelationshipFile = function (filePath, files, relExtention) {
            var relFile = files.find(function (fl) {
                return fl.filePath === filePath + "/_rels" && fl.fileExtention === relExtention;
            });
            if (!relFile && filePath) {
                filePath = filePath.substring(0, filePath.indexOf("/"));
                relFile = this.getRelationshipFile(filePath, files, relExtention);
            }
            return relFile;
        };
        return FileAdapter;
    }());
    exports.FileAdapter = FileAdapter;
    /**
     * JSZip Adapter class
     */
    var JSZipAdapter = /** @class */ (function () {
        function JSZipAdapter() {
        }
        /**
         * Creates a new js zip instance and saves file
         * @param files - The collection of files
         * @param fileName - The file name
         * @param callback - The callback for Save complete
         */
        JSZipAdapter.saveFile = function (files, fileName, callback) {
            if (typeof window !== "undefined") {
                this.saveForBrowser(files, fileName, callback);
            }
            else {
                this.saveForNode(files, fileName, callback);
            }
        };
        /**
         * Load open xml file
         * @param file - The file as String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise
         * @param options - The options to load the file
         * @param callback - The callback method
         */
        JSZipAdapter.loadFile = function (file, options) {
            if (typeof window !== "undefined") {
                return this.loadForBrowser(file, options);
            }
            else {
                return this.loadForNodeJS(file, options);
            }
        };
        /**
         * Extract content from JSZip file
         * @param zip - JSZip file
         */
        JSZipAdapter.extract = function (zip) {
            return __awaiter(this, void 0, void 0, function () {
                var filesPromises, apapters, _loop_1, file;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            filesPromises = [];
                            apapters = [];
                            _loop_1 = function (file) {
                                filesPromises.push(zip
                                    .file(file)
                                    .async("string")
                                    .then(function (fileContent) {
                                    var fileAdapter = new FileAdapter();
                                    fileAdapter.completeName = file;
                                    fileAdapter.fileName = file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf("."));
                                    fileAdapter.fileNameWithExtention = file.substring(file.lastIndexOf("/") + 1);
                                    fileAdapter.filePath = file.substring(0, file.lastIndexOf("/"));
                                    fileAdapter.fileExtention = file.substring(file.lastIndexOf(".") + 1);
                                    fileAdapter.processed = false;
                                    fileAdapter.fileContent = fileContent;
                                    fileAdapter.fileType = FileType.Xml;
                                    apapters.push(fileAdapter);
                                }));
                            };
                            for (file in zip.files) {
                                _loop_1(file);
                            }
                            return [4 /*yield*/, Promise.all(filesPromises)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, Promise.resolve(apapters)];
                    }
                });
            });
        };
        /**
         * Save file for Browsers
         * @param files - The collection of files
         * @param fileName - The file name
         * @param callback - The callback for save complete
         */
        JSZipAdapter.saveForBrowser = function (files, fileName, callback) {
            try {
                var zip_1 = new JSZip();
                files.forEach(function (file) {
                    file.saveFile(zip_1);
                });
                return zip_1.generateAsync({ type: "blob" }).then(function (content) {
                    try {
                        if (typeof saveAs !== "undefined") {
                            return saveAs(content, fileName);
                        }
                        var url = window.URL.createObjectURL(content);
                        var element = document.createElement("a");
                        element.setAttribute("href", url);
                        element.setAttribute("download", fileName);
                        element.style.display = "none";
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                        if (callback) {
                            callback(zip_1);
                        }
                        else {
                            return zip_1;
                        }
                    }
                    catch (err) {
                        if (callback) {
                            callback(null, "Err: Not able to create file object.");
                        }
                        else {
                            throw err;
                        }
                    }
                });
            }
            catch (err) {
                if (callback) {
                    callback("Err: Not able to create workbook.");
                    console.error(err);
                }
                else {
                    throw err;
                }
            }
        };
        /**
         * Save files for node
         * @param files - The collection of files
         * @param fileName - The file name
         * @param callback - The callback for save complete
         */
        JSZipAdapter.saveForNode = function (files, fileName, callback) {
            try {
                var jsZip = require("jszip");
                var zip_2 = new jsZip();
                var fs = require("fs");
                files.forEach(function (file) {
                    file.saveFile(zip_2);
                });
                if (callback) {
                    zip_2
                        .generateNodeStream({ type: "nodebuffer", streamFiles: true })
                        .pipe(fs.createWriteStream(fileName))
                        .then(callback());
                }
                else {
                    return zip_2
                        .generateNodeStream({ type: "nodebuffer", streamFiles: true })
                        .pipe(fs.createWriteStream(fileName));
                }
            }
            catch (err) {
                if (callback) {
                    callback("Err: Not able to create workbook.");
                    console.error(err);
                }
                else {
                    return Promise.reject(err);
                }
            }
        };
        JSZipAdapter.loadForBrowser = function (file, options) {
            var zip = new JSZip();
            return zip.loadAsync(file, options);
        };
        JSZipAdapter.loadForNodeJS = function (file, options) {
            var zip = require("jszip");
            return zip.loadAsync(file, options);
        };
        return JSZipAdapter;
    }());
    exports.JSZipAdapter = JSZipAdapter;
});
define("util/eventBus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Defines Event Bus implementation
     */
    var EventBus = /** @class */ (function () {
        /**
         * Initialize new Event Bus
         */
        function EventBus() {
            this.isBrowser = typeof window !== "undefined";
            if (!this.isBrowser) {
                var events = require("events");
                this.eventEmitter = new events.EventEmitter();
            }
            else {
                this.eventEmitter = document.createElement("joi_event_emitter");
                this.listeners = {};
            }
        }
        /**
         * Start listening on an event
         * @param eventName - The Event Name
         * @param callback - The callback
         */
        EventBus.prototype.startListening = function (eventName, callback) {
            if (!this.isBrowser) {
                this.eventEmitter.on(eventName, callback);
            }
            else {
                var eventCallback = function (eventDetails) {
                    callback.apply(void 0, eventDetails.detail);
                };
                this.eventEmitter.addEventListener(eventName, eventCallback);
                this.listeners[eventName] = eventCallback;
            }
        };
        /**
         * Stop listeing on an event
         * @param eventName - The Event Name
         */
        EventBus.prototype.stopListening = function (eventName) {
            if (!this.isBrowser) {
                this.eventEmitter.removeAllListeners([eventName]);
            }
            else {
                this.eventEmitter.removeEventListener(eventName, this.listeners[eventName]);
                delete this.listeners[eventName];
            }
        };
        /**
         * Triggers a event on bus
         * @param eventName - The Event Name
         * @param args - The Event Arguments
         */
        EventBus.prototype.trigger = function (eventName) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var detail = args;
            if (!this.isBrowser) {
                (_a = this.eventEmitter).emit.apply(_a, __spreadArrays([eventName], args));
            }
            else {
                var event_1 = new CustomEvent(eventName, { detail: detail });
                this.eventEmitter.dispatchEvent(event_1);
            }
        };
        /**
         * Destroy all the listeners
         */
        EventBus.prototype.destroy = function () {
            if (!this.isBrowser) {
                this.eventEmitter.removeAllListeners();
            }
            else {
                this.eventEmitter.remove();
                this.eventEmitter = null;
                this.listeners = {};
            }
            this.eventEmitter = null;
        };
        return EventBus;
    }());
    exports.EventBus = EventBus;
});
define("entities/files/contentTypes", ["require", "exports", "entities/base/xml", "entities/base/node", "entities/base/attribute", "util/parser"], function (require, exports, xml_3, node_4, attribute_4, parser_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Content Types file
     */
    var ContentTypes = /** @class */ (function (_super) {
        __extends(ContentTypes, _super);
        /**
         * Creates new instance of content types
         */
        function ContentTypes(eventBus, fileName) {
            var _this = this;
            if (!fileName) {
                _this = _super.call(this, new node_4.Node("Types", [], true, "", "http://schemas.openxmlformats.org/package/2006/content-types"), "[Content_Types].xml") || this;
            }
            _this.defaults = {};
            _this.overrides = {};
            _this.bindListeners(eventBus);
            return _this;
        }
        /**
         * Add a new default node
         * @param {string} contentType - The content type string
         * @param {string} extension - The extension string
         * @returns {Node} - The default node
         */
        ContentTypes.prototype.addDefault = function (contentType, extension) {
            var defaultNode = new node_4.Node("Default", [
                new attribute_4.Attribute("ContentType", contentType, true, this.defaultNamespace),
                new attribute_4.Attribute("Extension", extension, true, this.defaultNamespace)
            ], true, this.defaultNamespace);
            this.rootNode.child(defaultNode);
            this.defaults[contentType] = extension;
            return defaultNode;
        };
        /**
         * Add a new override node
         * @param {string} contentType - The content type string
         * @param {string} partName - The part name string
         * @returns {Node} - The override node
         */
        ContentTypes.prototype.addOverride = function (contentType, partName) {
            var overrideNode = new node_4.Node("Override", [
                new attribute_4.Attribute("ContentType", contentType, true, this.defaultNamespace),
                new attribute_4.Attribute("PartName", partName, true, this.defaultNamespace)
            ], true, this.defaultNamespace);
            this.rootNode.child(overrideNode);
            this.overrides[contentType] = partName;
            return overrideNode;
        };
        /**
         * Load a file
         * @param file - File Adapter
         * @param eventBus = Event Bus
         * @returns {Promise<ContentTypes>}: - The Content Types object
         */
        ContentTypes.load = function (file, eventBus) {
            return __awaiter(this, void 0, void 0, function () {
                var contentTypes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            contentTypes = new ContentTypes(eventBus, file.fileNameWithExtention);
                            return [4 /*yield*/, parser_2.XmlParser.parse(file.fileContent, contentTypes, "http://schemas.openxmlformats.org/package/2006/content-types")];
                        case 1:
                            _a.sent();
                            contentTypes.rootNode.children.forEach(function (childNode) {
                                if (childNode.name.toLowerCase() === "default" &&
                                    childNode.namespace === contentTypes.defaultNamespace) {
                                    var contentType = childNode.attribute("ContentType", contentTypes.defaultNamespace).value;
                                    contentTypes.defaults[contentType] = childNode.attribute("Extension", contentTypes.defaultNamespace).value;
                                }
                                else if (childNode.name.toLowerCase() === "override" &&
                                    childNode.namespace === contentTypes.defaultNamespace) {
                                    var contentType_1 = childNode.attribute("ContentType", contentTypes.defaultNamespace).value;
                                    contentTypes.overrides[contentType_1] = childNode.attribute("PartName", contentTypes.defaultNamespace).value;
                                }
                            });
                            contentTypes.bindListeners(eventBus);
                            file.xmlFile = contentTypes;
                            file.processed = true;
                            return [2 /*return*/, contentTypes];
                    }
                });
            });
        };
        /**
         * Bind Listeners
         * @param eventBus - Event Bus
         */
        ContentTypes.prototype.bindListeners = function (eventBus) {
            var _this = this;
            eventBus.stopListening("addContentType");
            eventBus.startListening("addContentType", function (type, contentType, arg) {
                if (type.toLowerCase() === "default") {
                    _this.addDefault(contentType, arg);
                }
                else {
                    _this.addOverride(contentType, arg);
                }
            });
        };
        return ContentTypes;
    }(xml_3.Xml));
    exports.ContentTypes = ContentTypes;
});
define("entities/xlsx/files/sharedStringsFile", ["require", "exports", "entities/base/xml", "entities/base/node", "util/parser", "entities/base/attribute"], function (require, exports, xml_4, node_5, parser_3, attribute_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Define new Shared string file
     */
    var SharedStringsFile = /** @class */ (function (_super) {
        __extends(SharedStringsFile, _super);
        /**
         * Initialize new workbook file
         */
        function SharedStringsFile() {
            var _this = _super.call(this, new node_5.Node("sst", [], true, "", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "sharedstrings.xml", "workbook") || this;
            // this.rootNode.addNamespace(
            //   "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
            //   "r"
            // );
            _this.resetCount();
            return _this;
        }
        /**
         * Add a new shared string in workbook
         * @param {string} value - The shared string
         * @returns { index: number; value: string } - The shared string index
         */
        SharedStringsFile.prototype.add = function (value) {
            var saved = this.get(value);
            if (saved) {
                return saved;
            }
            else {
                var uniqueCount = parseInt(this.uniqueCountAttribute.value);
                this.uniqueCountAttribute.value = (++uniqueCount).toString(10);
            }
            var si = new node_5.Node("si", [], true, this.defaultNamespace);
            var t = new node_5.Node("t", [], true, this.defaultNamespace);
            t.value = value;
            si.child(t);
            this.rootNode.child(si);
            var index = this.rootNode.children.length;
            return { index: index, value: value };
        };
        /**
         * Get the shared string index
         * @param {string} value - The shared string
         * @returns {number} - The shared string index
         */
        SharedStringsFile.prototype.get = function (value) {
            for (var index = 0; index < this.rootNode.children.length; index++) {
                var tNode = this.rootNode.children[index].child("t", this.defaultNamespace);
                if ((tNode !== null &&
                    typeof value === "string" &&
                    tNode.value === value) ||
                    (typeof value === "number" && index + 1 === value)) {
                    return {
                        index: index + 1,
                        value: tNode.value
                    };
                }
            }
            return null;
        };
        /**
         * Total count of shared string used
         * @param count - Total count of shared strings used
         */
        SharedStringsFile.prototype.setCount = function (count) {
            this.countAttribute.value = count.toString();
        };
        /**
         * Add count
         */
        SharedStringsFile.prototype.addCount = function () {
            var count = parseInt(this.countAttribute.value);
            this.countAttribute.value = (++count).toString(10);
            return count;
        };
        /**
         * Load a file
         * @param content - File Content
         * @param fileName - File Name
         * @param filePath - File Path
         * @returns {Promise<SharedStringsFile>}: - The Promise resolving Shared string file
         */
        SharedStringsFile.load = function (content, fileName, filePath) {
            return __awaiter(this, void 0, void 0, function () {
                var sharedStringsFile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sharedStringsFile = new SharedStringsFile();
                            sharedStringsFile.fileName = fileName;
                            sharedStringsFile.filePath = filePath;
                            return [4 /*yield*/, parser_3.XmlParser.parse(content, sharedStringsFile, "http://schemas.openxmlformats.org/spreadsheetml/2006/main")];
                        case 1:
                            _a.sent();
                            sharedStringsFile.resetCount();
                            return [2 /*return*/, sharedStringsFile];
                    }
                });
            });
        };
        SharedStringsFile.prototype.resetCount = function () {
            var savedUniqueCount = this.rootNode.attribute("uniqueCount", this.defaultNamespace), savedCount = this.rootNode.attribute("count", this.defaultNamespace);
            if (!savedUniqueCount) {
                this.uniqueCountAttribute = new attribute_5.Attribute("uniqueCount", this.rootNode.children.length.toString(10), true, this.defaultNamespace);
                this.rootNode.attribute(this.uniqueCountAttribute);
            }
            else {
                this.uniqueCountAttribute = savedUniqueCount;
            }
            if (!savedCount) {
                this.countAttribute = new attribute_5.Attribute("count", "0", true, this.defaultNamespace);
                this.rootNode.attribute(this.countAttribute);
            }
            else {
                this.countAttribute = savedCount;
            }
        };
        return SharedStringsFile;
    }(xml_4.Xml));
    exports.SharedStringsFile = SharedStringsFile;
});
define("entities/xlsx/files/sheetFile", ["require", "exports", "entities/base/fileBase", "util/parser", "entities/base/node", "entities/base/attribute"], function (require, exports, fileBase_1, parser_4, node_6, attribute_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SheetFile = /** @class */ (function (_super) {
        __extends(SheetFile, _super);
        /**
         * Initialize new Sheet file
         * @param id - Sheet Id. Reffered in workbook file.
         * @param name - Sheet Name. Reffered in workbook file.
         */
        function SheetFile(id, name, isLoad) {
            var _this = this;
            if (!isLoad) {
                _this = _super.call(this, new node_6.Node("worksheet", [], true, "", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "sheet" + id + ".xml", "workbook/sheets") || this;
                _this.name = name;
                // this.rId = rId;
                _this.id = id;
                _this.sheetData = _this.addRootChild("sheetData", _this.defaultNamespace).node;
            }
            _this.RootChildNodes = [
                "sheetPr",
                "dimension",
                "sheetViews",
                "sheetFormatPr",
                "cols",
                "sheetData",
                "sheetCalcPr",
                "sheetProtection",
                "protectedRanges",
                "scenarios",
                "autoFilter",
                "sortState",
                "dataConsolidate",
                "customSheetViews",
                "mergeCells",
                "phoneticPr",
                "conditionalFormatting",
                "dataValidations",
                "hyperlinks",
                "printOptions",
                "pageMargins",
                "pageSetup",
                "headerFooter",
                "rowBreaks",
                "colBreaks",
                "customProperties",
                "cellWatches",
                "ignoredErrors",
                "smartTags",
                "drawing",
                "legacyDrawing",
                "legacyDrawingHF",
                "drawingHF",
                "picture",
                "oleObjects",
                "controls",
                "webPublishItems",
                "tableParts",
                "extLst"
            ];
            return _this;
        }
        Object.defineProperty(SheetFile.prototype, "showFormula", {
            /**
             * Get Show Formula attribute value
             */
            get: function () {
                return this.getSheetViewBoolAttr("showFormulas");
            },
            /**
             * Set Show Formula attribute value
             */
            set: function (value) {
                this.setSheetViewBoolAttr("showFormulas", value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SheetFile.prototype, "showGridLines", {
            /**
             * Get Show Grid Lines attribute value
             */
            get: function () {
                return this.getSheetViewBoolAttr("showGridLines");
            },
            /**
             * Set Show Grid Lines attribute value
             */
            set: function (value) {
                this.setSheetViewBoolAttr("showGridLines", value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SheetFile.prototype, "showRowColHeaders", {
            /**
             * Get Show Row Col Headers attribute value
             */
            get: function () {
                return this.getSheetViewBoolAttr("showRowColHeaders");
            },
            /**
             * Set Show Row Col Headers attribute value
             */
            set: function (value) {
                this.setSheetViewBoolAttr("showRowColHeaders", value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SheetFile.prototype, "showRuler", {
            /**
             * Get Show Ruler attribute value
             */
            get: function () {
                return this.getSheetViewBoolAttr("showRuler");
            },
            /**
             * Set Show Ruler attribute value
             */
            set: function (value) {
                this.setSheetViewBoolAttr("showRuler", value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SheetFile.prototype, "showZeros", {
            /**
             * Get Show Zeros attribute value
             */
            get: function () {
                return this.getSheetViewBoolAttr("showZeros");
            },
            /**
             * Set Show Zeros attribute value
             */
            set: function (value) {
                this.setSheetViewBoolAttr("showZeros", value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SheetFile.prototype, "tabSelected", {
            /**
             * Get Tab Selected attribute value
             */
            get: function () {
                return this.getSheetViewBoolAttr("tabSelected");
            },
            /**
             * Set Tab Selected attribute value
             */
            set: function (value) {
                this.setSheetViewBoolAttr("tabSelected", value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Load a file
         * @param content - File Content
         * @param fileName - File Name
         * @param filePath - File Path
         * @returns {Promise<SheetFile>}: - The Promise resolving Workbook File
         */
        SheetFile.load = function (content, fileName, filePath, id, name) {
            return __awaiter(this, void 0, void 0, function () {
                var sheetFile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sheetFile = new SheetFile(undefined, undefined, true);
                            return [4 /*yield*/, parser_4.XmlParser.parse(content, sheetFile, "http://schemas.openxmlformats.org/spreadsheetml/2006/main")];
                        case 1:
                            _a.sent();
                            sheetFile.fileName = fileName;
                            sheetFile.filePath = filePath;
                            sheetFile.id = id;
                            sheetFile.name = name;
                            sheetFile.sheetViews = sheetFile.rootNode.child("sheetViews", sheetFile.defaultNamespace);
                            if (sheetFile.sheetViews) {
                                sheetFile.sheetView = sheetFile.sheetViews.child("sheetView", sheetFile.defaultNamespace);
                            }
                            sheetFile.sheetData = sheetFile.rootNode.child("sheetData", sheetFile.defaultNamespace);
                            return [2 /*return*/, sheetFile];
                    }
                });
            });
        };
        SheetFile.prototype.createSheetViews = function () {
            if (!this.sheetViews) {
                this.sheetViews = this.addRootChild("sheetViews", this.defaultNamespace).node;
            }
        };
        SheetFile.prototype.createSheetView = function () {
            if (!this.sheetView) {
                this.createSheetViews();
                this.sheetView = this.sheetViews.child(new node_6.Node("sheetView", [], true, this.defaultNamespace));
            }
        };
        SheetFile.prototype.getSheetViewBoolAttr = function (attr) {
            if (!this.sheetViews || !this.sheetView) {
                return false;
            }
            else {
                var showFormulaAttr = this.sheetView.attribute(attr, this.defaultNamespace);
                return (showFormulaAttr &&
                    (showFormulaAttr.value === "1" || showFormulaAttr.value === "true"));
            }
        };
        SheetFile.prototype.setSheetViewBoolAttr = function (attr, value) {
            this.createSheetView();
            if (value) {
                this.sheetView.attribute(new attribute_6.Attribute(attr, "1", true, this.defaultNamespace));
            }
            else {
                this.sheetView.attribute(new attribute_6.Attribute(attr, "0", true, this.defaultNamespace));
            }
        };
        return SheetFile;
    }(fileBase_1.FileBase));
    exports.SheetFile = SheetFile;
});
define("entities/xlsx/files/workbookFile", ["require", "exports", "entities/base/node", "entities/xlsx/files/sheetFile", "entities/base/attribute", "util/parser", "entities/base/fileBase"], function (require, exports, node_7, sheetFile_1, attribute_7, parser_5, fileBase_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Define new workbook file
     */
    var WorkbookFile = /** @class */ (function (_super) {
        __extends(WorkbookFile, _super);
        /**
         * Initialize new workbook file
         * @param fileName - The file name
         * @param filePath - The file path
         * @param isLoad - The file
         */
        function WorkbookFile(eventBus, fileName, filePath, isLoad) {
            var _this = this;
            if (!isLoad) {
                _this = _super.call(this, new node_7.Node("workbook", [], true, "", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), fileName || "workbook.xml", filePath || "workbook") || this;
                _this.rootNode.addNamespace("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "r");
                _this.workbookViews = [];
                _this.sheets = _this.addRootChild("sheets", _this.defaultNamespace).node;
                _this.initializeView();
                _this.bindListeners(eventBus);
            }
            _this.RootChildNodes = [
                "bookViews",
                "calcPr",
                "customWorkbookViews",
                "definedNames",
                "externalReferences",
                "extLst",
                "fileRecoveryPr",
                "fileSharing",
                "fileVersion",
                "functionGroups",
                "oleSize",
                "pivotCaches",
                "sheets",
                "smartTagPr",
                "smartTagTypes",
                "webPublishing",
                "webPublishObjects",
                "workbookPr",
                "workbookProtection"
            ];
            return _this;
        }
        // /**
        //  * Index of active tab
        //  */
        // private activeTab: Attribute;
        /**
         * Creates a new sheet in workbook and returns
         * @param {string} rId = The relation Id
         * @param {string} sheetName - The sheet name
         * @returns {SheetFile} - The sheet instance
         */
        WorkbookFile.prototype.createSheet = function (sheetName) {
            var _this = this;
            var fileNameIndex = 0, sheetIndex = 0;
            this.sheets.children.forEach(function (sheetNode) {
                var _fileNameIndex = parseInt(sheetNode
                    .attribute("name", _this.defaultNamespace)
                    .value.replace("sheet", "")
                    .replace(".xml", "")) || 0;
                var _sheetIndex = parseInt(sheetNode.attribute("sheetId", _this.defaultNamespace).value) ||
                    0;
                fileNameIndex =
                    fileNameIndex < _fileNameIndex ? _fileNameIndex : fileNameIndex;
                sheetIndex = sheetIndex < _sheetIndex ? _sheetIndex : sheetIndex;
            });
            var sheet = new sheetFile_1.SheetFile(sheetIndex + 1, sheetName || "sheet" + (sheetIndex + 1).toString());
            this.addSheet(sheet);
            return sheet;
        };
        /**
         * Update Sheet Name
         * @param sheetName - Sheet Name
         * @param sheetId - Sheet Index
         */
        WorkbookFile.prototype.updateSheetName = function (sheetName, sheetId) {
            var _this = this;
            var sheetNode = this.sheets.children.find(function (sheet) {
                return parseInt(sheet.attribute("sheetId", _this.defaultNamespace).value, 10) === sheetId;
            });
            sheetNode.attribute("name", this.defaultNamespace).value = sheetName;
        };
        /**
         * Load a file
         * @param content - File Content
         * @param fileName - File Name
         * @param filePath - File Path
         * @returns {Promise<WorkbookFile>}: - The Promise resolving Workbook File
         */
        WorkbookFile.load = function (eventBus, content, fileName, filePath) {
            return __awaiter(this, void 0, void 0, function () {
                var workbookFile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            workbookFile = new WorkbookFile(eventBus, fileName, filePath, true);
                            return [4 /*yield*/, parser_5.XmlParser.parse(content, workbookFile, "http://schemas.openxmlformats.org/spreadsheetml/2006/main")];
                        case 1:
                            _a.sent();
                            workbookFile.loadInternal();
                            workbookFile.bindListeners(eventBus);
                            return [2 /*return*/, workbookFile];
                    }
                });
            });
        };
        /**
         * Load file internal
         */
        WorkbookFile.prototype.loadInternal = function () {
            var _this = this;
            var bookViews = this.rootNode.child("bookViews", this.defaultNamespace);
            this.workbookViews = [];
            if (bookViews) {
                var index_1 = 0;
                bookViews.children.forEach(function (workbookViewNode) {
                    if (workbookViewNode.name === "workbookView" &&
                        workbookViewNode.namespace === _this.defaultNamespace) {
                        _this.workbookViews.push({
                            sheets: [],
                            node: workbookViewNode,
                            index: index_1++
                        });
                    }
                });
                // this.activeTab = workbookView.attribute(
                //   "activeTab",
                //   this.defaultNamespace
                // );
            }
            this.sheets = this.rootNode.child("sheets", this.defaultNamespace);
        };
        /**
         * Bind Listeners
         * @param eventBus - Event Bus
         */
        WorkbookFile.prototype.bindListeners = function (eventBus) {
            var _this = this;
            var self = this;
            eventBus.startListening("setSheetRelationId", function (id, rId) {
                var sheetNode = self.sheets.children.find(function (sheet) {
                    return sheet.attribute("sheetId", self.defaultNamespace).value ===
                        id.toString();
                });
                sheetNode.attribute(new attribute_7.Attribute("id", rId, true, _this.rootNode.namespaces["http://schemas.openxmlformats.org/officeDocument/2006/relationships"]));
            });
            eventBus.startListening("setSheetWorkbookView", function (sheetId, index) {
                var workbookView = index
                    ? _this.workbookViews.find(function (wv) { return wv.index === index; })
                    : undefined;
                if (!workbookView) {
                    workbookView = _this.workbookViews.find(function (wv) {
                        return wv.sheets.find(function (s) { return s === sheetId; });
                    });
                    if (!workbookView) {
                        var workbookView_1 = new node_7.Node("workbookView", [], true, _this.defaultNamespace);
                        _this.workbookViews.push({
                            sheets: [sheetId],
                            node: workbookView_1,
                            index: _this.workbookViews.length
                        });
                    }
                }
                else {
                    if (!workbookView.sheets) {
                        workbookView.sheets = [];
                    }
                    if (!workbookView.sheets.find(function (s) { return s === sheetId; })) {
                        workbookView.sheets.push(sheetId);
                    }
                }
            });
        };
        /**
         * Initilize workbook view
         */
        WorkbookFile.prototype.initializeView = function () {
            this.bookViews = this.addRootChild("bookViews", this.defaultNamespace).node;
            var activeTab = new attribute_7.Attribute("activeTab", "0", true, this.defaultNamespace);
            var workbookView = new node_7.Node("workbookView", [activeTab], true, this.defaultNamespace);
            this.workbookViews.push({ sheets: [], node: workbookView, index: 0 });
            this.bookViews.child(new node_7.Node("workbookView", [activeTab], true, this.defaultNamespace));
        };
        /**
         * Add a new sheet
         * @param {SheetFile} sheet - The sheet to add
         */
        WorkbookFile.prototype.addSheet = function (sheet) {
            this.sheets.child(new node_7.Node("sheet", [
                new attribute_7.Attribute("name", sheet.name, true, this.defaultNamespace),
                new attribute_7.Attribute("sheetId", sheet.id.toString(10), true, this.defaultNamespace)
            ], true, this.defaultNamespace));
        };
        return WorkbookFile;
    }(fileBase_2.FileBase));
    exports.WorkbookFile = WorkbookFile;
});
define("util/util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Utility class with static methods to use
     */
    var Util = /** @class */ (function () {
        function Util() {
        }
        // /**
        //  * Generate new GUID
        //  * @returns - The GUID value
        //  */
        // public static guid() {
        //   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        //     var r = (Math.random() * 16) | 0,
        //       v = c == "x" ? r : (r & 0x3) | 0x8;
        //     return v.toString(16);
        //   });
        // }
        /**
         * Test if passed value is valid cell
         * @param value - Value to test
         * @returns - True if passed value is valid cell
         */
        Util.isCellString = function (value) {
            // Test values having atmost three characters and at most 7 digits starting with non zero
            var isValid = /^[A-Z]{1,3}[1-9]\d{0,6}$/.test(value);
            if (isValid) {
                var _a = this.getCellColumnRow(value), column = _a.column, row = _a.row, columnNumber = _a.columnNumber;
                isValid =
                    this.isValidColumnNumber(columnNumber) && this.isValidRowNumber(row);
            }
            return isValid;
        };
        /**
         * Test if passed value is valid cell range string
         * @param value - Value to test
         * @returns - True if passed value is range string
         */
        Util.isCellRangeString = function (value) {
            var isValid = value.indexOf(":") > 1 &&
                value.lastIndexOf(":") === value.indexOf(":") &&
                value.indexOf(":") < value.length - 2;
            if (isValid) {
                var cells = value.split(":");
                isValid = this.isCellString(cells[0]) && this.isCellString(cells[1]);
            }
            return isValid;
        };
        /**
         * Get the column and row of cell
         * @param value - Cell string representation
         * @returns - The column, row and columnNumber details of passed cell string
         */
        Util.getCellColumnRow = function (value) {
            var column = value.match(/^[A-Z]{1,3}/)[0];
            var row = parseInt(value.match(/\d{1,7}$/)[0], 10);
            var letter3 = (column.charCodeAt(2) || 64) - 64;
            var letter2 = (column.charCodeAt(1) || 64) - 64;
            var letter1 = (column.charCodeAt(0) || 64) - 64;
            return {
                column: column,
                row: row,
                columnNumber: 676 * letter3 + 26 * letter2 + letter1
            };
        };
        /**
         * Convert column number to alphabetic representation
         * @param value - Column index to convert to string
         * @returns - The string representation of column
         */
        Util.toColumnString = function (value) {
            // 'A' char code starts from 65
            return String.fromCharCode(64 + value);
        };
        /**
         * Test if value is valid row number
         * @param {number} value - The row number
         * @returns {boolean} - True if value is valid row
         */
        Util.isValidRowNumber = function (value) {
            return value && value > 0 && value <= 1048576;
        };
        /**
         * Test if value is valid column number
         * @param {number} value - The column number
         * @returns {boolean} - True if value is valid column
         */
        Util.isValidColumnNumber = function (value) {
            return value && value > 0 && value <= 16384;
        };
        return Util;
    }());
    exports.Util = Util;
});
define("app/xlsx/sheet", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Define a new worksheet file
     */
    var Sheet = /** @class */ (function () {
        function Sheet(sheetFile, eventBus, workbookFile) {
            var self = this;
            eventBus.trigger("addFile", sheetFile);
            this.defineNameProperty(sheetFile, workbookFile);
            /**
             * Configure Sheet Properties
             * @param properties - Sheet Properties JSON
             * @returns {Sheet} - Sheet Object
             */
            this.configure = function (properties) {
                self.configureInternal(properties, sheetFile);
                return self;
            };
        }
        Sheet.prototype.defineNameProperty = function (sheetFile, workbookFile) {
            Object.defineProperty(this, "name", {
                get: function () {
                    return sheetFile.name;
                },
                set: function (value) {
                    sheetFile.name = value;
                    workbookFile.updateSheetName(value, sheetFile.id);
                },
                enumerable: true,
                configurable: true
            });
        };
        Sheet.prototype.configureInternal = function (options, sheetFile) {
            if (options.showGridLines === true) {
                sheetFile.showGridLines = true;
            }
            else if (options.showGridLines === false) {
                sheetFile.showGridLines = false;
            }
            if (options.showFormula === true) {
                sheetFile.showFormula = true;
            }
            else if (options.showFormula === false) {
                sheetFile.showFormula = false;
            }
            if (options.showRowColHeaders === true) {
                sheetFile.showRowColHeaders = true;
            }
            else if (options.showRowColHeaders === false) {
                sheetFile.showRowColHeaders = false;
            }
            if (options.showRuler === true) {
                sheetFile.showRuler = true;
            }
            else if (options.showRuler === false) {
                sheetFile.showRuler = false;
            }
            if (options.showZeros === true) {
                sheetFile.showZeros = true;
            }
            else if (options.showZeros === false) {
                sheetFile.showZeros = false;
            }
            if (options.tabSelected === true) {
                sheetFile.tabSelected = true;
            }
            else if (options.tabSelected === false) {
                sheetFile.tabSelected = false;
            }
        };
        return Sheet;
    }());
    exports.Sheet = Sheet;
});
define("app/xlsx/sheet.builder", ["require", "exports", "app/xlsx/sheet", "entities/xlsx/files/sheetFile"], function (require, exports, sheet_1, sheetFile_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SheetBuilder = /** @class */ (function () {
        function SheetBuilder() {
        }
        SheetBuilder.default = function (workbookFile, eventBus, name) {
            var sheetFile = workbookFile.createSheet(name);
            var completeFilePath = "/" + sheetFile.filePath + "/" + sheetFile.fileName, relPath = "sheets/" + sheetFile.fileName;
            eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", completeFilePath);
            eventBus.trigger("addWorkbookRelation", relPath, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", function (rId) {
                eventBus.trigger("setSheetRelationId", sheetFile.id, rId);
            });
            var sheet = new sheet_1.Sheet(sheetFile, eventBus, workbookFile);
            eventBus.trigger("setSheetWorkbookView", sheetFile.id);
            return sheet;
        };
        SheetBuilder.create = function (content, eventBus, workbookFile, fileName, filePath, id, name) {
            return __awaiter(this, void 0, void 0, function () {
                var sheetFile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sheetFile_2.SheetFile.load(content, fileName, filePath, id, name)];
                        case 1:
                            sheetFile = _a.sent();
                            return [2 /*return*/, new sheet_1.Sheet(sheetFile, eventBus, workbookFile)];
                    }
                });
            });
        };
        return SheetBuilder;
    }());
    exports.SheetBuilder = SheetBuilder;
});
define("app/xlsx/workbook.util", ["require", "exports", "entities/xlsx/files/sharedStringsFile", "app/xlsx/sheet.builder"], function (require, exports, sharedStringsFile_1, sheet_builder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Utility class for workbook
     */
    var WorkbookUtility = /** @class */ (function () {
        /**
         * Instanciate new workbook utility
         * @param eventBus - Event Bus Instance
         */
        function WorkbookUtility(eventBus, workbook, relations, sharedStringFile) {
            this.bindListeners(workbook, relations, eventBus);
            /**
             * Intantiate new sheet in workbook
             * @param {string} name - Sheet name
             * @returns - The sheet instance
             */
            this.sheet = function (name) {
                var sheet = sheet_builder_1.SheetBuilder.default(workbook, eventBus, name);
                return sheet;
            };
            /**
             * Add / Get shared string in workbook
             * @param {string} value - The shared string
             * @returns {number} - Shared string id
             */
            this.sharedString = function (value) {
                if (!sharedStringFile) {
                    sharedStringFile = new sharedStringsFile_1.SharedStringsFile();
                    eventBus.trigger("addFile", sharedStringFile);
                    relations.addRelationship("sharedstrings.xml", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings");
                    eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml", "/workbook/sharedstrings.xml");
                }
                if (typeof value === "string") {
                    sharedStringFile.addCount();
                    return sharedStringFile.add(value);
                }
                else {
                    return sharedStringFile.get(value);
                }
            };
        }
        // public static load(
        //   eventBus: EventBus,
        //   loadedFiles: IWorkbookUtilityContainer
        // ) {
        //   return new WorkbookUtility(eventBus, loadedFiles);
        // }
        /**
         * Bind Event Listeners on Bus
         */
        WorkbookUtility.prototype.bindListeners = function (workbook, relations, eventBus) {
            var _this = this;
            eventBus.startListening("addWorkbookRelation", function (target, type, callback) {
                var rId = relations.addRelationship(target, type);
                if (callback) {
                    callback(rId);
                }
            });
            // eventBus.startListening("activateTab", (tabNumber: number) => {
            //   workbook.activeTab.value = tabNumber.toString(10);
            // });
            eventBus.startListening("sharedString", function (value, callback) {
                var sharedStringIndex = _this.sharedString(value);
                if (callback) {
                    callback(sharedStringIndex);
                }
            });
        };
        return WorkbookUtility;
    }());
    exports.WorkbookUtility = WorkbookUtility;
});
define("app/xlsx/workbook.util.builder", ["require", "exports", "entities/xlsx/files/workbookFile", "entities/files/relationships", "entities/xlsx/files/sharedStringsFile", "app/xlsx/workbook.util", "util/fileHandler"], function (require, exports, workbookFile_1, relationships_1, sharedStringsFile_2, workbook_util_1, fileHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Builder class for Workbook Utility
     */
    var WorkbookUtilityBuilder = /** @class */ (function () {
        function WorkbookUtilityBuilder() {
        }
        /**
         * Create default workbook utility
         * @param eventBus - Event Bus
         */
        WorkbookUtilityBuilder.default = function (eventBus) {
            var workbook;
            var relations;
            var sharedStringFile;
            workbook = new workbookFile_1.WorkbookFile(eventBus);
            eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml", "/workbook/workbook.xml");
            eventBus.trigger("addFile", workbook);
            relations = new relationships_1.Relationships("workbook.xml.rels", "workbook/_rels");
            eventBus.trigger("addFile", relations);
            var workbookUtility = new workbook_util_1.WorkbookUtility(eventBus, workbook, relations, sharedStringFile);
            return workbookUtility;
        };
        /**
         * Create a Workbook Utility from existing file
         * @param eventBus - Event bus
         * @param files - File adapter collection
         * @param contentTypes - Content types file
         */
        WorkbookUtilityBuilder.create = function (eventBus, files, contentTypes) {
            return __awaiter(this, void 0, void 0, function () {
                var workbookContentType, workbookFile, relationsFile, relation, sharedStringRel, saredStrings, sharedStringRelValue_1, sharedStringFile, workbookFileXml, workbookUtility;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            workbookContentType = contentTypes.overrides["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"];
                            if (workbookContentType.startsWith("/")) {
                                workbookContentType = workbookContentType.substring(1);
                            }
                            workbookFile = files.find(function (fl) { return fl.completeName === workbookContentType; });
                            relationsFile = fileHandler_1.FileAdapter.getRelationshipFile(workbookFile.filePath, files, contentTypes.defaults["application/vnd.openxmlformats-package.relationships+xml"]);
                            if (!!relationsFile.processed) return [3 /*break*/, 2];
                            return [4 /*yield*/, relationships_1.Relationships.load(relationsFile.fileContent, relationsFile.fileNameWithExtention, relationsFile.filePath)];
                        case 1:
                            relation = _a.sent();
                            eventBus.trigger("addFile", relation);
                            relationsFile.processed = true;
                            relationsFile.xmlFile = relation;
                            _a.label = 2;
                        case 2:
                            sharedStringRel = relation.getByRelationship("http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings");
                            if (!sharedStringRel) return [3 /*break*/, 4];
                            sharedStringRelValue_1 = sharedStringRel.attribute("Target", relation.defaultNamespace).value;
                            sharedStringFile = files.find(function (fl) {
                                return fl.filePath ===
                                    workbookFile.filePath +
                                        sharedStringRelValue_1.substring(0, sharedStringRelValue_1.lastIndexOf("/"));
                            });
                            if (!!sharedStringFile.processed) return [3 /*break*/, 4];
                            return [4 /*yield*/, sharedStringsFile_2.SharedStringsFile.load(sharedStringFile.fileContent, sharedStringFile.fileName, sharedStringFile.filePath)];
                        case 3:
                            saredStrings = _a.sent();
                            _a.label = 4;
                        case 4: return [4 /*yield*/, workbookFile_1.WorkbookFile.load(eventBus, workbookFile.fileContent, workbookFile.fileName, workbookFile.filePath)];
                        case 5:
                            workbookFileXml = _a.sent();
                            eventBus.trigger("addFile", workbookFileXml);
                            workbookFileXml.sheets.children.forEach(function (sheetNode) {
                                var rId = sheetNode.getAttribute("r:Id").value;
                                var relationNode = relation.getById(rId);
                                var filePath = relationNode.attribute("Target", relation.defaultNamespace).value;
                                // const file = files.find(
                                //   f => f.filePath + "/" + f.fileNameWithExtention === filePath
                                // );
                                // if (!file.processed) {
                                // }
                            });
                            workbookUtility = new workbook_util_1.WorkbookUtility(eventBus, workbookFileXml, relation, saredStrings);
                            return [2 /*return*/, workbookUtility];
                    }
                });
            });
        };
        return WorkbookUtilityBuilder;
    }());
    exports.WorkbookUtilityBuilder = WorkbookUtilityBuilder;
});
define("app/xlsx/xlsx.util.builder", ["require", "exports", "entities/files/contentTypes", "util/fileHandler", "util/eventBus", "entities/files/relationships", "app/xlsx/xlsx.util", "app/xlsx/workbook.util.builder"], function (require, exports, contentTypes_1, fileHandler_2, eventBus_1, relationships_2, xlsx_util_1, workbook_util_builder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XlsxBuilder = /** @class */ (function () {
        function XlsxBuilder() {
        }
        /**
         * Create an instance of Xlsx Workbook file
         * @param fileName - Workbook file name
         * @returns {Xlsx} - Workbook file (Xlsx)
         */
        XlsxBuilder.default = function (fileName) {
            var files = [];
            var contentTypes;
            var eventBus = new eventBus_1.EventBus();
            fileName = this.getFileName(fileName);
            contentTypes = this.initContentTypes(files, eventBus);
            this.bindListeners(files, eventBus);
            var workbookUtility = workbook_util_builder_1.WorkbookUtilityBuilder.default(eventBus);
            this.initRels(files, contentTypes);
            return new xlsx_util_1.Xlsx(fileName, files, workbookUtility);
        };
        /**
         * Create Xlsx from existing file
         * @param file - The oxml file
         * @param options - Options to load file
         * @param fileName - The file name
         * @param callback - Method to execute after creating Xlsx from this file
         */
        XlsxBuilder.create = function (file, options, fileName, callback) {
            return __awaiter(this, void 0, void 0, function () {
                var files, eventBus, workbookUtility, contentTypes, self, zipFile, fileAdapters, _contentTypes, xlsx;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            files = [];
                            eventBus = new eventBus_1.EventBus();
                            fileName = this.getFileName(fileName);
                            self = this;
                            return [4 /*yield*/, fileHandler_2.JSZipAdapter.loadFile(file, options)];
                        case 1:
                            zipFile = _a.sent();
                            return [4 /*yield*/, fileHandler_2.JSZipAdapter.extract(zipFile)];
                        case 2:
                            fileAdapters = _a.sent();
                            return [4 /*yield*/, self.loadContentTypes(fileAdapters, files, eventBus)];
                        case 3:
                            _contentTypes = _a.sent();
                            contentTypes = _contentTypes;
                            self.bindListeners(files, eventBus);
                            return [4 /*yield*/, workbook_util_builder_1.WorkbookUtilityBuilder.create(eventBus, fileAdapters, _contentTypes)];
                        case 4:
                            workbookUtility = _a.sent();
                            return [4 /*yield*/, self.loadRelationships(fileAdapters, files, contentTypes)];
                        case 5:
                            _a.sent();
                            xlsx = new xlsx_util_1.Xlsx(fileName, files, workbookUtility);
                            if (callback) {
                                callback(xlsx);
                            }
                            return [2 /*return*/, xlsx];
                    }
                });
            });
        };
        XlsxBuilder.getFileName = function (fileName) {
            fileName = (fileName && fileName.trim()) || "Document.xlsx";
            if (!fileName.endsWith(".xlsx")) {
                fileName = fileName + ".xlsx";
            }
            return fileName;
        };
        /**
         * Initialize content types
         */
        XlsxBuilder.initContentTypes = function (files, eventBus) {
            var contentTypes = new contentTypes_1.ContentTypes(eventBus);
            files.push(contentTypes);
            contentTypes.addDefault("application/vnd.openxmlformats-package.relationships+xml", "rels");
            contentTypes.addDefault("application/xml", "xml");
            return contentTypes;
        };
        /**
         * Bind Event Listeners on Bus
         */
        XlsxBuilder.bindListeners = function (files, eventBus) {
            eventBus.stopListening("addFile");
            eventBus.startListening("addFile", function (file) {
                files.push(file);
            });
        };
        /**
         * Initialize relationships
         */
        XlsxBuilder.initRels = function (files, contentTypes) {
            var relationships = new relationships_2.Relationships("." +
                contentTypes.defaults["application/vnd.openxmlformats-package.relationships+xml"]);
            files.push(relationships);
            relationships.addRelationship(contentTypes.overrides["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"].replace(/^[\/]+|[\/]+$/g, ""), "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument");
            return relationships;
        };
        XlsxBuilder.loadContentTypes = function (files, xmls, eventBus) {
            return __awaiter(this, void 0, void 0, function () {
                var contentTypesFile, contentTypes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            contentTypesFile = files.find(function (file) { return file.fileName === "[Content_Types]"; });
                            return [4 /*yield*/, contentTypes_1.ContentTypes.load(contentTypesFile, eventBus)];
                        case 1:
                            contentTypes = _a.sent();
                            xmls.push(contentTypes);
                            return [2 /*return*/, contentTypes];
                    }
                });
            });
        };
        XlsxBuilder.loadRelationships = function (files, xmls, contentTypes) {
            return __awaiter(this, void 0, void 0, function () {
                var relExtention, relationsFile, relation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            relExtention = contentTypes.defaults["application/vnd.openxmlformats-package.relationships+xml"];
                            relationsFile = files.find(function (file) { return file.completeName === "_rels/." + relExtention; });
                            return [4 /*yield*/, relationships_2.Relationships.load(relationsFile.fileContent, relationsFile.fileNameWithExtention, relationsFile.filePath)];
                        case 1:
                            relation = _a.sent();
                            xmls.push(relation);
                            relationsFile.processed = true;
                            relationsFile.xmlFile = relation;
                            return [2 /*return*/, relation];
                    }
                });
            });
        };
        return XlsxBuilder;
    }());
    exports.XlsxBuilder = XlsxBuilder;
});
define("app/xlsx/xlsx.util", ["require", "exports", "util/fileHandler", "app/xlsx/xlsx.util.builder"], function (require, exports, fileHandler_3, xlsx_util_builder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Define a new xlsx / excel file
     */
    var Xlsx = /** @class */ (function () {
        /**
         * Initialize a new xlsx / excel file
         * @param fileName - The file name
         */
        function Xlsx(fileName, files, workbookUtility) {
            var _this = this;
            this.fileName = fileName;
            /**
             * Download file
             * @param {string} fileName - The file name to download
             * @param {Function} callback - Callback for download complete
             */
            this.download = function (fn, callback) {
                fn = (fn && fn.trim()) || _this.fileName;
                return fileHandler_3.JSZipAdapter.saveFile(files, fn, callback);
            };
            /**
             * Adds a new sheet to workbook
             * @param {string} name - The Sheet Name
             */
            this.sheet = function (name) {
                return workbookUtility.sheet(name);
            };
        }
        /**
         * Load oxml file
         * @param file - The oxml file in String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise
         * @param options - The options to load the file
         * @param fileName - The file name
         * @param callback = The callback
         * @returns {Promise<Xlsx>} - Promise to load xlsx file
         */
        Xlsx.load = function (file, options, fileName, callback) {
            return xlsx_util_builder_1.XlsxBuilder.create(file, options, fileName, callback);
        };
        return Xlsx;
    }());
    exports.Xlsx = Xlsx;
});
define("app/joi.browser", ["require", "exports", "app/xlsx/xlsx.util", "app/xlsx/xlsx.util.builder"], function (require, exports, xlsx_util_2, xlsx_util_builder_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var xlsx = function (fileName) {
        return xlsx_util_builder_2.XlsxBuilder.default(fileName);
    };
    xlsx.load = function (file, options, fileName, callback) {
        return xlsx_util_2.Xlsx.load(file, options, fileName, callback);
    };
    exports.joi = {
        xlsx: xlsx
    };
});
  return require('app/joi.browser');
}));
