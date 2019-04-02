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
   * @param contentType - The content type string
   * @param extension - The extension string
   */
  public addDefault(contentType: string, extension: string) {
    const defaultNode = new XmlNode("Default", [
      new XmlAttribute("ContentType", contentType),
      new XmlAttribute("Extension", extension)
    ]);
    this.RootNode.addChild(defaultNode);
    return defaultNode;
  }

  /**
   * Add a new override node
   * @param contentType - The content type string
   * @param partName - The part name string
   */
  public addOverride(contentType: string, partName: string) {
    const overrideNode = new XmlNode("Override", [
      new XmlAttribute("ContentType", contentType),
      new XmlAttribute("PartName", partName)
    ]);
    this.RootNode.addChild(overrideNode);
    return overrideNode;
  }
}
