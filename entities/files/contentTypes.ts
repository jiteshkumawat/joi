import { Xml } from "../base/xml";
import { Node } from "../base/node";
import { Attribute } from "../base/attribute";
import { XmlParser } from "../../util/parser";
import { FileAdapter } from "../../util/fileHandler";
import { EventBus } from "../../util/eventBus";

/**
 * Content Types file
 */
export class ContentTypes extends Xml {
  /**
   * Creates new instance of content types
   */
  constructor(eventBus: EventBus, fileName?: string) {
    if (!fileName) {
      super(
        new Node(
          "Types",
          [],
          true,
          "",
          "http://schemas.openxmlformats.org/package/2006/content-types"
        ),
        "[Content_Types].xml"
      );
    }

    this.defaults = {};
    this.overrides = {};
    this.bindListeners(eventBus);
  }

  /**
   * Add a new default node
   * @param {string} contentType - The content type string
   * @param {string} extension - The extension string
   * @returns {Node} - The default node
   */
  public addDefault(contentType: string, extension: string): Node {
    const defaultNode = new Node(
      "Default",
      [
        new Attribute("ContentType", contentType, true, this.defaultNamespace),
        new Attribute("Extension", extension, true, this.defaultNamespace)
      ],
      true,
      this.defaultNamespace
    );
    this.rootNode.child(defaultNode);
    this.defaults[contentType] = extension;
    return defaultNode;
  }

  /**
   * Add a new override node
   * @param {string} contentType - The content type string
   * @param {string} partName - The part name string
   * @returns {Node} - The override node
   */
  public addOverride(contentType: string, partName: string): Node {
    const overrideNode = new Node(
      "Override",
      [
        new Attribute("ContentType", contentType, true, this.defaultNamespace),
        new Attribute("PartName", partName, true, this.defaultNamespace)
      ],
      true,
      this.defaultNamespace
    );
    this.rootNode.child(overrideNode);
    this.overrides[contentType] = partName;
    return overrideNode;
  }

  public defaults: any;

  public overrides: any;

  /**
   * Load a file
   * @param file - File Adapter
   * @param eventBus = Event Bus
   * @returns {Promise<ContentTypes>}: - The Content Types object
   */
  public static async load(
    file: FileAdapter,
    eventBus: EventBus
  ): Promise<ContentTypes> {
    let contentTypes = new ContentTypes(eventBus, file.fileNameWithExtention);
    await XmlParser.parse(
      file.fileContent,
      contentTypes,
      "http://schemas.openxmlformats.org/package/2006/content-types"
    );

    contentTypes.rootNode.children.forEach(childNode => {
      if (
        childNode.name.toLowerCase() === "default" &&
        childNode.namespace === contentTypes.defaultNamespace
      ) {
        let contentType = childNode.attribute(
          "ContentType",
          contentTypes.defaultNamespace
        ).value;
        contentTypes.defaults[contentType] = childNode.attribute(
          "Extension",
          contentTypes.defaultNamespace
        ).value;
      } else if (
        childNode.name.toLowerCase() === "override" &&
        childNode.namespace === contentTypes.defaultNamespace
      ) {
        let contentType_1 = childNode.attribute(
          "ContentType",
          contentTypes.defaultNamespace
        ).value;
        contentTypes.overrides[contentType_1] = childNode.attribute(
          "PartName",
          contentTypes.defaultNamespace
        ).value;
      }
    });
    
    contentTypes.bindListeners(eventBus);
    file.xmlFile = contentTypes;
    file.processed = true;

    return contentTypes;
  }

  /**
   * Bind Listeners
   * @param eventBus - Event Bus
   */
  private bindListeners(eventBus: EventBus) {
    eventBus.stopListening("addContentType");
    eventBus.startListening(
      "addContentType",
      (type: string, contentType: string, arg: string) => {
        if (type.toLowerCase() === "default") {
          this.addDefault(contentType, arg);
        } else {
          this.addOverride(contentType, arg);
        }
      }
    );
  }
}
