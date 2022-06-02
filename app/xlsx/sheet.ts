import { SheetFile } from "../../entities/xlsx/files/sheetFile";
import { EventBus } from "../../util/eventBus";
import { WorkbookFile } from "../../entities/xlsx/files/workbookFile";
import { Constants } from "../../util/constants";

/**
 * Define a new worksheet file
 */
export class Sheet {
  constructor(
    sheetFile: SheetFile,
    eventBus: EventBus,
    workbookFile: WorkbookFile
  ) {
    let self = this;
    eventBus.trigger(Constants.Events.AddFile, sheetFile);

    this.defineNameProperty(sheetFile, workbookFile);

    /**
     * Configure Sheet Properties
     * @param properties - Sheet Properties JSON
     * @returns {Sheet} - Sheet Object
     */
    this.configure = function(properties: {
      showGridLines?: boolean;
      showFormula?: boolean;
      showRowColHeaders?: boolean;
      showRuler?: boolean;
      showZeros?: boolean;
      tabSelected?: boolean;
    }): Sheet {
      self.configureInternal(properties, sheetFile);
      return self;
    };
  }

  /**
   * Configure Sheet Properties
   * @param properties - Sheet Properties JSON
   * @returns {Sheet} - Sheet Object
   */
  public configure: (properties: {
    showGridLines?: boolean;
    showFormula?: boolean;
    showRowColHeaders?: boolean;
    showRuler?: boolean;
    showZeros?: boolean;
    tabSelected?: boolean;
  }) => Sheet;

  /**
   * Get if sheetFile is active
   * @returns {string} - True if sheetFile is active
   */
  public name: boolean;

  public toJSON(){
    return {name: this.name};
  }

  private defineNameProperty(sheetFile: SheetFile, workbookFile: WorkbookFile) {
    Object.defineProperty(this, "name", {
      get: function() {
        return sheetFile.name;
      },
      set: function(value: string) {
        sheetFile.name = value;
        workbookFile.updateSheetName(value, sheetFile.id);
      },
      enumerable: true,
      configurable: true
    });
  }
  
  private configureInternal(
    options: {
      showGridLines?: boolean;
      showFormula?: boolean;
      showRowColHeaders?: boolean;
      showRuler?: boolean;
      showZeros?: boolean;
      tabSelected?: boolean;
    },
    sheetFile: SheetFile
  ) {
    if (options.showGridLines === true) {
      sheetFile.showGridLines = true;
    } else if (options.showGridLines === false) {
      sheetFile.showGridLines = false;
    }

    if (options.showFormula === true) {
      sheetFile.showFormula = true;
    } else if (options.showFormula === false) {
      sheetFile.showFormula = false;
    }

    if (options.showRowColHeaders === true) {
      sheetFile.showRowColHeaders = true;
    } else if (options.showRowColHeaders === false) {
      sheetFile.showRowColHeaders = false;
    }

    if (options.showRuler === true) {
      sheetFile.showRuler = true;
    } else if (options.showRuler === false) {
      sheetFile.showRuler = false;
    }

    if (options.showZeros === true) {
      sheetFile.showZeros = true;
    } else if (options.showZeros === false) {
      sheetFile.showZeros = false;
    }

    if (options.tabSelected === true) {
      sheetFile.tabSelected = true;
    } else if (options.tabSelected === false) {
      sheetFile.tabSelected = false;
    }
  }
}
