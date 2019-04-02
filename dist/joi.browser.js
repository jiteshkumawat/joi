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
define("xmlElements/base/documentationNode", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var XmlDocumentation = (function () {
        function XmlDocumentation(version, encoding, standalone) {
            this.Version = version || "1.0";
            this.Encoding = encoding || "UTF-8";
            this.Standalone = standalone === false ? false : true;
        }
        XmlDocumentation.prototype.toString = function () {
            return ('<?xml version="' +
                this.Version +
                '" encoding="' +
                this.Encoding +
                '" standalone="' +
                (this.Standalone === true ? "yes" : "no") +
                '"?>\n');
        };
        return XmlDocumentation;
    }());
    exports.XmlDocumentation = XmlDocumentation;
});
define("xmlElements/base/xmlAttribute", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var XmlAttribute = (function () {
        function XmlAttribute(name, value) {
            this.Name = name || "";
            this.Value = value || "";
        }
        XmlAttribute.prototype.toString = function () {
            return this.Name + '="' + this.Value + '"';
        };
        return XmlAttribute;
    }());
    exports.XmlAttribute = XmlAttribute;
});
define("xmlElements/base/xmlNode", ["require", "exports"], function (require, exports) {
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
});
define("xmlElements/base/xmlRootNode", ["require", "exports", "xmlElements/base/xmlNode", "xmlElements/base/xmlAttribute"], function (require, exports, xmlNode_1, xmlAttribute_1) {
    "use strict";
    exports.__esModule = true;
    var XmlRootNode = (function (_super) {
        __extends(XmlRootNode, _super);
        function XmlRootNode(name, namespace, attributes) {
            var _this = _super.call(this, name, attributes) || this;
            _this.Namespaces = [];
            if (namespace) {
                _this.Namespaces.push(new xmlAttribute_1.XmlAttribute("xmlns", namespace));
            }
            return _this;
        }
        XmlRootNode.prototype.addNamespace = function (namespace, prefix) {
            prefix = prefix ? ":" + prefix : "";
            var namespaceAttr = new xmlAttribute_1.XmlAttribute("xmlns" + prefix, namespace);
            this.Namespaces.push(namespaceAttr);
            return namespaceAttr;
        };
        XmlRootNode.prototype.toString = function () {
            var attributes = "", childString = "", namespace = "";
            this.Namespaces.forEach(function (ns) {
                namespace += " " + ns.toString();
            });
            this.Attributes.forEach(function (attribute) {
                attributes += " " + attribute.toString();
            });
            this.ChildNodes.forEach(function (childNode) {
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
});
define("xmlElements/base/xmlFile", ["require", "exports", "xmlElements/base/documentationNode"], function (require, exports, documentationNode_1) {
    "use strict";
    exports.__esModule = true;
    var XmlFile = (function () {
        function XmlFile(rootNode, fileName, filePath) {
            this.Documentation = new documentationNode_1.XmlDocumentation();
            this.RootNode = rootNode || null;
            this.FileName = fileName;
            this.FilePath = filePath || "";
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
        XmlFile.prototype.saveFile = function (zipFile) {
            var content = this.toString();
            var path;
            if (this.FilePath) {
                path = zipFile.folder(this.FilePath);
            }
            (path || zipFile).file(this.FileName, content);
            return zipFile;
        };
        return XmlFile;
    }());
    exports.XmlFile = XmlFile;
});
define("xmlElements/xmlFiles/contentTypes", ["require", "exports", "xmlElements/base/xmlFile", "xmlElements/base/xmlRootNode", "xmlElements/base/xmlNode", "xmlElements/base/xmlAttribute"], function (require, exports, xmlFile_1, xmlRootNode_1, xmlNode_2, xmlAttribute_2) {
    "use strict";
    exports.__esModule = true;
    var ContentTypes = (function (_super) {
        __extends(ContentTypes, _super);
        function ContentTypes() {
            return _super.call(this, new xmlRootNode_1.XmlRootNode("Types", "http://schemas.openxmlformats.org/package/2006/content-types"), "[Content_Types].xml") || this;
        }
        ContentTypes.prototype.addDefault = function (contentType, extension) {
            var defaultNode = new xmlNode_2.XmlNode("Default", [
                new xmlAttribute_2.XmlAttribute("ContentType", contentType),
                new xmlAttribute_2.XmlAttribute("Extension", extension)
            ]);
            this.RootNode.addChild(defaultNode);
            return defaultNode;
        };
        ContentTypes.prototype.addOverride = function (contentType, partName) {
            var overrideNode = new xmlNode_2.XmlNode("Override", [
                new xmlAttribute_2.XmlAttribute("ContentType", contentType),
                new xmlAttribute_2.XmlAttribute("PartName", partName)
            ]);
            this.RootNode.addChild(overrideNode);
            return overrideNode;
        };
        return ContentTypes;
    }(xmlFile_1.XmlFile));
    exports.ContentTypes = ContentTypes;
});
define("xmlElements/xmlFiles/relationships", ["require", "exports", "xmlElements/base/xmlFile", "xmlElements/base/xmlAttribute", "xmlElements/base/xmlRootNode", "xmlElements/base/xmlNode"], function (require, exports, xmlFile_2, xmlAttribute_3, xmlRootNode_2, xmlNode_3) {
    "use strict";
    exports.__esModule = true;
    var Relationships = (function (_super) {
        __extends(Relationships, _super);
        function Relationships(fileName, filePath) {
            var _this = _super.call(this, new xmlRootNode_2.XmlRootNode("Relationships", "http://schemas.openxmlformats.org/package/2006/relationships"), fileName || ".rels", filePath || "_rels") || this;
            _this.Id = 1;
            return _this;
        }
        Relationships.prototype.addRelationship = function (target, type, id) {
            if (!id) {
                id = this.Id++;
            }
            var node = new xmlNode_3.XmlNode("Relationship", [
                new xmlAttribute_3.XmlAttribute("Target", target),
                new xmlAttribute_3.XmlAttribute("Type", type),
                new xmlAttribute_3.XmlAttribute("Id", "rId" + id.toString(10))
            ]);
            this.RootNode.addChild(node);
            return "rId" + id;
        };
        return Relationships;
    }(xmlFile_2.XmlFile));
    exports.Relationships = Relationships;
});
define("xmlElements/xmlFiles/xlsx/sheet", ["require", "exports", "xmlElements/base/xmlFile", "xmlElements/base/xmlRootNode", "xmlElements/base/xmlNode"], function (require, exports, xmlFile_3, xmlRootNode_3, xmlNode_4) {
    "use strict";
    exports.__esModule = true;
    var Sheet = (function (_super) {
        __extends(Sheet, _super);
        function Sheet(index, name) {
            var _this = this;
            index = index || 1;
            _this = _super.call(this, new xmlRootNode_3.XmlRootNode("worksheet", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "sheet" + index + ".xml", "workbook/sheets") || this;
            _this.RId = "rId" + index.toString(10);
            _this.Id = index;
            _this.Name = name || "Sheet" + index.toString(10);
            _this.sheetData = new xmlNode_4.XmlNode("sheetData");
            _this.RootNode.addChild(_this.sheetData);
            return _this;
        }
        return Sheet;
    }(xmlFile_3.XmlFile));
    exports.Sheet = Sheet;
});
define("xmlElements/xmlFiles/xlsx/workbook", ["require", "exports", "xmlElements/base/xmlFile", "xmlElements/base/xmlRootNode", "xmlElements/base/xmlNode", "xmlElements/xmlFiles/xlsx/sheet", "xmlElements/base/xmlAttribute"], function (require, exports, xmlFile_4, xmlRootNode_4, xmlNode_5, sheet_1, xmlAttribute_4) {
    "use strict";
    exports.__esModule = true;
    var Workbook = (function (_super) {
        __extends(Workbook, _super);
        function Workbook() {
            var _this = _super.call(this, new xmlRootNode_4.XmlRootNode("workbook", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "workbook.xml", "workbook") || this;
            _this.RootNode.addNamespace("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "r");
            _this.sheets = new xmlNode_5.XmlNode("sheets");
            _this.RootNode.addChild(_this.sheets);
            _this.TotalSheet = 0;
            return _this;
        }
        Workbook.prototype.addSheet = function (sheet) {
            this.sheets.addChild(new xmlNode_5.XmlNode("sheet", [
                new xmlAttribute_4.XmlAttribute("r:id", sheet.RId),
                new xmlAttribute_4.XmlAttribute("sheetId", sheet.Id.toString(10)),
                new xmlAttribute_4.XmlAttribute("name", sheet.Name)
            ]));
            this.TotalSheet++;
        };
        Workbook.prototype.createSheet = function (sheetName) {
            var sheet = new sheet_1.Sheet(this.sheets.ChildNodes.length, sheetName);
            this.addSheet(sheet);
            return sheet;
        };
        return Workbook;
    }(xmlFile_4.XmlFile));
    exports.Workbook = Workbook;
});
define("shared/fileHandler", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var FileHandler = (function () {
        function FileHandler() {
        }
        FileHandler.prototype.saveFile = function (files, fileName, callback) {
            if (typeof window !== "undefined") {
                this.saveForBrowser(files, fileName, callback);
            }
            else {
                this.saveForNode(files, fileName, callback);
            }
        };
        FileHandler.prototype.saveForBrowser = function (files, fileName, callback) {
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
        FileHandler.prototype.saveForNode = function (files, fileName, callback) {
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
        return FileHandler;
    }());
    exports.FileHandler = FileHandler;
});
define("shared/eventBus", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var EventBus = (function () {
        function EventBus() {
            this.isBrowser = typeof window !== "undefined";
            if (!this.isBrowser) {
                var events = require("events");
                this.eventEmitter = new events.EventEmitter();
            }
            else {
                this.eventEmitter = document.createElement("joi_event_emitter");
            }
        }
        EventBus.prototype.startListening = function (eventName, callback) {
            if (!this.isBrowser) {
                this.eventEmitter.on(eventName, callback);
            }
            else {
                this.eventEmitter.addEventListener(eventName, function (eventDetails) {
                    callback.apply(void 0, eventDetails.detail);
                });
            }
        };
        EventBus.prototype.stopListening = function (eventName) {
            if (!this.isBrowser) {
                this.eventEmitter.off(eventName);
            }
            else {
                this.eventEmitter.removeEventListener(event);
            }
        };
        EventBus.prototype.trigger = function (eventName) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var detail = args;
            if (!this.isBrowser) {
                (_a = this.eventEmitter).emit.apply(_a, [eventName].concat(args));
            }
            else {
                var event_1 = new CustomEvent(eventName, { detail: detail });
                this.eventEmitter.dispatchEvent(event_1);
            }
        };
        EventBus.prototype.destroy = function () {
            if (!this.isBrowser) {
                this.eventEmitter.removeAllListeners();
            }
            else {
                this.eventEmitter.remove();
                this.eventEmitter = null;
            }
            this.eventEmitter = null;
        };
        return EventBus;
    }());
    exports.EventBus = EventBus;
});
define("utility/excel/workbookUtility", ["require", "exports", "xmlElements/xmlFiles/xlsx/workbook", "xmlElements/xmlFiles/xlsx/sheet", "xmlElements/xmlFiles/relationships"], function (require, exports, workbook_1, sheet_2, relationships_1) {
    "use strict";
    exports.__esModule = true;
    var WorkbookUtility = (function () {
        function WorkbookUtility(eventBus) {
            this.eventBus = eventBus;
            this.workbook = new workbook_1.Workbook();
            this.eventBus.trigger("addFile", this.workbook);
            this.relations = new relationships_1.Relationships("workbook.xml.rels", "workbook/_rels");
            this.eventBus.trigger("addFile", this.relations);
        }
        WorkbookUtility.prototype.sheet = function (name) {
            var sheet = new sheet_2.Sheet(this.workbook.TotalSheet + 1, name);
            this.workbook.addSheet(sheet);
            this.eventBus.trigger("addFile", sheet);
            this.eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", "/" + sheet.FilePath + "/" + sheet.FileName);
            this.relations.addRelationship("sheets/" + sheet.FileName, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", sheet.Id);
            return sheet;
        };
        return WorkbookUtility;
    }());
    exports.WorkbookUtility = WorkbookUtility;
});
define("utility/excel/xlsx", ["require", "exports", "xmlElements/xmlFiles/contentTypes", "xmlElements/xmlFiles/relationships", "shared/fileHandler", "shared/eventBus", "utility/excel/workbookUtility"], function (require, exports, contentTypes_1, relationships_2, fileHandler_1, eventBus_1, workbookUtility_1) {
    "use strict";
    exports.__esModule = true;
    var Xlsx = (function () {
        function Xlsx(fileName) {
            this.files = [];
            this.initContentTypes();
            this.initRels();
            this.FileName = (fileName && fileName.trim()) || "Document.xlsx";
            this.fileHandler = new fileHandler_1.FileHandler();
            this.eventBus = new eventBus_1.EventBus();
            this.bindListeners();
            this.workbookUtility = new workbookUtility_1.WorkbookUtility(this.eventBus);
        }
        Xlsx.prototype.download = function (fileName, callback) {
            fileName = (fileName && fileName.trim()) || this.FileName;
            if (fileName) {
                if (!fileName.endsWith(".xlsx")) {
                    fileName += ".xlsx";
                }
                return this.fileHandler.saveFile(this.files, fileName, callback);
            }
        };
        Xlsx.prototype.sheet = function (name) {
            return this.workbookUtility.sheet(name);
        };
        Xlsx.prototype.initContentTypes = function () {
            this.contentTypes = new contentTypes_1.ContentTypes();
            this.files.push(this.contentTypes);
            this.contentTypes.addDefault("application/vnd.openxmlformats-package.relationships+xml", "rels");
            this.contentTypes.addDefault("application/xml", "xml");
            this.contentTypes.addOverride("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml", "/workbook/workbook.xml");
        };
        Xlsx.prototype.initRels = function () {
            this.relationships = new relationships_2.Relationships();
            this.files.push(this.relationships);
            this.relationships.addRelationship("workbook/workbook.xml", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument");
        };
        Xlsx.prototype.bindListeners = function () {
            var _this = this;
            this.eventBus.startListening("addFile", function (file) {
                _this.files.push(file);
            });
            this.eventBus.startListening("addContentType", function (type, contentType, arg) {
                if (type.toLowerCase() === "default") {
                    _this.contentTypes.addDefault(contentType, arg);
                }
                else {
                    _this.contentTypes.addOverride(contentType, arg);
                }
            });
        };
        return Xlsx;
    }());
    exports.Xlsx = Xlsx;
});
define("utility/joi.browser", ["require", "exports", "utility/excel/xlsx"], function (require, exports, xlsx_1) {
    "use strict";
    exports.__esModule = true;
    exports.joi = {
        Xlsx: xlsx_1.Xlsx
    };
});
  return require('utility/joi.browser');
}));