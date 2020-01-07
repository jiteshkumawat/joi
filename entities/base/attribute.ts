/**
 * Xml Attribute
 */
export class Attribute {
  /**
   * Creates new instance of an xml attribute
   * @param {string} name - The name of attribute
   * @param {string} value - The value of attribute
   * @param {boolean} state - The state of attribute
   */
  constructor(
    public name: string,
    public value: string = "",
    public isActive: boolean = true,
    public namespace: string = ""
  ) {}

  /**
   * Gets string for attribute
   * @returns {string} - Attribute string (Name="Value")
   */
  public toString(): string {
    if (this.name && this.isActive) {
      let attrName = this.namespace
        ? this.namespace + ":" + this.name
        : this.name;
      return attrName + '="' + this.value + '"';
    } else {
      return "";
    }
  }
}
