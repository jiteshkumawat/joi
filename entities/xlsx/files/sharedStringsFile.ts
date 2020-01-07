import { Xml } from "../../base/xml";
import { Node } from "../../base/node";
import { XmlParser } from "../../../util/parser";
import { Attribute } from "../../base/attribute";

/**
 * Define new Shared string file
 */
export class SharedStringsFile extends Xml {
  /**
   * Total count of shared strings
   */
  private countAttribute: Attribute;

  /**
   * Total unique count of shared strings
   */
  private uniqueCountAttribute: Attribute;

  /**
   * Initialize new workbook file
   */
  constructor() {
    super(
      new Node(
        "sst",
        [],
        true,
        "",
        "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
      ),
      "sharedstrings.xml",
      "workbook"
    );

    // this.rootNode.addNamespace(
    //   "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    //   "r"
    // );

    this.resetCount();
  }

  /**
   * Add a new shared string in workbook
   * @param {string} value - The shared string
   * @returns { index: number; value: string } - The shared string index
   */
  public add(value: string): { index: number; value: string } {
    let saved = this.get(value);
    if (saved) {
      return saved;
    } else {
      let uniqueCount = parseInt(this.uniqueCountAttribute.value);
      this.uniqueCountAttribute.value = (++uniqueCount).toString(10);
    }

    const si = new Node("si", [], true, this.defaultNamespace);
    const t = new Node("t", [], true, this.defaultNamespace);
    t.value = value;
    si.child(t);
    this.rootNode.child(si);
    const index = this.rootNode.children.length;

    return { index, value };
  }

  /**
   * Get the shared string index
   * @param {string} value - The shared string
   * @returns {number} - The shared string index
   */
  public get(value: string | number): { index: number; value: string } {
    for (let index = 0; index < this.rootNode.children.length; index++) {
      let tNode = this.rootNode.children[index].child(
        "t",
        this.defaultNamespace
      );
      if (
        (tNode !== null &&
          typeof value === "string" &&
          tNode.value === value) ||
        (typeof value === "number" && index + 1 === value)
      ) {
        return {
          index: index + 1,
          value: tNode.value
        };
      }
    }

    return null;
  }

  /**
   * Total count of shared string used
   * @param count - Total count of shared strings used
   */
  public setCount(count: number) {
    this.countAttribute.value = count.toString();
  }

  /**
   * Add count
   */
  public addCount() {
    let count = parseInt(this.countAttribute.value);
    this.countAttribute.value = (++count).toString(10);
    return count;
  }

  /**
   * Load a file
   * @param content - File Content
   * @param fileName - File Name
   * @param filePath - File Path
   * @returns {Promise<SharedStringsFile>}: - The Promise resolving Shared string file
   */
  public static async load(
    content: string,
    fileName: string,
    filePath?: string
  ): Promise<SharedStringsFile> {
    let sharedStringsFile = new SharedStringsFile();
    sharedStringsFile.fileName = fileName;
    sharedStringsFile.filePath = filePath;

    await XmlParser.parse(
      content,
      sharedStringsFile,
      "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    );
    sharedStringsFile.resetCount();

    return sharedStringsFile;
  }

  private resetCount() {
    let savedUniqueCount = this.rootNode.attribute(
        "uniqueCount",
        this.defaultNamespace
      ),
      savedCount = this.rootNode.attribute("count", this.defaultNamespace);
    if (!savedUniqueCount) {
      this.uniqueCountAttribute = new Attribute(
        "uniqueCount",
        this.rootNode.children.length.toString(10),
        true,
        this.defaultNamespace
      );
      this.rootNode.attribute(this.uniqueCountAttribute);
    } else {
      this.uniqueCountAttribute = savedUniqueCount;
    }

    if (!savedCount) {
      this.countAttribute = new Attribute(
        "count",
        "0",
        true,
        this.defaultNamespace
      );
      this.rootNode.attribute(this.countAttribute);
    } else {
      this.countAttribute = savedCount;
    }
  }
}
