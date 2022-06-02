"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.Errors = {
        ErrCreateFileObject: "Err: Not able to create file object.",
        ErrCreateWorkbook: "Err: Not able to create workbook."
    };
    Constants.Regex = {
        ValidCellString: /^[A-Z]{1,3}[1-9]\d{0,6}$/,
        Column: /^[A-Z]{1,3}/,
        Row: /\d{1,7}$/,
        NumericId: /\d+/
    };
    Constants.Common = {
        Xmlns: "xmlns"
    };
    Constants.FileName = {
        ContentTypes: "[Content_Types].xml",
        Relationship: ".rels",
        SharedString: "sharedstrings.xml",
        Worksheet: "sheet",
        Workbook: "workbook.xml"
    };
    Constants.FilePath = {
        Relationship: "_rels",
        Workbook: "workbook",
        Worksheet: "workbook/sheets"
    };
    Constants.Namespace = {
        ContentType: "http://schemas.openxmlformats.org/package/2006/content-types",
        RelationshipPackage: "http://schemas.openxmlformats.org/package/2006/relationships",
        Workbook: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
        Relationships: "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    };
    Constants.ContentTypes = {
        Worksheet: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
        Workbook: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
        Relationship: "application/vnd.openxmlformats-package.relationships+xml",
        SharedString: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"
    };
    Constants.Relationships = {
        Worksheet: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
        SharedString: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
        Workbook: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"
    };
    Constants.Events = {
        AddContentType: "addContentType",
        SetSheetWorkbookView: "setSheetWorkbookView",
        SetSheetRelationId: "setSheetRelationId",
        AddWorkbookRelation: "addWorkbookRelation",
        AddFile: "addFile",
        SharedString: "sharedString"
    };
    Constants.RootChildNodes = {
        Worksheet: [
            "sheetPr",
            "dimension",
            "sheetViews",
            "sheetFormatPr",
            "cols",
            "sheetData",
            "sheetCalcPr",
            "sheetProtection",
            "protectedRanges",
            "scenarios",
            "autoFilter",
            "sortState",
            "dataConsolidate",
            "customSheetViews",
            "mergeCells",
            "phoneticPr",
            "conditionalFormatting",
            "dataValidations",
            "hyperlinks",
            "printOptions",
            "pageMargins",
            "pageSetup",
            "headerFooter",
            "rowBreaks",
            "colBreaks",
            "customProperties",
            "cellWatches",
            "ignoredErrors",
            "smartTags",
            "drawing",
            "legacyDrawing",
            "legacyDrawingHF",
            "drawingHF",
            "picture",
            "oleObjects",
            "controls",
            "webPublishItems",
            "tableParts",
            "extLst"
        ],
        Workbook: [
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
        ]
    };
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=constants.js.map