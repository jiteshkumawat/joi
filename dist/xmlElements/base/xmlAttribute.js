"use strict";
exports.__esModule = true;
/**
 * Define a new attribute of an xml node
 */
var XmlAttribute = /** @class */ (function () {
    /**
     * Creates new instance of Attribute
     * @param Name - The Name of Attribute
     * @param Value - The Value of Attribute
     * @param state - The state of attribute
     */
    function XmlAttribute(name, value, state) {
        this.Name = name;
        this.Value = value || "";
        this.State = state !== false;
    }
    /**
     * Get string representation of an attribute
     * @returns - String representation (Name="Value")
     */
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