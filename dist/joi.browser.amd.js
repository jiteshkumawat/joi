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
    Object.defineProperty(exports, "__esModule", { value: true });
    var XmlDocumentation = (function () {
        function XmlDocumentation(version, encoding, standalone) {
            if (version === void 0) { version = "1.0"; }
            if (encoding === void 0) { encoding = "UTF-8"; }
            if (standalone === void 0) { standalone = true; }
            this.version = version;
            this.encoding = encoding;
            this.standalone = standalone;
        }
        XmlDocumentation.prototype.toString = function () {
            return ('<?xml version="' +
                this.version +
                '" encoding="' +
                this.encoding +
                '" standalone="' +
                (this.standalone === true ? "yes" : "no") +
                '"?>\n');
        };
        return XmlDocumentation;
    }());
    exports.XmlDocumentation = XmlDocumentation;
});
define("xmlElements/base/xmlAttribute", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XmlAttribute = (function () {
        function XmlAttribute(name, value, state) {
            if (value === void 0) { value = ""; }
            if (state === void 0) { state = true; }
            this.name = name;
            this.value = value;
            this.state = state;
        }
        XmlAttribute.prototype.toString = function () {
            if (this.name && this.state) {
                return this.name + '="' + this.value + '"';
            }
            else {
                return "";
            }
        };
        return XmlAttribute;
    }());
    exports.XmlAttribute = XmlAttribute;
});
define("xmlElements/base/xmlNode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XmlNode = (function () {
        function XmlNode(name, attributes) {
            if (attributes === void 0) { attributes = []; }
            this.name = name;
            this.attributes = attributes;
            this.children = [];
        }
        XmlNode.prototype.child = function (node) {
            if (typeof node === "string") {
                return this.getChild(node);
            }
            else {
                return this.addChild(node);
            }
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
        XmlNode.prototype.addAttribute = function (attribute) {
            var savedAttr = this.getAttribute(attribute.name);
            if (savedAttr) {
                savedAttr.value = attribute.value;
                return savedAttr;
            }
            this.attributes.push(attribute);
            return attribute;
        };
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
        XmlNode.prototype.addChild = function (node) {
            this.children.push(node);
            return node;
        };
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
});
define("xmlElements/base/xmlRootNode", ["require", "exports", "xmlElements/base/xmlNode", "xmlElements/base/xmlAttribute"], function (require, exports, xmlNode_1, xmlAttribute_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XmlRootNode = (function (_super) {
        __extends(XmlRootNode, _super);
        function XmlRootNode(name, namespace, attributes) {
            var _this = _super.call(this, name, attributes) || this;
            _this.namespaces = [];
            if (namespace) {
                _this.namespaces.push(new xmlAttribute_1.XmlAttribute("xmlns", namespace));
            }
            return _this;
        }
        XmlRootNode.prototype.addNamespace = function (namespace, prefix) {
            prefix = prefix ? ":" + prefix : "";
            var namespaceAttr = new xmlAttribute_1.XmlAttribute("xmlns" + prefix, namespace);
            this.namespaces.push(namespaceAttr);
            return namespaceAttr;
        };
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
});
define("xmlElements/base/xmlFile", ["require", "exports", "xmlElements/base/documentationNode"], function (require, exports, documentationNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XmlFile = (function () {
        function XmlFile(rootNode, fileName, filePath) {
            if (rootNode === void 0) { rootNode = null; }
            if (fileName === void 0) { fileName = ""; }
            if (filePath === void 0) { filePath = ""; }
            this.rootNode = rootNode;
            this.fileName = fileName;
            this.filePath = filePath;
            this.documentation = new documentationNode_1.XmlDocumentation();
        }
        XmlFile.prototype.addNode = function (node) {
            if (this.rootNode) {
                this.rootNode.child(node);
            }
            else {
                this.rootNode = node;
            }
            return node;
        };
        XmlFile.prototype.toString = function () {
            var documentation = this.documentation.toString();
            var rootNode = this.rootNode ? this.rootNode.toString() : "";
            return documentation + rootNode;
        };
        XmlFile.prototype.saveFile = function (zipFile) {
            var content = this.toString();
            var path;
            if (this.filePath) {
                path = zipFile.folder(this.filePath);
            }
            (path || zipFile).file(this.fileName, content);
            return zipFile;
        };
        return XmlFile;
    }());
    exports.XmlFile = XmlFile;
});
define("xmlElements/xmlFiles/contentTypes", ["require", "exports", "xmlElements/base/xmlFile", "xmlElements/base/xmlRootNode", "xmlElements/base/xmlNode", "xmlElements/base/xmlAttribute"], function (require, exports, xmlFile_1, xmlRootNode_1, xmlNode_2, xmlAttribute_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.rootNode.child(defaultNode);
            return defaultNode;
        };
        ContentTypes.prototype.addOverride = function (contentType, partName) {
            var overrideNode = new xmlNode_2.XmlNode("Override", [
                new xmlAttribute_2.XmlAttribute("ContentType", contentType),
                new xmlAttribute_2.XmlAttribute("PartName", partName)
            ]);
            this.rootNode.child(overrideNode);
            return overrideNode;
        };
        return ContentTypes;
    }(xmlFile_1.XmlFile));
    exports.ContentTypes = ContentTypes;
});
define("xmlElements/xmlFiles/relationships", ["require", "exports", "xmlElements/base/xmlFile", "xmlElements/base/xmlAttribute", "xmlElements/base/xmlRootNode", "xmlElements/base/xmlNode"], function (require, exports, xmlFile_2, xmlAttribute_3, xmlRootNode_2, xmlNode_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Relationships = (function (_super) {
        __extends(Relationships, _super);
        function Relationships(fileName, filePath) {
            var _this = _super.call(this, new xmlRootNode_2.XmlRootNode("Relationships", "http://schemas.openxmlformats.org/package/2006/relationships"), fileName || ".rels", filePath || "_rels") || this;
            _this.id = 1;
            return _this;
        }
        Relationships.prototype.addRelationship = function (target, type, id) {
            if (!id) {
                id = this.id++;
            }
            var node = new xmlNode_3.XmlNode("Relationship", [
                new xmlAttribute_3.XmlAttribute("Target", target),
                new xmlAttribute_3.XmlAttribute("Type", type),
                new xmlAttribute_3.XmlAttribute("Id", "rId" + id.toString(10))
            ]);
            this.rootNode.child(node);
            return "rId" + id;
        };
        return Relationships;
    }(xmlFile_2.XmlFile));
    exports.Relationships = Relationships;
});
define("xmlElements/xmlFiles/xlsx/row", ["require", "exports", "xmlElements/base/xmlNode", "xmlElements/base/xmlAttribute"], function (require, exports, xmlNode_4, xmlAttribute_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Row = (function (_super) {
        __extends(Row, _super);
        function Row(Index) {
            var _this = _super.call(this, "row", [new xmlAttribute_4.XmlAttribute("r", Index.toString(10))]) || this;
            _this.Index = Index;
            return _this;
        }
        Row.prototype.getCell = function (r) {
            return this.children.find(function (cell) { return cell.name === "cell" && cell.attribute("r").value === r; });
        };
        Row.prototype.addCell = function (r) {
            var cell = this.getCell(r);
            if (!cell) {
                cell = new xmlNode_4.XmlNode("cell", [
                    new xmlAttribute_4.XmlAttribute("r", r),
                    new xmlAttribute_4.XmlAttribute("t", "inlineStr")
                ]);
                this.child(cell);
            }
            return cell;
        };
        return Row;
    }(xmlNode_4.XmlNode));
    exports.Row = Row;
});
define("xmlElements/xmlFiles/xlsx/sheet", ["require", "exports", "xmlElements/base/xmlFile", "xmlElements/base/xmlRootNode", "xmlElements/base/xmlNode", "xmlElements/base/xmlAttribute", "xmlElements/xmlFiles/xlsx/row"], function (require, exports, xmlFile_3, xmlRootNode_3, xmlNode_5, xmlAttribute_5, row_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sheet = (function (_super) {
        __extends(Sheet, _super);
        function Sheet(index, name) {
            var _this = this;
            index = index || 1;
            _this = _super.call(this, new xmlRootNode_3.XmlRootNode("worksheet", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "sheet" + index + ".xml", "workbook/sheets") || this;
            _this.rId = "rId" + index.toString(10);
            _this.id = index;
            _this.name = name || "Sheet" + index.toString(10);
            _this.initializeSheetProperties();
            _this.sheetData = new xmlNode_5.XmlNode("sheetData");
            _this.rootNode.child(_this.sheetData);
            return _this;
        }
        Sheet.prototype.clearSelections = function () {
            this.selections = [];
            this.sheetView.children = [];
            this.sheetView.child(this.pane);
        };
        Sheet.prototype.addSelection = function (activeCell, pane, sqref, paneIsActive) {
            var attributes;
            if (activeCell) {
                attributes = [
                    new xmlAttribute_5.XmlAttribute("sqref", sqref || activeCell || "A1"),
                    new xmlAttribute_5.XmlAttribute("activeCell", activeCell || "A1"),
                    new xmlAttribute_5.XmlAttribute("pane", pane || "bottomRight", paneIsActive || false)
                ];
            }
            else {
                attributes = [
                    new xmlAttribute_5.XmlAttribute("sqref", sqref || activeCell || "A1", false),
                    new xmlAttribute_5.XmlAttribute("activeCell", activeCell || "A1", false),
                    new xmlAttribute_5.XmlAttribute("pane", pane || "bottomRight", paneIsActive || false)
                ];
            }
            var selection = new xmlNode_5.XmlNode("selection", attributes);
            this.selections.push(selection);
            this.sheetView.child(selection);
        };
        Sheet.prototype.addCol = function (min, max, width, bestFit, hidden) {
            var cols = this.rootNode.child("cols");
            if (cols === null) {
                cols = new xmlNode_5.XmlNode("cols");
                for (var index = 0; index < this.rootNode.children.length; index++) {
                    if (this.rootNode.children[index].name === "sheetData") {
                        this.rootNode.children.splice(index, 0, cols);
                        break;
                    }
                }
            }
            var col = new xmlNode_5.XmlNode("col", [
                new xmlAttribute_5.XmlAttribute("min", min.toString(10)),
                new xmlAttribute_5.XmlAttribute("max", max.toString(10))
            ]);
            if (width) {
                col.attribute(new xmlAttribute_5.XmlAttribute("width", width.toString(10)));
                col.attribute(new xmlAttribute_5.XmlAttribute("customWidth", "1"));
            }
            if (bestFit) {
                col.attribute(new xmlAttribute_5.XmlAttribute("bestFit", "1"));
            }
            if (hidden) {
                col.attribute(new xmlAttribute_5.XmlAttribute("collapsed", "1"));
                col.attribute(new xmlAttribute_5.XmlAttribute("hidden", "1"));
            }
            cols.child(col);
            return col;
        };
        Sheet.prototype.mergeCells = function (cellRange) {
            var mergeCells = this.rootNode.child("mergeCells");
            if (mergeCells === null) {
                mergeCells = new xmlNode_5.XmlNode("mergeCells", [new xmlAttribute_5.XmlAttribute("count", "0")]);
                for (var index = 0; index < this.rootNode.children.length; index++) {
                    if (this.rootNode.children[index].name === "sheetData") {
                        this.rootNode.children.splice(index + 1, 0, mergeCells);
                        break;
                    }
                }
            }
            var mergeCell = new xmlNode_5.XmlNode("mergeCell", [
                new xmlAttribute_5.XmlAttribute("ref", cellRange)
            ]);
            mergeCells.child(mergeCell);
            mergeCells.attribute("count").value = mergeCells.children.length.toString(10);
        };
        Sheet.prototype.getRow = function (index) {
            var sheetRow;
            this.sheetData.children.forEach(function (r) {
                var rno = r.Index;
                if (rno > index) {
                    return;
                }
                else if (rno === index) {
                    sheetRow = r;
                    return;
                }
            });
            return sheetRow;
        };
        Sheet.prototype.addRow = function (index) {
            var position = 0, sheetRow;
            this.sheetData.children.forEach(function (r) {
                var rno = r.Index;
                if (rno > index) {
                    return;
                }
                else if (rno === index) {
                    sheetRow = r;
                    return;
                }
                position++;
            });
            if (!sheetRow) {
                sheetRow = new row_1.Row(index);
                this.sheetData.children.splice(position, 0, sheetRow);
            }
            return sheetRow;
        };
        Sheet.prototype.initializeSheetProperties = function () {
            var sheetViews = new xmlNode_5.XmlNode("sheetViews");
            this.sheetView = new xmlNode_5.XmlNode("sheetView");
            this.tabSelected = new xmlAttribute_5.XmlAttribute("");
            this.sheetView.attribute(this.tabSelected);
            this.sheetView.attribute(new xmlAttribute_5.XmlAttribute("workbookViewId", "0"));
            sheetViews.child(this.sheetView);
            this.pane = new xmlNode_5.XmlNode("pane", [
                new xmlAttribute_5.XmlAttribute("state", "frozen"),
                new xmlAttribute_5.XmlAttribute("activePane", "topRight"),
                new xmlAttribute_5.XmlAttribute("topLeftCell", "A1"),
                new xmlAttribute_5.XmlAttribute("ySplit", "1"),
                new xmlAttribute_5.XmlAttribute("xSplit", "1")
            ]);
            this.pane.name = "";
            this.sheetView.child(this.pane);
            this.selections = [
                new xmlNode_5.XmlNode("selection", [
                    new xmlAttribute_5.XmlAttribute("sqref", "A1"),
                    new xmlAttribute_5.XmlAttribute("activeCell", "A1"),
                    new xmlAttribute_5.XmlAttribute("pane", "bottomRight", false)
                ])
            ];
            this.sheetView.child(this.selections[0]);
            this.rootNode.child(sheetViews);
        };
        return Sheet;
    }(xmlFile_3.XmlFile));
    exports.Sheet = Sheet;
});
define("xmlElements/xmlFiles/xlsx/workbook", ["require", "exports", "xmlElements/base/xmlFile", "xmlElements/base/xmlRootNode", "xmlElements/base/xmlNode", "xmlElements/xmlFiles/xlsx/sheet", "xmlElements/base/xmlAttribute"], function (require, exports, xmlFile_4, xmlRootNode_4, xmlNode_6, sheet_1, xmlAttribute_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Workbook = (function (_super) {
        __extends(Workbook, _super);
        function Workbook() {
            var _this = _super.call(this, new xmlRootNode_4.XmlRootNode("workbook", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "workbook.xml", "workbook") || this;
            _this.rootNode.addNamespace("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "r");
            _this.initializeView();
            _this.sheets = new xmlNode_6.XmlNode("sheets");
            _this.rootNode.child(_this.sheets);
            _this.totalSheet = 0;
            return _this;
        }
        Workbook.prototype.addSheet = function (sheet) {
            this.sheets.child(new xmlNode_6.XmlNode("sheet", [
                new xmlAttribute_6.XmlAttribute("r:id", sheet.rId),
                new xmlAttribute_6.XmlAttribute("sheetId", sheet.id.toString(10)),
                new xmlAttribute_6.XmlAttribute("name", sheet.name)
            ]));
            this.totalSheet++;
        };
        Workbook.prototype.createSheet = function (sheetName) {
            var sheet = new sheet_1.Sheet(this.sheets.children.length, sheetName);
            this.addSheet(sheet);
            return sheet;
        };
        Workbook.prototype.initializeView = function () {
            this.bookViews = new xmlNode_6.XmlNode("bookViews");
            this.activeTab = new xmlAttribute_6.XmlAttribute("activeTab", "0");
            this.bookViews.child(new xmlNode_6.XmlNode("workbookView", [this.activeTab]));
            this.rootNode.child(this.bookViews);
        };
        return Workbook;
    }(xmlFile_4.XmlFile));
    exports.Workbook = Workbook;
});
define("shared/fileHandler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("shared/util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Util = (function () {
        function Util() {
        }
        Util.isCellString = function (value) {
            var isValid = /^[A-Z]{1,3}[1-9]\d{0,6}$/.test(value);
            if (isValid) {
                var _a = this.getCellColumnRow(value), column = _a.column, row = _a.row, columnNumber = _a.columnNumber;
                isValid =
                    this.isValidColumnNumber(columnNumber) && this.isValidRowNumber(row);
            }
            return isValid;
        };
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
        Util.toColumnString = function (value) {
            return String.fromCharCode(64 + value);
        };
        Util.isValidRowNumber = function (value) {
            return value && value > 0 && value <= 1048576;
        };
        Util.isValidColumnNumber = function (value) {
            return value && value > 0 && value <= 16384;
        };
        return Util;
    }());
    exports.Util = Util;
});
define("utility/excel/cellUtility", ["require", "exports", "xmlElements/base/xmlNode"], function (require, exports, xmlNode_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Cell = (function () {
        function Cell(sheet, cellUtility, value, _type, _index, _row, _column, formula) {
            if (value === void 0) { value = ""; }
            if (_type === void 0) { _type = "string"; }
            if (_index === void 0) { _index = "A1"; }
            if (_row === void 0) { _row = 1; }
            if (_column === void 0) { _column = "A"; }
            this.value = value;
            this._type = _type;
            this._index = _index;
            this._row = _row;
            this._column = _column;
            this.formula = formula;
            this.sheet = sheet;
            this.cellUtility = cellUtility;
        }
        Object.defineProperty(Cell.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "index", {
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "row", {
            get: function () {
                return this._row;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "column", {
            get: function () {
                return this._column;
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.style = function (options) { };
        Cell.prototype.set = function (value, options) { };
        Cell.prototype.toJSON = function () {
            return {
                value: this.value
            };
        };
        return Cell;
    }());
    exports.Cell = Cell;
    var CellUtility = (function () {
        function CellUtility(sheet) {
            this.sheet = sheet;
        }
        CellUtility.prototype.getCell = function (rn, index, cs) {
            var row = this.sheet.getRow(rn);
            if (!row) {
                return new Cell(this.sheet, this, undefined, undefined, index, rn, cs);
            }
            var cell = row.getCell(index);
            if (!cell) {
                return new Cell(this.sheet, this, undefined, undefined, index, rn, cs);
            }
            var _a = this.getCellDetails(cell), value = _a.value, type = _a.type;
            return new Cell(this.sheet, this, value, type, index, rn, cs);
        };
        CellUtility.prototype.addCell = function (rn, index, cs, value, type, formula) {
            if (value === void 0) { value = ""; }
            if (type === void 0) { type = "string"; }
            var row = this.sheet.addRow(rn);
            var cell = row.addCell(index);
            var v = new xmlNode_7.XmlNode("v");
            v.value = value;
            cell.children.length = 0;
            switch (type) {
                case "string":
                    cell.attribute("t").value = "inlineStr";
                    v.name = "t";
                    cell.child(new xmlNode_7.XmlNode("is").child(v));
                    break;
                case "numeric":
                    cell.attribute("t").value = "";
                    cell.child(v);
                    break;
                case "sharedString":
                    cell.attribute("t").value = "s";
                    cell.child(v);
                    break;
                case "formula":
                    cell.attribute("t").value = "";
                    var f = new xmlNode_7.XmlNode("f");
                    f.value = formula;
                    cell.child(f);
                    break;
                case "sharedFormula":
                    cell.attribute("t").value = "";
                    break;
            }
            return this.getCell(rn, index, cs);
        };
        CellUtility.prototype.getCellDetails = function (cell) {
            var type = cell.attribute("t").value;
            switch (type) {
                case "inlineStr":
                    return {
                        value: cell.child("is").child("t").value,
                        type: "string"
                    };
                    break;
                case "":
                    return {
                        value: cell.child("v").value,
                        type: "numeric"
                    };
                    break;
            }
        };
        return CellUtility;
    }());
    exports.CellUtility = CellUtility;
});
define("utility/excel/sheetUtility", ["require", "exports", "xmlElements/xmlFiles/xlsx/sheet", "shared/util", "utility/excel/cellUtility"], function (require, exports, sheet_2, util_1, cellUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SheetUtility = (function () {
        function SheetUtility(workbook, eventBus, name) {
            this.eventBus = eventBus;
            this.sheet = new sheet_2.Sheet(workbook.totalSheet + 1, name);
            this.triggerInitialize();
            this.bindListeners();
            workbook.addSheet(this.sheet);
            if (this.sheet.id === 1) {
                this.active();
            }
            this.cellUtility = new cellUtility_1.CellUtility(this.sheet);
        }
        Object.defineProperty(SheetUtility.prototype, "isActive", {
            get: function () {
                return this._isActive;
            },
            set: function (value) {
                if (value) {
                    this.active();
                }
                else {
                    throw "Can not have a workbook without any active sheet.";
                }
            },
            enumerable: true,
            configurable: true
        });
        SheetUtility.prototype.active = function () {
            this.eventBus.trigger("activateTab", this.sheet.id - 1);
            this._isActive = true;
            this.sheet.tabSelected.value = "1";
            this.sheet.tabSelected.state = true;
            return this;
        };
        SheetUtility.prototype.selectCell = function (cell, cellRange) {
            if (cell) {
                if (util_1.Util.isCellString(cell)) {
                    if (this.sheet.selections.length === 1) {
                        this.sheet.selections[0].attribute("activeCell").value = cell;
                        this.sheet.selections[0].attribute("sqref").value = cell;
                    }
                    else {
                        var topLeft = this.sheet.pane.attribute("topLeftCell").value;
                        var panelDetails = util_1.Util.getCellColumnRow(topLeft);
                        var cellDetails = util_1.Util.getCellColumnRow(cell);
                        var activePane_1 = "bottomRight";
                        if (cellDetails.row >= panelDetails.row) {
                            if (cellDetails.columnNumber < panelDetails.columnNumber) {
                                activePane_1 = "bottomLeft";
                            }
                        }
                        else {
                            activePane_1 = "topRight";
                            if (cellDetails.columnNumber < panelDetails.columnNumber) {
                                activePane_1 = "bottomRight";
                            }
                        }
                        this.sheet.selections.forEach(function (selection) {
                            if (selection.attribute("pane").value === "bottomRight" ||
                                selection.attribute("pane").value === activePane_1) {
                                selection.attribute("activeCell").value = cell;
                                selection.attribute("sqref").value = cell;
                            }
                        });
                    }
                }
                else {
                    throw "Invalid cell value. The possible values for cell are defined by the ST_CellRef.";
                }
            }
            if (cellRange) {
                this.selectCells(cellRange);
            }
            if (this.sheet.selections.length === 1) {
                return this.sheet.selections[0].attribute("activeCell").value;
            }
        };
        SheetUtility.prototype.selectCells = function (cellRange) {
            if (cellRange) {
                if (this.sheet.selections.length === 1) {
                    if (util_1.Util.isCellRangeString(cellRange)) {
                        this.sheet.selections[0].attribute("sqref").value = cellRange;
                    }
                    else if (util_1.Util.isCellString(cellRange)) {
                        this.sheet.selections[0].attribute("sqref").value = cellRange;
                    }
                    else {
                        throw "Invalid cell range value. The possible values for this are defined by the ST_Sqref.";
                    }
                }
                else {
                    this.sheet.selections.forEach(function (selection) {
                        if (selection.attribute("pane").value === "bottomRight") {
                            if (util_1.Util.isCellRangeString(cellRange)) {
                                selection.attribute("sqref").value = cellRange;
                            }
                            else if (util_1.Util.isCellString(cellRange)) {
                                selection.attribute("sqref").value = cellRange;
                            }
                        }
                    });
                }
            }
            return this.sheet.selections[0].attribute("sqref").value;
        };
        SheetUtility.prototype.freezePane = function (rows, columns) {
            if (!rows && !columns) {
                this.sheet.pane.name = "";
            }
            else {
                var topLeftCell = util_1.Util.toColumnString((columns || 0) + 1) + ((rows || 0) + 1);
                var activePane = "bottomRight";
                var _a = util_1.Util.getCellColumnRow(this.selectCell()), column = _a.column, row = _a.row, columnNumber = _a.columnNumber;
                var numberOfPanes = this.calculateNumberOfPanes(rows, columns);
                this.sheet.clearSelections();
                if (numberOfPanes === 0) {
                    this.sheet.pane.name = "";
                    this.sheet.addSelection(column + row);
                    return this;
                }
                if (row >= (rows || 0) + 1) {
                    if (columnNumber < (columns || 0) + 1) {
                        activePane = "bottomLeft";
                    }
                }
                else {
                    activePane = "topRight";
                    if (columnNumber < (columns || 0) + 1) {
                        activePane = "bottomRight";
                    }
                }
                this.sheet.pane.name = "pane";
                this.sheet.pane.attribute("activePane").value = activePane;
                this.sheet.pane.attribute("topLeftCell").value = topLeftCell;
                if (columns && columns > 1) {
                    this.sheet.pane.attribute("xSplit").value = rows.toString();
                }
                else {
                    this.sheet.pane.attribute("xSplit").state = false;
                }
                if (rows && rows > 1) {
                    this.sheet.pane.attribute("ySplit").value = columns.toString();
                }
                else {
                    this.sheet.pane.attribute("ySplit").state = false;
                }
                if (numberOfPanes === 2) {
                    this.sheet.addSelection(column + row, activePane, null, true);
                }
                else {
                    var rowString = activePane !== "topRight" ? null : column + row;
                    this.sheet.addSelection(rowString, "topRight", null, true);
                    rowString = activePane !== "bottomLeft" ? null : column + row;
                    this.sheet.addSelection(rowString, "bottomLeft", null, true);
                    rowString = column + row;
                    this.sheet.addSelection(rowString, "bottomRight", null, true);
                }
            }
            return this;
        };
        SheetUtility.prototype.column = function (options) {
            this.sheet.addCol(options.from, options.to || options.from, options.width, options.bestFit, options.hidden);
            return this;
        };
        SheetUtility.prototype.merge = function (cellRange) {
            if (util_1.Util.isCellRangeString(cellRange)) {
                this.sheet.mergeCells(cellRange);
                return this;
            }
            else {
                throw "Invalid Cell Range string. The possible values for this are defined by the ST_Sqref.";
            }
        };
        SheetUtility.prototype.cell = function (row, column, options) {
            if (!util_1.Util.isValidRowNumber(row) || !util_1.Util.isValidColumnNumber(column)) {
                throw "Row and Column should be valid.";
            }
            if (typeof options === "number") {
                options = { value: options.toString(10) };
            }
            else if (typeof options === "string" && options) {
                options = { value: options };
            }
            if (!options || options !== "" || options !== 0) {
                var cs = util_1.Util.toColumnString(column);
                return this.cellUtility.getCell(row, cs + row.toString(10), cs);
            }
        };
        SheetUtility.prototype.triggerInitialize = function () {
            this.eventBus.trigger("addFile", this.sheet);
            this.eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", "/" + this.sheet.filePath + "/" + this.sheet.fileName);
            this.eventBus.trigger("addWorkbookRelation", "sheets/" + this.sheet.fileName, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", this.sheet.id);
        };
        SheetUtility.prototype.bindListeners = function () {
            var _this = this;
            this.eventBus.startListening("activateTab", function (tabNumber) {
                if (tabNumber != _this.sheet.id - 1) {
                    _this._isActive = false;
                    _this.sheet.tabSelected.value = "";
                    _this.sheet.tabSelected.state = false;
                }
            });
        };
        SheetUtility.prototype.calculateNumberOfPanes = function (rows, columns) {
            if (rows < 1 && columns < 1) {
                return 0;
            }
            else if (rows < 1 || columns < 1) {
                return 2;
            }
            else
                return 4;
        };
        return SheetUtility;
    }());
    exports.SheetUtility = SheetUtility;
});
define("utility/excel/workbookUtility", ["require", "exports", "xmlElements/xmlFiles/xlsx/workbook", "xmlElements/xmlFiles/relationships", "utility/excel/sheetUtility"], function (require, exports, workbook_1, relationships_1, sheetUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkbookUtility = (function () {
        function WorkbookUtility(eventBus) {
            this.eventBus = eventBus;
            this.workbook = new workbook_1.Workbook();
            this.eventBus.trigger("addFile", this.workbook);
            this.relations = new relationships_1.Relationships("workbook.xml.rels", "workbook/_rels");
            this.eventBus.trigger("addFile", this.relations);
            this.bindListeners();
        }
        WorkbookUtility.prototype.sheet = function (name) {
            var sheetUtility = new sheetUtility_1.SheetUtility(this.workbook, this.eventBus, name);
            return sheetUtility;
        };
        WorkbookUtility.prototype.bindListeners = function () {
            var _this = this;
            this.eventBus.startListening("addWorkbookRelation", function (target, type, id) {
                _this.relations.addRelationship(target, type, id);
            });
            this.eventBus.startListening("activateTab", function (tabNumber) {
                _this.workbook.activeTab.value = tabNumber.toString(10);
            });
        };
        return WorkbookUtility;
    }());
    exports.WorkbookUtility = WorkbookUtility;
});
define("utility/excel/xlsx", ["require", "exports", "xmlElements/xmlFiles/contentTypes", "xmlElements/xmlFiles/relationships", "shared/fileHandler", "shared/eventBus", "utility/excel/workbookUtility"], function (require, exports, contentTypes_1, relationships_2, fileHandler_1, eventBus_1, workbookUtility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Xlsx = (function () {
        function Xlsx(fileName) {
            this.files = [];
            this.initContentTypes();
            this.initRels();
            this.fileName = (fileName && fileName.trim()) || "Document.xlsx";
            this.fileHandler = new fileHandler_1.FileHandler();
            this.eventBus = new eventBus_1.EventBus();
            this.bindListeners();
            this.workbookUtility = new workbookUtility_1.WorkbookUtility(this.eventBus);
        }
        Xlsx.prototype.download = function (fileName, callback) {
            fileName = (fileName && fileName.trim()) || this.fileName;
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.joi = {
        xlsx: xlsx_1.Xlsx
    };
});
