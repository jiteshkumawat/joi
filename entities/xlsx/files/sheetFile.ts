import { FileBase } from "../../base/fileBase";
import { XmlParser } from "../../../util/parser";
import { Node } from "../../base/node";
import { Attribute } from "../../base/attribute";
import { Constants } from "../../../util/constants";

export class SheetFile extends FileBase {
  /**
   * Initialize new Sheet file
   * @param id - Sheet Id. Reffered in workbook file.
   * @param name - Sheet Name. Reffered in workbook file.
   */
  constructor(id: number, name: string, isLoad?: boolean) {
    super(
      new Node(
        "worksheet",
        [],
        true,
        "",
        Constants.Namespace.Workbook
      ),
      Constants.FileName.Worksheet + id + ".xml",
      Constants.FilePath.Worksheet
    );
    this.RootChildNodes = Constants.RootChildNodes.Worksheet;
    if (!isLoad) {
      this.name = name;
      // this.rId = rId;
      this.id = id;

      this.sheetData = this.addRootChild(
        "sheetData",
        this.defaultNamespace
      ).node;
    }
  }

  /**
   * The Sheet Id. Defined in Workbook file.
   */
  public id: number;

  /**
   * The Name of Sheet. Defined in Workbook file.
   */
  public name: string;

  /**
   * Get Show Formula attribute value
   */
  public get showFormula(): boolean {
    return this.getSheetViewBoolAttr("showFormulas");
  }

  /**
   * Set Show Formula attribute value
   */
  public set showFormula(value) {
    this.setSheetViewBoolAttr("showFormulas", value);
  }

  /**
   * Get Show Grid Lines attribute value
   */
  public get showGridLines(): boolean {
    return this.getSheetViewBoolAttr("showGridLines");
  }

  /**
   * Set Show Grid Lines attribute value
   */
  public set showGridLines(value) {
    this.setSheetViewBoolAttr("showGridLines", value);
  }

  /**
   * Get Show Row Col Headers attribute value
   */
  public get showRowColHeaders(): boolean {
    return this.getSheetViewBoolAttr("showRowColHeaders");
  }

  /**
   * Set Show Row Col Headers attribute value
   */
  public set showRowColHeaders(value) {
    this.setSheetViewBoolAttr("showRowColHeaders", value);
  }

  /**
   * Get Show Ruler attribute value
   */
  public get showRuler(): boolean {
    return this.getSheetViewBoolAttr("showRuler");
  }

  /**
   * Set Show Ruler attribute value
   */
  public set showRuler(value) {
    this.setSheetViewBoolAttr("showRuler", value);
  }

  /**
   * Get Show Zeros attribute value
   */
  public get showZeros(): boolean {
    return this.getSheetViewBoolAttr("showZeros");
  }

  /**
   * Set Show Zeros attribute value
   */
  public set showZeros(value) {
    this.setSheetViewBoolAttr("showZeros", value);
  }

  /**
   * Get Tab Selected attribute value
   */
  public get tabSelected(): boolean {
    return this.getSheetViewBoolAttr("tabSelected");
  }

  /**
   * Set Tab Selected attribute value
   */
  public set tabSelected(value) {
    this.setSheetViewBoolAttr("tabSelected", value);
  }

  /**
   * Load a file
   * @param content - File Content
   * @param fileName - File Name
   * @param filePath - File Path
   * @returns {Promise<SheetFile>}: - The Promise resolving Workbook File
   */
  public static async load(
    content: string,
    fileName: string,
    filePath: string,
    id: number,
    name: string
  ): Promise<SheetFile> {
    let sheetFile = new SheetFile(undefined, undefined, true);
    await XmlParser.parse(
      content,
      sheetFile,
      Constants.Namespace.Workbook
    );
    sheetFile.fileName = fileName;
    sheetFile.filePath = filePath;
    sheetFile.id = id;
    sheetFile.name = name;
    sheetFile.sheetViews = sheetFile.rootNode.child(
      "sheetViews",
      sheetFile.defaultNamespace
    );
    if (sheetFile.sheetViews) {
      sheetFile.sheetView = sheetFile.sheetViews.child(
        "sheetView",
        sheetFile.defaultNamespace
      );
    }
    sheetFile.sheetData = sheetFile.rootNode.child(
      "sheetData",
      sheetFile.defaultNamespace
    );

    return sheetFile;
  }

  private sheetViews: Node;

  private sheetView: Node;

  private sheetData: Node;

  private createSheetViews() {
    if (!this.sheetViews) {
      this.sheetViews = this.addRootChild(
        "sheetViews",
        this.defaultNamespace
      ).node;
    }
  }

  private createSheetView() {
    if (!this.sheetView) {
      this.createSheetViews();
      this.sheetView = this.sheetViews.child(
        new Node(
          "sheetView",
          [new Attribute("workbookViewId", "0", true, this.defaultNamespace)],
          true,
          this.defaultNamespace
        )
      );
    }
  }

  private getSheetViewBoolAttr(attr: string) {
    if (!this.sheetViews || !this.sheetView) {
      return false;
    } else {
      let showFormulaAttr = this.sheetView.attribute(
        attr,
        this.defaultNamespace
      );
      return (
        showFormulaAttr &&
        (showFormulaAttr.value === "1" || showFormulaAttr.value === "true")
      );
    }
  }

  private setSheetViewBoolAttr(attr: string, value: boolean) {
    this.createSheetView();
    if (value) {
      this.sheetView.attribute(
        new Attribute(attr, "1", true, this.defaultNamespace)
      );
    } else {
      this.sheetView.attribute(
        new Attribute(attr, "0", true, this.defaultNamespace)
      );
    }
  }
}
