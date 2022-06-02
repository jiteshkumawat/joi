import { DocumentationNode } from "../../../entities/base/documentationNode";
import { expect } from "chai";

describe("documentation node", function() {
  describe("initialize", function() {
    it("define default properties", function() {
      // ARRANGE, ACT
      this.documentationNode = new DocumentationNode();

      // ASSERT
      this.message = `
      Default value of version be 1.0.
      Actual Result: ${this.documentationNode.version}
      Expected Result: 1.0
      `;
      expect(this.documentationNode.version, this.message).equal("1.0");

      this.message = `
      Default value of encoding.
      Actual Result: ${this.documentationNode.encoding}
      Expected Result: UTF-8
      `;
      expect(this.documentationNode.encoding, this.message).equal("UTF-8");

      this.message = `
      Default value of standalone.
      Actual Result: ${this.documentationNode.standalone}
      Expected Result: true
      `;
      expect(this.documentationNode.standalone, this.message).equal(true);
    });

    it("define properties from constructor", function() {
      // ARRANGE, ACT
      this.documentationNode = new DocumentationNode("2.0", "UTF-16", false);

      // ASSERT
      this.message = `
        Default value of version be 2.0.
        Actual Result: ${this.documentationNode.version}
        Expected Result: 2.0
        `;
      expect(this.documentationNode.version, this.message).equal("2.0");

      this.message = `
        Default value of encoding.
        Actual Result: ${this.documentationNode.encoding}
        Expected Result: UTF-16
        `;
      expect(this.documentationNode.encoding, this.message).equal("UTF-16");

      this.message = `
        Default value of standalone.
        Actual Result: ${this.documentationNode.standalone}
        Expected Result: false
        `;
      expect(this.documentationNode.standalone, this.message).equal(false);
    });
  });

  describe("toString method", function() {
    it("stringify default documentation node", function() {
      // ARRANGE
      this.documentationNode = new DocumentationNode();

      // ACT
      this.result = this.documentationNode.toString();

      // ASSERT
      this.message = `
      Returns strigify content of default documentation node
      Actual Result: ${this.result}
      Expected Result: <?xml version="1.0" encoding="UTF-8" standalone="yes"?>\\n
      `;
      expect(this.result).equal(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
      );
    });

    it("stringify documentation node", function() {
        // ARRANGE
        this.documentationNode = new DocumentationNode("2.0", "UTF-16", false);
  
        // ACT
        this.result = this.documentationNode.toString();
  
        // ASSERT
        this.message = `
        Returns strigify content of documentation node
        Actual Result: ${this.result}
        Expected Result: <?xml version="2.0" encoding="UTF-16" standalone="no"?>\\n
        `;
        expect(this.result).equal(
          '<?xml version="2.0" encoding="UTF-16" standalone="no"?>\n'
        );
      });
  });
});
