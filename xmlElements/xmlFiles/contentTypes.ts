import { XmlFile } from "../base/xmlFile";
import { XmlRootNode } from "../base/xmlRootNode";
import { XmlNode } from "../base/xmlNode";
import { XmlAttribute } from "../base/xmlAttribute";

/**
 * Define a new content types file
 */
export class ContentTypes extends XmlFile {
  /**
   * Creates new instance of content types
   */
  constructor() {
    super(
      new XmlRootNode(
        "Types",
        "http://schemas.openxmlformats.org/package/2006/content-types"
      ),
      "[Content_Types].xml"
    );
  }

  /**
   * Add a new default node
   * @param {string} contentType - The content type string
   * @param {string} extension - The extension string
   * @returns {XmlNode} - The default node
   */
  public addDefault(contentType: string, extension: string): XmlNode {
    const defaultNode = new XmlNode("Default", [
      new XmlAttribute("ContentType", contentType),
      new XmlAttribute("Extension", extension)
    ]);
    this.rootNode.child(defaultNode);
    return defaultNode;
  }

  /**
   * Add a new override node
   * @param {string} contentType - The content type string
   * @param {string} partName - The part name string
   * @returns {XmlNode} - The override node
   */
  public addOverride(contentType: string, partName: string): XmlNode {
    const overrideNode = new XmlNode("Override", [
      new XmlAttribute("ContentType", contentType),
      new XmlAttribute("PartName", partName)
    ]);
    this.rootNode.child(overrideNode);
    return overrideNode;
  }
}
