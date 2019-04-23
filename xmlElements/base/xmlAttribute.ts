/**
 * Define a new attribute of an xml node
 */
export class XmlAttribute {
  /**
   * Creates new instance of Attribute
   * @param {string} name - The Name of Attribute
   * @param {string} value - The Value of Attribute
   * @param {boolean} state - The state of attribute
   */
  constructor(
    public name: string,
    public value: string = "",
    public state: boolean = true
  ) {}

  /**
   * Get string representation of an attribute
   * @returns {string} - String representation (Name="Value")
   */
  public toString(): string {
    if (this.name && this.state) {
      return this.name + '="' + this.value + '"';
    } else {
      return "";
    }
  }
}
