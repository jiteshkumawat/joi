"use strict";
exports.__esModule = true;
/**
 * Define a new documentation node of an xml file
 */
var XmlDocumentation = /** @class */ (function () {
    /**
     * Creates new instance of Documentation Node
     * @param version - The version of xml
     * @param encoding - The encoding of xml
     * @param standalone - Determine xml is standalone or not
     */
    function XmlDocumentation(version, encoding, standalone) {
        this.Version = version || "1.0";
        this.Encoding = encoding || "UTF-8";
        this.Standalone = standalone === false ? false : true;
    }
    /**
     * Get string representation of a documentation
     * @returns - String representation (<?xml Attributes?>)
     */
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
//# sourceMappingURL=documentationNode.js.map