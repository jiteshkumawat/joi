/**
 * Define a new documentation node of an xml file
 */
export class XmlDocumentation {
  /**
   * Creates new instance of Documentation Node
   * @param version - The version of xml
   * @param encoding - The encoding of xml
   * @param standalone - Determine xml is standalone or not
   */
  constructor(version?: string, encoding?: string, standalone?: boolean) {
    this.Version = version || "1.0";
    this.Encoding = encoding || "UTF-8";
    this.Standalone = standalone === false ? false : true;
  }
  /**
   * The xml version
   */
  public Version: string;

  /**
   * The xml encoding
   */
  public Encoding: string;

  /**
   * Determine xml is standalone or not
   */
  public Standalone: boolean;

  /**
   * Get string representation of a documentation
   * @returns - String representation (<?xml Attributes?>)
   */
  public toString(): string {
    return (
      '<?xml version="' +
      this.Version +
      '" encoding="' +
      this.Encoding +
      '" standalone="' +
      (this.Standalone === true ? "yes" : "no") +
      '"?>\n'
    );
  }
}
