import { Xml } from "../../../entities/base/xml";
import { expect } from "chai";
import { Node } from "../../../entities/base/node";
import * as sinon from "sinon";

describe("xml file", function() {
  describe("initialize", function() {
    it("define default attributes", function() {
      // ARRANGE, ACT
      this.Xml = new Xml();

      // ASSERT
      this.message = `
      Default value of Documentation version be 1.0.
      Actual Result: ${this.Xml.documentation.version}
      Expected Result: 1.0
      `;
      expect(this.Xml.documentation.version, this.message).equal("1.0");

      this.message = `
      Default value of Documentation Encoding.
      Actual Result: ${this.Xml.documentation.encoding}
      Expected Result: UTF-8
      `;
      expect(this.Xml.documentation.encoding, this.message).equal("UTF-8");

      this.message = `
      Default value of Documentation Standalone.
      Actual Result: ${this.Xml.documentation.standalone}
      Expected Result: true
      `;
      expect(this.Xml.documentation.standalone, this.message).equal(true);

      this.message = `
      Default value of Root node.
      Actual Result: ${this.Xml.rootNode}
      Expected Result: null
      `;
      expect(this.Xml.rootNode, this.message).equal(null);

      this.message = `
      Default value of file name.
      Actual Result: ${this.Xml.fileName}
      Expected Result: string.Empty
      `;
      expect(this.Xml.fileName, this.message).equal("");

      this.message = `
      Default value of file path.
      Actual Result: ${this.Xml.filePath}
      Expected Result: string.Empty
      `;
      expect(this.Xml.filePath, this.message).equal("");
    });

    it("define attributes from constructor", function() {
      // ARRANGE, ACT
      this.rootNode = new Node("root");
      this.Xml = new Xml(this.rootNode, "file", "path");

      // ASSERT
      this.message = `
        Default value of Root node.
        Actual Result: ${JSON.stringify(this.Xml.rootNode, null, 2)}
        Expected Result: ${JSON.stringify(this.rootNode, null, 2)}
        `;
      expect(this.Xml.rootNode, this.message).equal(this.rootNode);

      this.message = `
        Default value of file name.
        Actual Result: ${this.Xml.FileName}
        Expected Result: file
        `;
      expect(this.Xml.fileName, this.message).equal("file");

      this.message = `
        Default value of file path.
        Actual Result: ${this.Xml.filePath}
        Expected Result: path
        `;
      expect(this.Xml.filePath, this.message).equal("path");
    });
  });

  describe("addNode method", function() {
    it("define root node", function() {
      // ARRANGE
      this.Xml = new Xml();
      this.rootNode = new Node("root");

      // ACT
      this.Xml.addNode(this.rootNode);

      // ASSERT
      this.message = `
        Define Root node by add node
        Actual Value: ${JSON.stringify(this.Xml.rootNode, null, 2)}
        Expected Value: ${JSON.stringify(this.rootNode, null, 2)}
        `;
      expect(this.Xml.rootNode, this.message).equal(this.rootNode);
    });

    it("define child node", function() {
      // ARRANGE

      this.rootNode = new Node("root");
      this.Xml = new Xml(this.rootNode);
      this.childNode = new Node("child");

      // ACT
      this.Xml.addNode(this.childNode);

      // ASSERT
      this.message = `
        Define Root node by add node
        Actual Value: ${JSON.stringify(this.Xml.rootNode.children[0], null, 2)}
        Expected Value: ${JSON.stringify(this.childNode, null, 2)}
        `;
      expect(this.Xml.rootNode.children[0], this.message).equal(this.childNode);
    });
  });

  describe("toString method", function() {
    it("return stringify result of documentation node if root node not present", function() {
      // ARRANGE
      this.Xml = new Xml();
      sinon.stub(this.Xml.documentation, "toString").returns("documentation");

      // ACT
      this.result = this.Xml.toString();

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
      this.rootNode = new Node("root");
      this.Xml = new Xml(this.rootNode);
      sinon.stub(this.Xml.documentation, "toString").returns("documentation");

      sinon.stub(this.rootNode, "toString").returns("root");
      // ACT
      this.result = this.Xml.toString();

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
      this.Xml = new Xml();
      this.Xml.fileName = "new";
      sinon.stub(this.Xml, "toString").returns("file");
      this.zip = {
        file: sinon.fake()
      };

      // ACT
      this.Xml.saveFile(this.zip);

      // ASSERT
      this.message = `
      Calls add file on zip root
      `;
      expect(this.zip.file.calledWith("new", "file"), this.message);
    });

    it("adds file to directory when path is defined", function() {
      // ARRANGE
      this.Xml = new Xml();
      this.Xml.fileName = "new";
      this.Xml.filePath = "path";
      sinon.stub(this.Xml, "toString").returns("file");
      this.file = {
        file: sinon.fake()
      };
      this.zip = {
        folder: sinon.fake.returns(this.file)
      };

      // ACT
      this.Xml.saveFile(this.zip);

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
