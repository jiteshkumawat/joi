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
//# sourceMappingURL=documentationNode.js.map