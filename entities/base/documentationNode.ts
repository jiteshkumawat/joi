/**
 * Documentation Node
 */
export class DocumentationNode {
  /**
   * Creates new instance of Documentation Node
   * @param {string} version - The version of xml
   * @param {string} encoding - The encoding of xml
   * @param {boolean} standalone - Determine xml is standalone or not
   */
  constructor(
    public version: string = "1.0",
    public encoding: string = "UTF-8",
    public standalone: boolean = true
  ) {}

  /**
   * Get string for node
   * @returns {string} - Node string (<?xml Attributes?>)
   */
  public toString(): string {
    return (
      '<?xml version="' +
      this.version +
      '" encoding="' +
      this.encoding +
      '" standalone="' +
      (this.standalone === true ? "yes" : "no") +
      '"?>\n'
    );
  }
}
