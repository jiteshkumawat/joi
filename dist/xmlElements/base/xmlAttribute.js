"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define a new attribute of an xml node
 */
var XmlAttribute = /** @class */ (function () {
    /**
     * Creates new instance of Attribute
     * @param {string} name - The Name of Attribute
     * @param {string} value - The Value of Attribute
     * @param {boolean} state - The state of attribute
     */
    function XmlAttribute(name, value, state) {
        if (value === void 0) { value = ""; }
        if (state === void 0) { state = true; }
        this.name = name;
        this.value = value;
        this.state = state;
    }
    /**
     * Get string representation of an attribute
     * @returns {string} - String representation (Name="Value")
     */
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
//# sourceMappingURL=xmlAttribute.js.map