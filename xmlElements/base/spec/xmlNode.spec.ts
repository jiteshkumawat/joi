import { XmlNode } from "../xmlNode";
import { expect } from "chai";

describe("xmlNode", function() {
  describe("initialize", function() {
    it("define default values", function() {
      // ARRANGE, ACT
      this.xmlNode = new XmlNode("test");

      // ASSERT
      this.message = `
      Default value of name should be defined.
      Actual Result: ${this.xmlNode.Name}
      Expected Result: test
      `;
      expect(this.xmlNode.Name).equal("test");

      this.message = `
      Default value / length of attributes should be defined.
      Actual Result: ${this.xmlNode.Attributes.length}
      Expected Result: 0
      `;
      expect(this.xmlNode.Attributes.length).equal(0);

      
      this.message = `
      Default value / length of child nodes should be defined.
      Actual Result: ${this.xmlNode.ChildNodes.length}
      Expected Result: 0
      `;
      expect(this.xmlNode.ChildNodes.length).equal(0);
    });
  });
});
