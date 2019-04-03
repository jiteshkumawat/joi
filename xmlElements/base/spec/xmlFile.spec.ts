import { XmlFile } from "../xmlFile";
import { expect } from "chai";
import { XmlRootNode } from "../xmlRootNode";
import { XmlNode } from "../xmlNode";
import * as sinon from "sinon";

describe("xml file", function() {
  describe("initialize", function() {
    it("define default attributes", function() {
      // ARRANGE, ACT
      this.xmlFile = new XmlFile();

      // ASSERT
      this.message = `
      Default value of Documentation version be 1.0.
      Actual Result: ${this.xmlFile.Documentation.Version}
      Expected Result: 1.0
      `;
      expect(this.xmlFile.Documentation.Version, this.message).equal("1.0");

      this.message = `
      Default value of Documentation Encoding.
      Actual Result: ${this.xmlFile.Documentation.Encoding}
      Expected Result: UTF-8
      `;
      expect(this.xmlFile.Documentation.Encoding, this.message).equal("UTF-8");

      this.message = `
      Default value of Documentation Standalone.
      Actual Result: ${this.xmlFile.Documentation.Standalone}
      Expected Result: true
      `;
      expect(this.xmlFile.Documentation.Standalone, this.message).equal(true);

      this.message = `
      Default value of Root node.
      Actual Result: ${this.xmlFile.RootNode}
      Expected Result: null
      `;
      expect(this.xmlFile.RootNode, this.message).equal(null);

      this.message = `
      Default value of file name.
      Actual Result: ${this.xmlFile.FileName}
      Expected Result: string.Empty
      `;
      expect(this.xmlFile.FileName, this.message).equal("");

      this.message = `
      Default value of file path.
      Actual Result: ${this.xmlFile.FilePath}
      Expected Result: string.Empty
      `;
      expect(this.xmlFile.FilePath, this.message).equal("");
    });

    it("define attributes from constructor", function() {
      // ARRANGE, ACT
      this.rootNode = new XmlRootNode("root");
      this.xmlFile = new XmlFile(this.rootNode, "file", "path");

      // ASSERT
      this.message = `
        Default value of Root node.
        Actual Result: ${JSON.stringify(this.xmlFile.RootNode, null, 2)}
        Expected Result: ${JSON.stringify(this.rootNode, null, 2)}
        `;
      expect(this.xmlFile.RootNode, this.message).equal(this.rootNode);

      this.message = `
        Default value of file name.
        Actual Result: ${this.xmlFile.FileName}
        Expected Result: file
        `;
      expect(this.xmlFile.FileName, this.message).equal("file");

      this.message = `
        Default value of file path.
        Actual Result: ${this.xmlFile.FilePath}
        Expected Result: path
        `;
      expect(this.xmlFile.FilePath, this.message).equal("path");
    });
  });

  describe("addNode method", function() {
    it("define root node", function() {
      // ARRANGE
      this.xmlFile = new XmlFile();
      this.rootNode = new XmlRootNode("root");

      // ACT
      this.xmlFile.addNode(this.rootNode);

      // ASSERT
      this.message = `
        Define Root node by add node
        Actual Value: ${JSON.stringify(this.xmlFile.RootNode, null, 2)}
        Expected Value: ${JSON.stringify(this.rootNode, null, 2)}
        `;
      expect(this.xmlFile.RootNode, this.message).equal(this.rootNode);
    });

    it("define child node", function() {
      // ARRANGE

      this.rootNode = new XmlRootNode("root");
      this.xmlFile = new XmlFile(this.rootNode);
      this.childNode = new XmlNode("child");

      // ACT
      this.xmlFile.addNode(this.childNode);

      // ASSERT
      this.message = `
        Define Root node by add node
        Actual Value: ${JSON.stringify(
          this.xmlFile.RootNode.Children[0],
          null,
          2
        )}
        Expected Value: ${JSON.stringify(this.childNode, null, 2)}
        `;
      expect(this.xmlFile.RootNode.Children[0], this.message).equal(
        this.childNode
      );
    });
  });

  describe("toString method", function() {
    it("return stringify result of documentation node if root node not present", function() {
      // ARRANGE
      this.xmlFile = new XmlFile();
      sinon
        .stub(this.xmlFile.Documentation, "toString")
        .returns("documentation");

      // ACT
      this.result = this.xmlFile.toString();

      // ASSERT
      this.message = `
      Stringify documentation node only
      Actual Result: ${this.result}
      Expected Result: documentation
      `;
      expect(this.result, this.message).equal("documentation");
    });

    it("return stringify result of documentation node and root node", function() {
      // ARRANGE
      this.rootNode = new XmlRootNode("root");
      this.xmlFile = new XmlFile(this.rootNode);
      sinon
        .stub(this.xmlFile.Documentation, "toString")
        .returns("documentation");

      sinon.stub(this.rootNode, "toString").returns("root");
      // ACT
      this.result = this.xmlFile.toString();

      // ASSERT
      this.message = `
      Stringify documentation node and root node
      Actual Result: ${this.result}
      Expected Result: documentationroot
      `;
      expect(this.result).equal("documentationroot");
    });
  });

  describe("saveFile method", function() {
    it("adds file to root directory when path is missing", function() {
      // ARRANGE
      this.xmlFile = new XmlFile();
      this.xmlFile.FileName = "new";
      sinon.stub(this.xmlFile, "toString").returns("file");
      this.zip = {
        file: sinon.fake()
      };

      // ACT
      this.xmlFile.saveFile(this.zip);

      // ASSERT
      this.message = `
      Calls add file on zip root
      `;
      expect(this.zip.file.calledWith("new", "file"), this.message);
    });

    it("adds file to directory when path is defined", function() {
      // ARRANGE
      this.xmlFile = new XmlFile();
      this.xmlFile.FileName = "new";
      this.xmlFile.FilePath = "path";
      sinon.stub(this.xmlFile, "toString").returns("file");
      this.file = {
        file: sinon.fake()
      };
      this.zip = {
        folder: sinon.fake.returns(this.file)
      };

      // ACT
      this.xmlFile.saveFile(this.zip);

      // ASSERT
      this.message = `
      Calls add folder on zip folder
      `;
      expect(this.zip.folder.calledWith("path"), this.message);

      this.message = `
      Calls add file on zip folder
      `;
      expect(this.file.file.calledWith("new", "file"), this.message);
    });
  });
});
