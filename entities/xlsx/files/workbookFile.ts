import { Node } from "../../base/node";
import { SheetFile } from "./sheetFile";
import { Attribute } from "../../base/attribute";
import { XmlParser } from "../../../util/parser";
import { EventBus } from "../../../util/eventBus";
import { FileBase } from "../../base/fileBase";

/**
 * Define new workbook file
 */
export class WorkbookFile extends FileBase {
  /**
   * Initialize new workbook file
   * @param fileName - The file name
   * @param filePath - The file path
   * @param isLoad - The file
   */
  constructor(
    eventBus: EventBus,
    fileName?: string,
    filePath?: string,
    isLoad?: boolean
  ) {
    if (!isLoad) {
      super(
        new Node(
          "workbook",
          [],
          true,
          "",
          "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
        ),
        fileName || "workbook.xml",
        filePath || "workbook"
      );

      this.rootNode.addNamespace(
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        "r"
      );

      this.workbookViews = [];
      this.sheets = this.addRootChild("sheets", this.defaultNamespace).node;
      this.initializeView();
      this.bindListeners(eventBus);
    }

    this.RootChildNodes = [
      "bookViews",
      "calcPr",
      "customWorkbookViews",
      "definedNames",
      "externalReferences",
      "extLst",
      "fileRecoveryPr",
      "fileSharing",
      "fileVersion",
      "functionGroups",
      "oleSize",
      "pivotCaches",
      "sheets",
      "smartTagPr",
      "smartTagTypes",
      "webPublishing",
      "webPublishObjects",
      "workbookPr",
      "workbookProtection"
    ];

    this.FirstChildNode = "bookViews";
  }

  /**
   * The Workbook Properties
   */
  private bookViews: Node;

  /**
   * Workbook View collection
   */
  private workbookViews: { sheets: Number[]; node: Node; index: Number }[];

  /**
   * The Worksheets node
   */
  public sheets: Node;

  // /**
  //  * Index of active tab
  //  */
  // private activeTab: Attribute;

  /**
   * Creates a new sheet in workbook and returns
   * @param {string} rId = The relation Id
   * @param {string} sheetName - The sheet name
   * @returns {SheetFile} - The sheet instance
   */
  public createSheet(sheetName?: string): SheetFile {
    let fileNameIndex: number = 0,
      sheetIndex: number = 0;
    this.sheets.children.forEach(sheetNode => {
      let _fileNameIndex =
        parseInt(
          sheetNode
            .attribute("name", this.defaultNamespace)
            .value.replace("sheet", "")
            .replace(".xml", "")
        ) || 0;
      let _sheetIndex =
        parseInt(sheetNode.attribute("sheetId", this.defaultNamespace).value) ||
        0;

      fileNameIndex =
        fileNameIndex < _fileNameIndex ? _fileNameIndex : fileNameIndex;
      sheetIndex = sheetIndex < _sheetIndex ? _sheetIndex : sheetIndex;
    });

    let sheet = new SheetFile(
      sheetIndex + 1,
      sheetName || "sheet" + (sheetIndex + 1).toString()
    );
    this.addSheet(sheet);
    return sheet;
  }

  /**
   * Update Sheet Name
   * @param sheetName - Sheet Name
   * @param sheetId - Sheet Index
   */
  public updateSheetName(sheetName: string, sheetId: number) {
    let sheetNode = this.sheets.children.find(
      sheet =>
        parseInt(
          sheet.attribute("sheetId", this.defaultNamespace).value,
          10
        ) === sheetId
    );

    sheetNode.attribute("name", this.defaultNamespace).value = sheetName;
  }

  /**
   * Load a file
   * @param content - File Content
   * @param fileName - File Name
   * @param filePath - File Path
   * @returns {Promise<WorkbookFile>}: - The Promise resolving Workbook File
   */
  public static async load(
    eventBus: EventBus,
    content: string,
    fileName: string,
    filePath?: string
  ): Promise<WorkbookFile> {
    let workbookFile = new WorkbookFile(eventBus, fileName, filePath, true);
    await XmlParser.parse(
      content,
      workbookFile,
      "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    );
    workbookFile.loadInternal();
    workbookFile.bindListeners(eventBus);
    return workbookFile;
  }

  /**
   * Load file internal
   */
  private loadInternal() {
    let bookViews = this.rootNode.child("bookViews", this.defaultNamespace);

    this.workbookViews = [];
    if (bookViews) {
      let index = 0;
      bookViews.children.forEach(workbookViewNode => {
        if (
          workbookViewNode.name === "workbookView" &&
          workbookViewNode.namespace === this.defaultNamespace
        ) {
          this.workbookViews.push({
            sheets: [],
            node: workbookViewNode,
            index: index++
          });
        }
      });

      // this.activeTab = workbookView.attribute(
      //   "activeTab",
      //   this.defaultNamespace
      // );
    }

    this.sheets = this.rootNode.child("sheets", this.defaultNamespace);
  }

  /**
   * Bind Listeners
   * @param eventBus - Event Bus
   */
  private bindListeners(eventBus: EventBus) {
    var self = this;
    eventBus.startListening("setSheetRelationId", (id: number, rId: string) => {
      var sheetNode = self.sheets.children.find(
        sheet =>
          sheet.attribute("sheetId", self.defaultNamespace).value ===
          id.toString()
      );
      sheetNode.attribute(
        new Attribute(
          "id",
          rId,
          true,
          this.rootNode.namespaces[
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
          ]
        )
      );
    });

    eventBus.startListening(
      "setSheetWorkbookView",
      (sheetId: Number, index?: Number) => {
        let workbookView = index
          ? this.workbookViews.find(wv => wv.index === index)
          : undefined;
        if (!workbookView) {
          workbookView = this.workbookViews.find(wv =>
            wv.sheets.find(s => s === sheetId)
          );
          if (!workbookView) {
            let workbookView = new Node(
              "workbookView",
              [],
              true,
              this.defaultNamespace
            );
            this.workbookViews.push({
              sheets: [sheetId],
              node: workbookView,
              index: this.workbookViews.length
            });
          }
        } else {
          if (!workbookView.sheets) {
            workbookView.sheets = [];
          }
          if (!workbookView.sheets.find(s => s === sheetId)) {
            workbookView.sheets.push(sheetId);
          }
        }
      }
    );
  }

  /**
   * Initilize workbook view
   */
  private initializeView() {
    this.bookViews = this.addRootChild("bookViews", this.defaultNamespace).node;

    let activeTab = new Attribute(
      "activeTab",
      "0",
      true,
      this.defaultNamespace
    );

    let workbookView = new Node(
      "workbookView",
      [activeTab],
      true,
      this.defaultNamespace
    );
    this.workbookViews.push({ sheets: [], node: workbookView, index: 0 });
    this.bookViews.child(
      new Node("workbookView", [activeTab], true, this.defaultNamespace)
    );
  }

  /**
   * Add a new sheet
   * @param {SheetFile} sheet - The sheet to add
   */
  private addSheet(sheet: SheetFile) {
    this.sheets.child(
      new Node(
        "sheet",
        [
          new Attribute("name", sheet.name, true, this.defaultNamespace),
          new Attribute(
            "sheetId",
            sheet.id.toString(10),
            true,
            this.defaultNamespace
          )
        ],
        true,
        this.defaultNamespace
      )
    );
  }

  // Pending
  // 1. Defined Names
  // 2. Workbook Properties
}
