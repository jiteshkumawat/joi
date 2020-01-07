"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Xml Attribute
 */
var Attribute = /** @class */ (function () {
    /**
     * Creates new instance of an xml attribute
     * @param {string} name - The name of attribute
     * @param {string} value - The value of attribute
     * @param {boolean} state - The state of attribute
     */
    function Attribute(name, value, isActive, namespace) {
        if (value === void 0) { value = ""; }
        if (isActive === void 0) { isActive = true; }
        if (namespace === void 0) { namespace = ""; }
        this.name = name;
        this.value = value;
        this.isActive = isActive;
        this.namespace = namespace;
    }
    /**
     * Gets string for attribute
     * @returns {string} - Attribute string (Name="Value")
     */
    Attribute.prototype.toString = function () {
        if (this.name && this.isActive) {
            var attrName = this.namespace
                ? this.namespace + ":" + this.name
                : this.name;
            return attrName + '="' + this.value + '"';
        }
        else {
            return "";
        }
    };
    return Attribute;
}());
exports.Attribute = Attribute;
//# sourceMappingURL=attribute.js.map