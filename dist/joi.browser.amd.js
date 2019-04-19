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
        function XmlAttribute(name, value, state) {
            this.Name = name;
            this.Value = value || "";
            this.State = state !== false;
        }
        XmlAttribute.prototype.toString = function () {
            if (this.Name && this.State) {
                return this.Name + '="' + this.Value + '"';
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
    exports.__esModule = true;
    var XmlNode = (function () {
        function XmlNode(name, attributes) {
            this.Name = name;
            this.Attributes = attributes || [];
            this.Children = [];
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
        XmlNode.prototype.addChild = function (node) {
            this.Children.push(node);
            return node;
        };
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
});
define("xmlElements/base/xmlFile", ["require", "exports", "xmlElements/base/documentationNode"], function (require, exports, documentationNode_1) {
    "use strict";
    exports.__esModule = true;
    var XmlFile = (function () {
        function XmlFile(rootNode, fileName, filePath) {
            this.Documentation = new documentationNode_1.XmlDocumentation();
            this.RootNode = rootNode || null;
            this.FileName = fileName || "";
            this.FilePath = filePath || "";
        }
        XmlFile.prototype.addNode = function (node) {
            if (this.RootNode) {
                this.RootNode.child(node);
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
            this.RootNode.child(defaultNode);
            return defaultNode;
        };
        ContentTypes.prototype.addOverride = function (contentType, partName) {
            var overrideNode = new xmlNode_2.XmlNode("Override", [
                new xmlAttribute_2.XmlAttribute("ContentType", contentType),
                new xmlAttribute_2.XmlAttribute("PartName", partName)
            ]);
            this.RootNode.child(overrideNode);
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
            this.RootNode.child(node);
            return "rId" + id;
        };
        return Relationships;
    }(xmlFile_2.XmlFile));
    exports.Relationships = Relationships;
});
define("xmlElements/xmlFiles/xlsx/sheet", ["require", "exports", "xmlElements/base/xmlFile", "xmlElements/base/xmlRootNode", "xmlElements/base/xmlNode", "xmlElements/base/xmlAttribute"], function (require, exports, xmlFile_3, xmlRootNode_3, xmlNode_4, xmlAttribute_4) {
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
            _this.initializeSheetProperties();
            _this.sheetData = new xmlNode_4.XmlNode("sheetData");
            _this.RootNode.child(_this.sheetData);
            return _this;
        }
        Sheet.prototype.clearSelections = function () {
            this.Selections = [];
            this.sheetView.Children = [];
            this.sheetView.child(this.Pane);
        };
        Sheet.prototype.addSelection = function (activeCell, pane, sqref, paneIsActive) {
            var attributes;
            if (activeCell) {
                attributes = [
                    new xmlAttribute_4.XmlAttribute("sqref", sqref || activeCell || "A1"),
                    new xmlAttribute_4.XmlAttribute("activeCell", activeCell || "A1"),
                    new xmlAttribute_4.XmlAttribute("pane", pane || "bottomRight", paneIsActive || false)
                ];
            }
            else {
                attributes = [
                    new xmlAttribute_4.XmlAttribute("sqref", sqref || activeCell || "A1", false),
                    new xmlAttribute_4.XmlAttribute("activeCell", activeCell || "A1", false),
                    new xmlAttribute_4.XmlAttribute("pane", pane || "bottomRight", paneIsActive || false)
                ];
            }
            var selection = new xmlNode_4.XmlNode("selection", attributes);
            this.Selections.push(selection);
            this.sheetView.child(selection);
        };
        Sheet.prototype.addCol = function (min, max, width, bestFit, hidden) {
            var cols = this.RootNode.child("cols");
            if (cols === null) {
                cols = new xmlNode_4.XmlNode("cols");
                for (var index = 0; index < this.RootNode.Children.length; index++) {
                    if (this.RootNode.Children[index].Name === "sheetData") {
                        this.RootNode.Children.splice(index, 0, cols);
                        break;
                    }
                }
            }
            var col = new xmlNode_4.XmlNode("col", [
                new xmlAttribute_4.XmlAttribute("min", min.toString(10)),
                new xmlAttribute_4.XmlAttribute("max", max.toString(10))
            ]);
            if (width) {
                col.attribute(new xmlAttribute_4.XmlAttribute("width", width.toString(10)));
                col.attribute(new xmlAttribute_4.XmlAttribute("customWidth", "1"));
            }
            if (bestFit) {
                col.attribute(new xmlAttribute_4.XmlAttribute("bestFit", "1"));
            }
            if (hidden) {
                col.attribute(new xmlAttribute_4.XmlAttribute("collapsed", "1"));
                col.attribute(new xmlAttribute_4.XmlAttribute("hidden", "1"));
            }
            cols.child(col);
            return col;
        };
        Sheet.prototype.mergeCells = function (cellRange) {
            var mergeCells = this.RootNode.child("mergeCells");
            if (mergeCells === null) {
                mergeCells = new xmlNode_4.XmlNode("mergeCells", [new xmlAttribute_4.XmlAttribute("count", "0")]);
                for (var index = 0; index < this.RootNode.Children.length; index++) {
                    if (this.RootNode.Children[index].Name === "sheetData") {
                        this.RootNode.Children.splice(index + 1, 0, mergeCells);
                        break;
                    }
                }
            }
            var mergeCell = new xmlNode_4.XmlNode("mergeCell", [
                new xmlAttribute_4.XmlAttribute("ref", cellRange)
            ]);
            mergeCells.child(mergeCell);
            mergeCells.attribute("count").Value = mergeCells.Children.length.toString(10);
        };
        Sheet.prototype.initializeSheetProperties = function () {
            var sheetViews = new xmlNode_4.XmlNode("sheetViews");
            this.sheetView = new xmlNode_4.XmlNode("sheetView");
            this.TabSelected = new xmlAttribute_4.XmlAttribute("");
            this.sheetView.attribute(this.TabSelected);
            this.sheetView.attribute(new xmlAttribute_4.XmlAttribute("workbookViewId", "0"));
            sheetViews.child(this.sheetView);
            this.Pane = new xmlNode_4.XmlNode("pane", [
                new xmlAttribute_4.XmlAttribute("state", "frozen"),
                new xmlAttribute_4.XmlAttribute("activePane", "topRight"),
                new xmlAttribute_4.XmlAttribute("topLeftCell", "A1"),
                new xmlAttribute_4.XmlAttribute("ySplit", "1"),
                new xmlAttribute_4.XmlAttribute("xSplit", "1")
            ]);
            this.Pane.Name = "";
            this.sheetView.child(this.Pane);
            this.Selections = [
                new xmlNode_4.XmlNode("selection", [
                    new xmlAttribute_4.XmlAttribute("sqref", "A1"),
                    new xmlAttribute_4.XmlAttribute("activeCell", "A1"),
                    new xmlAttribute_4.XmlAttribute("pane", "bottomRight", false)
                ])
            ];
            this.sheetView.child(this.Selections[0]);
            this.RootNode.child(sheetViews);
        };
        return Sheet;
    }(xmlFile_3.XmlFile));
    exports.Sheet = Sheet;
});
define("xmlElements/xmlFiles/xlsx/sheetData", ["require", "exports", "xmlElements/base/xmlNode"], function (require, exports, xmlNode_5) {
    "use strict";
    exports.__esModule = true;
    var SheetData = (function (_super) {
        __extends(SheetData, _super);
        function SheetData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SheetData;
    }(xmlNode_5.XmlNode));
    exports.SheetData = SheetData;
});
define("xmlElements/xmlFiles/xlsx/workbook", ["require", "exports", "xmlElements/base/xmlFile", "xmlElements/base/xmlRootNode", "xmlElements/base/xmlNode", "xmlElements/xmlFiles/xlsx/sheet", "xmlElements/base/xmlAttribute"], function (require, exports, xmlFile_4, xmlRootNode_4, xmlNode_6, sheet_1, xmlAttribute_5) {
    "use strict";
    exports.__esModule = true;
    var Workbook = (function (_super) {
        __extends(Workbook, _super);
        function Workbook() {
            var _this = _super.call(this, new xmlRootNode_4.XmlRootNode("workbook", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "workbook.xml", "workbook") || this;
            _this.RootNode.addNamespace("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "r");
            _this.initializeView();
            _this.sheets = new xmlNode_6.XmlNode("sheets");
            _this.RootNode.child(_this.sheets);
            _this.TotalSheet = 0;
            return _this;
        }
        Workbook.prototype.addSheet = function (sheet) {
            this.sheets.child(new xmlNode_6.XmlNode("sheet", [
                new xmlAttribute_5.XmlAttribute("r:id", sheet.RId),
                new xmlAttribute_5.XmlAttribute("sheetId", sheet.Id.toString(10)),
                new xmlAttribute_5.XmlAttribute("name", sheet.Name)
            ]));
            this.TotalSheet++;
        };
        Workbook.prototype.createSheet = function (sheetName) {
            var sheet = new sheet_1.Sheet(this.sheets.Children.length, sheetName);
            this.addSheet(sheet);
            return sheet;
        };
        Workbook.prototype.initializeView = function () {
            this.bookViews = new xmlNode_6.XmlNode("bookViews");
            this.ActiveTab = new xmlAttribute_5.XmlAttribute("activeTab", "0");
            this.bookViews.child(new xmlNode_6.XmlNode("workbookView", [this.ActiveTab]));
            this.RootNode.child(this.bookViews);
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
define("shared/util", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Util = (function () {
        function Util() {
        }
        Util.isCellString = function (value) {
            var isValid = /^[A-Z]{1,3}[1-9]\d{0,6}$/.test(value);
            if (isValid) {
                var _a = this.getCellColumnRow(value), column = _a.column, row = _a.row, columnNumber = _a.columnNumber;
                isValid = columnNumber <= 16384 && row <= 1048576;
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
        return Util;
    }());
    exports.Util = Util;
});
define("utility/excel/sheetUtility", ["require", "exports", "xmlElements/xmlFiles/xlsx/sheet", "shared/util"], function (require, exports, sheet_2, util_1) {
    "use strict";
    exports.__esModule = true;
    var SheetUtility = (function () {
        function SheetUtility(workbook, eventBus, name) {
            this.eventBus = eventBus;
            this.sheet = new sheet_2.Sheet(workbook.TotalSheet + 1, name);
            this.triggerInitialize();
            this.bindListeners();
            workbook.addSheet(this.sheet);
            if (this.sheet.Id === 1) {
                this.active();
            }
        }
        SheetUtility.prototype.active = function () {
            this.eventBus.trigger("activateTab", this.sheet.Id - 1);
            this.IsActive = true;
            this.sheet.TabSelected.Value = "1";
            this.sheet.TabSelected.State = true;
            return this;
        };
        SheetUtility.prototype.selectCell = function (cell, cellRange) {
            if (cell) {
                if (util_1.Util.isCellString(cell)) {
                    if (this.sheet.Selections.length === 1) {
                        this.sheet.Selections[0].attribute("activeCell").Value = cell;
                        this.sheet.Selections[0].attribute("sqref").Value = cell;
                    }
                    else {
                        var topLeft = this.sheet.Pane.attribute("topLeftCell").Value;
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
                        this.sheet.Selections.forEach(function (selection) {
                            if (selection.attribute("pane").Value === "bottomRight" ||
                                selection.attribute("pane").Value === activePane_1) {
                                selection.attribute("activeCell").Value = cell;
                                selection.attribute("sqref").Value = cell;
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
            if (this.sheet.Selections.length === 1) {
                return this.sheet.Selections[0].attribute("activeCell").Value;
            }
        };
        SheetUtility.prototype.selectCells = function (cellRange) {
            if (cellRange) {
                if (this.sheet.Selections.length === 1) {
                    if (util_1.Util.isCellRangeString(cellRange)) {
                        this.sheet.Selections[0].attribute("sqref").Value = cellRange;
                    }
                    else if (util_1.Util.isCellString(cellRange)) {
                        this.sheet.Selections[0].attribute("sqref").Value = cellRange;
                    }
                    else {
                        throw "Invalid cell range value. The possible values for this are defined by the ST_Sqref.";
                    }
                }
                else {
                    this.sheet.Selections.forEach(function (selection) {
                        if (selection.attribute("pane").Value === "bottomRight") {
                            if (util_1.Util.isCellRangeString(cellRange)) {
                                selection.attribute("sqref").Value = cellRange;
                            }
                            else if (util_1.Util.isCellString(cellRange)) {
                                selection.attribute("sqref").Value = cellRange;
                            }
                        }
                    });
                }
            }
            return this.sheet.Selections[0].attribute("sqref").Value;
        };
        SheetUtility.prototype.freezePane = function (rows, columns) {
            if (!rows && !columns) {
                this.sheet.Pane.Name = "";
            }
            else {
                var topLeftCell = util_1.Util.toColumnString((columns || 0) + 1) + ((rows || 0) + 1);
                var activePane = "bottomRight";
                var _a = util_1.Util.getCellColumnRow(this.selectCell()), column = _a.column, row = _a.row, columnNumber = _a.columnNumber;
                var numberOfPanes = this.calculateNumberOfPanes(rows, columns);
                this.sheet.clearSelections();
                if (numberOfPanes === 0) {
                    this.sheet.Pane.Name = "";
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
                this.sheet.Pane.Name = "pane";
                this.sheet.Pane.attribute("activePane").Value = activePane;
                this.sheet.Pane.attribute("topLeftCell").Value = topLeftCell;
                if (columns && columns > 1) {
                    this.sheet.Pane.attribute("xSplit").Value = rows.toString();
                }
                else {
                    this.sheet.Pane.attribute("xSplit").State = false;
                }
                if (rows && rows > 1) {
                    this.sheet.Pane.attribute("ySplit").Value = columns.toString();
                }
                else {
                    this.sheet.Pane.attribute("ySplit").State = false;
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
        SheetUtility.prototype.triggerInitialize = function () {
            this.eventBus.trigger("addFile", this.sheet);
            this.eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", "/" + this.sheet.FilePath + "/" + this.sheet.FileName);
            this.eventBus.trigger("addWorkbookRelation", "sheets/" + this.sheet.FileName, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", this.sheet.Id);
        };
        SheetUtility.prototype.bindListeners = function () {
            var _this = this;
            this.eventBus.startListening("activateTab", function (tabNumber) {
                if (tabNumber != _this.sheet.Id - 1) {
                    _this.IsActive = false;
                    _this.sheet.TabSelected.Value = "";
                    _this.sheet.TabSelected.State = false;
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
    exports.__esModule = true;
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
                _this.workbook.ActiveTab.Value = tabNumber.toString(10);
            });
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
