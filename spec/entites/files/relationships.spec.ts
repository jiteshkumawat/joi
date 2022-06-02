import { Relationships } from "../../../entities/files/relationships";
import { expect } from "chai";
import * as sinon from "sinon";
import { XmlParser } from "../../../util/parser";
import { FileAdapter } from "../../../util/fileHandler";

describe("Relationships", function() {
  describe("initialize", function() {
    it("define default values without parameters", function() {
      // ARRANGE, ACT
      this.relationships = new Relationships();

      // ASSERT
      this.message = `
          Namespace should be defined.
          Actual Result: ${this.relationships.rootNode.namespaces["http://schemas.openxmlformats.org/package/2006/relationships"]}
          Expected Result: ''
          `;
      expect(
        this.relationships.rootNode.namespaces["http://schemas.openxmlformats.org/package/2006/relationships"],
        this.message
      ).equal("");

      this.message = `
          Name should be defined.
          Actual Result: ${this.relationships.rootNode.name}
          Expected Result: Relationships
          `;
      expect(this.relationships.rootNode.name, this.message).equal(
        "Relationships"
      );

      this.message = `
          FileName should be defined.
          Actual Result: ${this.relationships.fileName}
          Expected Result: .rels
          `;
      expect(this.relationships.fileName, this.message).equal(".rels");

      this.message = `
          FilePath should be defined.
          Actual Result: ${this.relationships.filePath}
          Expected Result: _rels
          `;
      expect(this.relationships.filePath, this.message).equal("_rels");
    });

    it("define default values with file name", function() {
      // ARRANGE, ACT
      this.relationships = new Relationships("abc.rels");

      // ASSERT
      this.message = `
            Namespace should be defined.
            Actual Result: ${this.relationships.rootNode.namespaces["http://schemas.openxmlformats.org/package/2006/relationships"]}
            Expected Result: ''
            `;
      expect(
        this.relationships.rootNode.namespaces["http://schemas.openxmlformats.org/package/2006/relationships"],
        this.message
      ).equal("");

      this.message = `
            Name should be defined.
            Actual Result: ${this.relationships.rootNode.name}
            Expected Result: Relationships
            `;
      expect(this.relationships.rootNode.name, this.message).equal(
        "Relationships"
      );

      this.message = `
            FileName should be defined.
            Actual Result: ${this.relationships.fileName}
            Expected Result: abc.rels
            `;
      expect(this.relationships.fileName, this.message).equal("abc.rels");

      this.message = `
            FilePath should be defined.
            Actual Result: ${this.relationships.filePath}
            Expected Result: _rels
            `;
      expect(this.relationships.filePath, this.message).equal("_rels");
    });

    it("define default values with file path", function() {
      // ARRANGE, ACT
      this.relationships = new Relationships(undefined, "sheet");

      // ASSERT
      this.message = `
            Namespace should be defined.
            Actual Result: ${this.relationships.rootNode.namespaces["http://schemas.openxmlformats.org/package/2006/relationships"]}
            Expected Result: ''
            `;
      expect(
        this.relationships.rootNode.namespaces["http://schemas.openxmlformats.org/package/2006/relationships"],
        this.message
      ).equal("");

      this.message = `
            Name should be defined.
            Actual Result: ${this.relationships.rootNode.name}
            Expected Result: Relationships
            `;
      expect(this.relationships.rootNode.name, this.message).equal(
        "Relationships"
      );

      this.message = `
            FileName should be defined.
            Actual Result: ${this.relationships.fileName}
            Expected Result: .rels
            `;
      expect(this.relationships.fileName, this.message).equal(".rels");

      this.message = `
            FilePath should be defined.
            Actual Result: ${this.relationships.filePath}
            Expected Result: sheet
            `;
      expect(this.relationships.filePath, this.message).equal("sheet");
    });

    it("define default values with file name and file path", function() {
      // ARRANGE, ACT
      this.relationships = new Relationships("sheet.rels", "sheet");

      // ASSERT
      this.message = `
              Namespace should be defined.
              Actual Result: ${this.relationships.rootNode.namespaces["http://schemas.openxmlformats.org/package/2006/relationships"]}
              Expected Result: ''
              `;
      expect(
        this.relationships.rootNode.namespaces["http://schemas.openxmlformats.org/package/2006/relationships"],
        this.message
      ).equal("");

      this.message = `
              Name should be defined.
              Actual Result: ${this.relationships.rootNode.name}
              Expected Result: Relationships
              `;
      expect(this.relationships.rootNode.name, this.message).equal(
        "Relationships"
      );

      this.message = `
              FileName should be defined.
              Actual Result: ${this.relationships.fileName}
              Expected Result: sheet.rels
              `;
      expect(this.relationships.fileName, this.message).equal("sheet.rels");

      this.message = `
              FilePath should be defined.
              Actual Result: ${this.relationships.filePath}
              Expected Result: sheet
              `;
      expect(this.relationships.filePath, this.message).equal("sheet");
    });
  });

  describe("addRelationship", function() {
    it("adds a relationship node to root node with id", function() {
      // ARRANGE,
      this.relationships = new Relationships();

      // ACT
      this.result = this.relationships.addRelationship("target", "type", 3);

      // ASSERT
      this.message = `
              Adds a relationship node to root.
              Actual Result: ${this.relationships.rootNode.children[0].name}
              Expected Result: Relationship
              `;
      expect(this.relationships.rootNode.children[0].name, this.message).equal(
        "Relationship"
      );

      this.message = `
              Adds a relationship node to root with Id.
              Actual Result: ${this.relationships.rootNode.children[0].attributes[0].name}
              Expected Result: Id
              `;
      expect(
        this.relationships.rootNode.children[0].attributes[0].name,
        this.message
      ).equal("Id");

      this.message = `
              Adds a relationship node to root with rId3 value.
              Actual Result: ${this.relationships.rootNode.children[0].attributes[0].value}
              Expected Result: rId3
              `;
      expect(
        this.relationships.rootNode.children[0].attributes[0].value,
        this.message
      ).equal("rId3");

      this.message = `
              Adds a relationship node to root with Type.
              Actual Result: ${this.relationships.rootNode.children[0].attributes[1].name}
              Expected Result: Type
              `;
      expect(
        this.relationships.rootNode.children[0].attributes[1].name,
        this.message
      ).equal("Type");

      this.message = `
              Adds a relationship node to root with Type value.
              Actual Result: ${this.relationships.rootNode.children[0].attributes[1].value}
              Expected Result: type
              `;
      expect(
        this.relationships.rootNode.children[0].attributes[1].value,
        this.message
      ).equal("type");

      this.message = `
              Adds a relationship node to root with Target.
              Actual Result: ${this.relationships.rootNode.children[0].attributes[2].name}
              Expected Result: Target
              `;
      expect(
        this.relationships.rootNode.children[0].attributes[2].name,
        this.message
      ).equal("Target");

      this.message = `
              Adds a relationship node to root with target value.
              Actual Result: ${this.relationships.rootNode.children[0].attributes[2].value}
              Expected Result: target
              `;
      expect(
        this.relationships.rootNode.children[0].attributes[2].value,
        this.message
      ).equal("target");

      this.message = `
              Returns Id value.
              Actual Result: ${this.result}
              Expected Result: rId3
              `;
      expect(this.result, this.message).equal("rId3");
    });

    it("adds a relationship node to root node without id", function() {
      // ARRANGE,
      this.relationships = new Relationships();

      // ACT
      this.result = this.relationships.addRelationship("target", "type");

      // ASSERT
      this.message = `
                Adds a relationship node to root.
                Actual Result: ${this.relationships.rootNode.children[0].name}
                Expected Result: Relationship
                `;
      expect(this.relationships.rootNode.children[0].name, this.message).equal(
        "Relationship"
      );

      this.message = `
                Adds a relationship node to root with Id.
                Actual Result: ${this.relationships.rootNode.children[0].attributes[0].name}
                Expected Result: Id
                `;
      expect(
        this.relationships.rootNode.children[0].attributes[0].name,
        this.message
      ).equal("Id");

      this.message = `
                Adds a relationship node to root with rId1 value.
                Actual Result: ${this.relationships.rootNode.children[0].attributes[0].value}
                Expected Result: rId1
                `;
      expect(
        this.relationships.rootNode.children[0].attributes[0].value,
        this.message
      ).equal("rId1");

      this.message = `
                Adds a relationship node to root with Type.
                Actual Result: ${this.relationships.rootNode.children[0].attributes[1].name}
                Expected Result: Type
                `;
      expect(
        this.relationships.rootNode.children[0].attributes[1].name,
        this.message
      ).equal("Type");

      this.message = `
                Adds a relationship node to root with Type value.
                Actual Result: ${this.relationships.rootNode.children[0].attributes[1].value}
                Expected Result: type
                `;
      expect(
        this.relationships.rootNode.children[0].attributes[1].value,
        this.message
      ).equal("type");

      this.message = `
                Adds a relationship node to root with Target.
                Actual Result: ${this.relationships.rootNode.children[0].attributes[2].name}
                Expected Result: Target
                `;
      expect(
        this.relationships.rootNode.children[0].attributes[2].name,
        this.message
      ).equal("Target");

      this.message = `
                Adds a relationship node to root with target value.
                Actual Result: ${this.relationships.rootNode.children[0].attributes[2].value}
                Expected Result: target
                `;
      expect(
        this.relationships.rootNode.children[0].attributes[2].value,
        this.message
      ).equal("target");

      this.message = `
                Returns Id value.
                Actual Result: ${this.result}
                Expected Result: rId1
                `;
      expect(this.result, this.message).equal("rId1");
    });

    it("adds multiple relationships", function() {
      // ARRANGE,
      this.relationships = new Relationships();

      // ACT
      this.result1 = this.relationships.addRelationship("target", "type");
      this.result2 = this.relationships.addRelationship("target", "type", 2);
      this.result3 = this.relationships.addRelationship("target", "type");
      this.result4 = this.relationships.addRelationship("target", "type");
      this.result5 = this.relationships.addRelationship("target", "type", 5);

      // ASSERT
      this.message = `
                  Adds a relationship node to root with target value.
                  Actual Result: ${this.relationships.rootNode.children[0].attributes[2].value}
                  Expected Result: target
                  `;
      expect(
        this.relationships.rootNode.children[0].attributes[2].value,
        this.message
      ).equal("target");

      this.message = `
                  Returns Id value.
                  Actual Result: ${this.result1}
                  Expected Result: rId1
                  `;
      expect(this.result, this.message).equal("rId1");

      this.message = `
                  Adds a relationship node to root with target value.
                  Actual Result: ${this.relationships.rootNode.children[1].attributes[2].value}
                  Expected Result: target
                  `;
      expect(
        this.relationships.rootNode.children[1].attributes[2].value,
        this.message
      ).equal("target");

      this.message = `
                  Returns Id value.
                  Actual Result: ${this.result2}
                  Expected Result: rId2
                  `;
      expect(this.result2, this.message).equal("rId2");

      this.message = `
                  Adds a relationship node to root with target value.
                  Actual Result: ${this.relationships.rootNode.children[2].attributes[2].value}
                  Expected Result: target
                  `;
      expect(
        this.relationships.rootNode.children[2].attributes[2].value,
        this.message
      ).equal("target");

      this.message = `
                  Returns Id value.
                  Actual Result: ${this.result3}
                  Expected Result: rId3
                  `;
      expect(this.result3, this.message).equal("rId3");

      this.message = `
                  Adds a relationship node to root with target value.
                  Actual Result: ${this.relationships.rootNode.children[3].attributes[2].value}
                  Expected Result: target
                  `;
      expect(
        this.relationships.rootNode.children[3].attributes[2].value,
        this.message
      ).equal("target");

      this.message = `
                  Returns Id value.
                  Actual Result: ${this.result4}
                  Expected Result: rId4
                  `;
      expect(this.result4, this.message).equal("rId4");

      this.message = `
                  Adds a relationship node to root with target value.
                  Actual Result: ${this.relationships.rootNode.children[4].attributes[2].value}
                  Expected Result: target
                  `;
      expect(
        this.relationships.rootNode.children[4].attributes[2].value,
        this.message
      ).equal("target");

      this.message = `
                  Returns Id value.
                  Actual Result: ${this.result1}
                  Expected Result: rId5
                  `;
      expect(this.result5, this.message).equal("rId5");
    });
  });

  describe("load", function() {
    this.beforeEach(function() {
      this.file = new FileAdapter();
      this.file.fileContent = `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
      <Relationship Target="docProps/app.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Id="rId3"/>      
      <Relationship Target="docProps/core.xml" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Id="rId2"/>      
      <Relationship Target="xl/workbook.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Id="rId1"/>      
      </Relationships>`;
      this.parserStub = sinon.stub(XmlParser, "parse");
    });

    this.afterEach(function() {
      this.parserStub.restore();
    });

    it("Returns a Promise", function() {
      // ACT
      this.result = Relationships.load(this.content, ".rels");

      // ASSERT
      this.message = `
      Expect Promise.
      Actual Result: ${this.result instanceof Promise}
      Expected Result: true
      `;
      expect(this.result instanceof Promise, this.message).equal(true);
    });

    it("Promise resolves Relationships", function(done) {
      // ARRANGE
      let self = this;

      // ACT
      let relationships = Relationships.load(this.content, ".rels");
      // ASSERT
      self.message = `
      Should resolves Relationships.
      Actual Result: ${relationships instanceof Promise}
      Expected Result: true
      `;
      expect(relationships instanceof Promise, self.message).equal(true);
      done();
    });

    it("Calls Parser method", function(done) {
      // ARRANGE
      let self = this;

      // ACT
      Relationships.load(this.file, ".rels");
      // ASSERT
      self.message = `
      Should have called XmlParser.parse.
      `;
      sinon.assert.called(self.parserStub);
      done();
    });

    it("Parse file name and folder", function(done) {
      // ARRANGE
      let self = this;

      // ACT
      Relationships.load(this.file, ".rels", "xl/_rels").then(
        relationships => {
          // ASSERT
          self.message = `
        Should have set filename
        Actual Value: ${relationships.fileName}
        Expected Value: .rels
        `;
          expect(relationships.fileName, self.message).equal(".rels");

          self.message = `
        Should have set filename
        Actual Value: ${relationships.filePath}
        Expected Value: xl/_rels
        `;
          expect(relationships.filePath, self.message).equal("xl/_rels");
          done();
        }
      );
    });
  });
});
