import { XmlFile } from "../xmlElements/base/xmlFile";

declare let JSZip: any;
declare let saveAs: any;

/**
 * Define file handler utility
 */
export class FileHandler {
  /**
   * Creates a new js zip instance and saves file
   * @param files - The collection of files
   * @param fileName - The file name
   * @param callback - The callback for Save complete
   */
  public saveFile(files: XmlFile[], fileName: string, callback: Function) {
    if (typeof window !== "undefined") {
      this.saveForBrowser(files, fileName, callback);
    } else {
      this.saveForNode(files, fileName, callback);
    }
  }

  /**
   * Save file for Browsers
   * @param files - The collection of files
   * @param fileName - The file name
   * @param callback - The callback for save complete
   */
  private saveForBrowser(
    files: XmlFile[],
    fileName: string,
    callback?: Function
  ) {
    try {
      let zip = new JSZip();
      files.forEach(file => {
        file.saveFile(zip);
      });

      return zip.generateAsync({ type: "blob" }).then(function(content: any) {
        try {
          if (typeof saveAs !== "undefined") {
            return saveAs(content, fileName);
          }
          var url = window.URL.createObjectURL(content);
          var element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute("download", fileName);

          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);

          if (callback) {
            callback(zip);
          } else {
            return zip;
          }
        } catch (err) {
          if (callback) {
            callback(null, "Err: Not able to create file object.");
          } else {
            throw err;
          }
        }
      });
    } catch (err) {
      if (callback) {
        callback("Err: Not able to create workbook.");
        console.error(err);
      } else {
        throw err;
      }
    }
  }

  /**
   * Save files for node
   * @param files - The collection of files
   * @param fileName - The file name
   * @param callback - The callback for save complete
   */
  private saveForNode(files: XmlFile[], fileName: string, callback?: Function) {
    try {
      let jsZip = require("jszip");
      let zip = new jsZip();
      let fs = require("fs");

      files.forEach(file => {
        file.saveFile(zip);
      });

      if (callback) {
        zip
          .generateNodeStream({ type: "nodebuffer", streamFiles: true })
          .pipe(fs.createWriteStream(fileName))
          .then(callback());
      } else {
        return zip
          .generateNodeStream({ type: "nodebuffer", streamFiles: true })
          .pipe(fs.createWriteStream(fileName));
      }
    } catch (err) {
      if (callback) {
        callback("Err: Not able to create workbook.");
        console.error(err);
      } else {
        return Promise.reject(err);
      }
    }
  }
}
