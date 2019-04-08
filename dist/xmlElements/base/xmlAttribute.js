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
//# sourceMappingURL=xmlAttribute.js.map