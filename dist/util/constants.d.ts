export declare class Constants {
    static Errors: {
        ErrCreateFileObject: string;
        ErrCreateWorkbook: string;
    };
    static Regex: {
        ValidCellString: RegExp;
        Column: RegExp;
        Row: RegExp;
        NumericId: RegExp;
    };
    static Common: {
        Xmlns: string;
    };
    static FileName: {
        ContentTypes: string;
        Relationship: string;
        SharedString: string;
        Worksheet: string;
        Workbook: string;
    };
    static FilePath: {
        Relationship: string;
        Workbook: string;
        Worksheet: string;
    };
    static Namespace: {
        ContentType: string;
        RelationshipPackage: string;
        Workbook: string;
        Relationships: string;
    };
    static ContentTypes: {
        Worksheet: string;
        Workbook: string;
        Relationship: string;
        SharedString: string;
    };
    static Relationships: {
        Worksheet: string;
        SharedString: string;
        Workbook: string;
    };
    static Events: {
        AddContentType: string;
        SetSheetWorkbookView: string;
        SetSheetRelationId: string;
        AddWorkbookRelation: string;
        AddFile: string;
        SharedString: string;
    };
    static RootChildNodes: {
        Worksheet: string[];
        Workbook: string[];
    };
}
