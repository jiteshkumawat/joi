"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define a new documentation node of an xml file
 */
var XmlDocumentation = /** @class */ (function () {
    /**
     * Creates new instance of Documentation Node
     * @param {string} version - The version of xml
     * @param {string} encoding - The encoding of xml
     * @param {boolean} standalone - Determine xml is standalone or not
     */
    function XmlDocumentation(version, encoding, standalone) {
        if (version === void 0) { version = "1.0"; }
        if (encoding === void 0) { encoding = "UTF-8"; }
        if (standalone === void 0) { standalone = true; }
        this.version = version;
        this.encoding = encoding;
        this.standalone = standalone;
    }
    /**
     * Get string representation of a documentation
     * @returns {string} - String representation (<?xml Attributes?>)
     */
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
//# sourceMappingURL=documentationNode.js.map