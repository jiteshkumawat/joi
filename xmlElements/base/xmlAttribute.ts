/**
 * Define a new attribute of an xml node
 */
export class XmlAttribute {
  /**
   * Creates new instance of Attribute
   * @param Name - The Name of Attribute
   * @param Value - The Value of Attribute
   */
  constructor(name: string, value?: string) {
    this.Name = name || "";
    this.Value = value || "";
  }

  /**
   * The attribute name
   */
  public Name: string;

  /**
   * The attribute value
   */
  public Value: string;

  /**
   * Get string representation of an attribute
   * @returns - String representation (Name="Value")
   */
  public toString(): string {
    return this.Name + '="' + this.Value + '"';
  }
}
