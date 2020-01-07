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
//# sourceMappingURL=documentationNode.js.map