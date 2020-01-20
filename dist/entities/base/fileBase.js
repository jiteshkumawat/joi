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
var xml_1 = require("./xml");
var node_1 = require("./node");
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
        if (node === this.RootChildNodes[0] || this.rootNode.children.length === 0) {
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
//# sourceMappingURL=fileBase.js.map