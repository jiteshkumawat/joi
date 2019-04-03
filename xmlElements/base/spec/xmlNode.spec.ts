import { XmlNode } from "../xmlNode";
import { expect } from "chai";
import { XmlAttribute } from "../xmlAttribute";

describe("Xml Node", function() {
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
      expect(this.xmlNode.Name, this.message).equal("test");

      this.message = `
      Default value / length of attributes should be defined.
      Actual Result: ${this.xmlNode.Attributes.length}
      Expected Result: 0
      `;
      expect(this.xmlNode.Attributes.length, this.message).equal(0);

      this.message = `
      Default value / length of child nodes should be defined.
      Actual Result: ${this.xmlNode.Children.length}
      Expected Result: 0
      `;
      expect(this.xmlNode.Children.length, this.message).equal(0);
    });

    it("define attributes from parameter", function() {
      // ARRANGE
      this.attributes = [new XmlAttribute("test")];

      // ACT
      this.xmlNode = new XmlNode("test", this.attributes);

      // ASSERT
      this.message = `
      Default attribute from constructor.
      Actual Result: ${JSON.stringify(this.xmlNode.Attributes[0], null, 2)}
      Expected Result: ${JSON.stringify(this.attributes[0], null, 2)}
      `;
      expect(this.xmlNode.Attributes[0], this.message).equal(
        this.attributes[0]
      );
    });
  });
  describe("addAttribute method", function() {
    it("Adds an attribute to attributes collection", function() {
      // ARRANGE
      this.xmlNode = new XmlNode("test");
      this.attribute = new XmlAttribute("test");

      // ACT
      this.xmlNode.addAttribute(this.attribute);

      // ASSERT
      this.message = `
      Add attribute to Attributes collection.
      Actual Result: ${JSON.stringify(this.xmlNode.Attributes[0], null, 2)}
      Expected Result: ${JSON.stringify(this.attribute, null, 2)}
      `;
      expect(this.xmlNode.Attributes[0]).equal(this.attribute);
    });

    it("Returns attribute added to attributes collection", function() {
      // ARRANGE
      this.xmlNode = new XmlNode("test");
      this.attribute = new XmlAttribute("test");

      // ACT
      this.result = this.xmlNode.addAttribute(this.attribute);

      // ASSERT
      this.message = `
      Return attribute added to Attributes collection.
      Actual Result: ${JSON.stringify(this.result, null, 2)}
      Expected Result: ${JSON.stringify(this.attribute, null, 2)}
      `;
      expect(this.result).equal(this.attribute);
    });
  });

  describe("addChild method", function() {
    it("Adds a child to child nodes collection", function() {
      // ARRANGE
      this.xmlNode = new XmlNode("test");
      this.childNode = new XmlNode("child");

      // ACT
      this.xmlNode.addChild(this.childNode);

      // ASSERT
      this.message = `
      Add child to child nodes collection.
      Actual Result: ${JSON.stringify(this.xmlNode.Children[0], null, 2)}
      Expected Result: ${JSON.stringify(this.childNode, null, 2)}
      `;
      expect(this.xmlNode.Children[0]).equal(this.childNode);
    });

    it("Returns child node added to child nodes collection", function() {
      // ARRANGE
      this.xmlNode = new XmlNode("test");
      this.childNode = new XmlNode("child");

      // ACT
      this.result = this.xmlNode.addChild(this.childNode);

      // ASSERT
      this.message = `
      Return child added to child nodes collection.
      Actual Result: ${JSON.stringify(this.result, null, 2)}
      Expected Result: ${JSON.stringify(this.childNode, null, 2)}
      `;
      expect(this.result).equal(this.childNode);
    });
  });

  describe("toString method", function() {
    it("return stringify result of node", function() {
      // ARRANGE
      this.xmlNode = new XmlNode("test");

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
      Return stringify xml node
      Actual Result: ${this.result}
      Expected Result: <test/>
      `;
      expect(this.result).equal("<test/>");
    });

    it("return stringify result with an attribute of node", function() {
      // ARRANGE
      this.xmlNode = new XmlNode("test", [
        new XmlAttribute("attribute", "value")
      ]);

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
      Return stringify xml node with as attribute
      Actual Result: ${this.result}
      Expected Result: <test attribute="value"/>
      `;
      expect(this.result).equal('<test attribute="value"/>');
    });

    it("return stringify result with attributes of node", function() {
      // ARRANGE
      this.xmlNode = new XmlNode("test", [
        new XmlAttribute("attribute1", "value1"),
        new XmlAttribute("attribute2", "value2")
      ]);

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
      Return stringify xml node with attributes
      Actual Result: ${this.result}
      Expected Result: <test attribute1="value1", attribute2="value2"/>
      `;
      expect(this.result).equal(
        '<test attribute1="value1" attribute2="value2"/>'
      );
    });

    it("return stringify result with a child node", function() {
      // ARRANGE
      this.xmlNode = new XmlNode("test");
      this.childNode = new XmlNode("child");
      this.xmlNode.addChild(this.childNode);

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
      Return stringify xml node with a child
      Actual Result: ${this.result}
      Expected Result: <test><child/></test>
      `;
      expect(this.result).equal('<test><child/></test>');
    });

    it("return stringify result with child nodes", function() {
      // ARRANGE
      this.xmlNode = new XmlNode("test");
      this.childNode1 = new XmlNode("child1");
      this.childNode2 = new XmlNode("child2");
      this.xmlNode.addChild(this.childNode1);
      this.xmlNode.addChild(this.childNode2);

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
      Return stringify xml node with child nodes
      Actual Result: ${this.result}
      Expected Result: <test><child1/><child2/></test>
      `;
      expect(this.result).equal('<test><child1/><child2/></test>');
    });

    it("return stringify result with child nodes and attributes", function() {
      // ARRANGE
      this.xmlNode = new XmlNode("test", [new XmlAttribute("attr1", "val1"), new XmlAttribute("attr2", "val2")]);
      this.childNode1 = new XmlNode("child1");
      this.childNode2 = new XmlNode("child2", [new XmlAttribute("attr3", "val3")]);
      this.xmlNode.addChild(this.childNode1);
      this.xmlNode.addChild(this.childNode2);

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
      Return stringify xml node with child nodes and attributes
      Actual Result: ${this.result}
      Expected Result: <test attr1="val1" attr2="val2"><child1/><child2 attr3="val3"/></test>
      `;
      expect(this.result).equal('<test attr1="val1" attr2="val2"><child1/><child2 attr3="val3"/></test>');
    });
  });
});
