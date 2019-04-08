/**
 * Define a new attribute of an xml node
 */
export class XmlAttribute {
  /**
   * Creates new instance of Attribute
   * @param Name - The Name of Attribute
   * @param Value - The Value of Attribute
   * @param state - The state of attribute
   */
  constructor(name: string, value?: string, state?: boolean) {
    this.Name = name;
    this.Value = value || "";
    this.State = state !== false;
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
   * Determine if Attribute is active or not
   */
  public State: boolean;

  /**
   * Get string representation of an attribute
   * @returns - String representation (Name="Value")
   */
  public toString(): string {
    if (this.Name && this.State) {
      return this.Name + '="' + this.Value + '"';
    } else {
      return "";
    }
  }
}
