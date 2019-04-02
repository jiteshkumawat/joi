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
//# sourceMappingURL=xmlAttribute.js.map