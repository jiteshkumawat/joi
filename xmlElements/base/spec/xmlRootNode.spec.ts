import { XmlRootNode } from "../xmlRootNode";
import { expect } from "chai";
import { XmlAttribute } from "../xmlAttribute";

describe("xml root node", function() {
  describe("initialize", function() {
    it("define default values", function() {
      // ARRANGE, ACT
      this.xmlNode = new XmlRootNode("test");

      // ASSERT
      this.message = `
      Define name of node
      Actual Value: ${this.xmlNode.Name}
      Expected Value: test
      `;
      expect(this.xmlNode.Name, this.message).equal("test");

      this.message = `
      Define namespaces of node
      Actual Value: ${this.xmlNode.Namespaces.length}
      Expected Value: 0
      `;
      expect(this.xmlNode.Namespaces.length, this.message).equal(0);

      this.message = `
      Define attributes of node
      Actual Value: ${this.xmlNode.Attributes.length}
      Expected Value: 0
      `;
      expect(this.xmlNode.Attributes.length, this.message).equal(0);
    });

    it("define values from constructor", function() {
      // ARRANGE, ACT
      this.attributes = [new XmlAttribute("attr")];
      this.namespace = "namespace";
      this.xmlNode = new XmlRootNode("test", this.namespace, this.attributes);

      // ASSERT
      this.message = `
        Define name of node
        Actual Value: ${this.xmlNode.Name}
        Expected Value: test
        `;
      expect(this.xmlNode.Name, this.message).equal("test");

      this.message = `
        Define namespaces value of node
        Actual Value: ${this.xmlNode.Namespaces[0].Value}
        Expected Value: namespace
        `;
      expect(this.xmlNode.Namespaces[0].Value, this.message).equal("namespace");

      this.message = `
        Define namespaces name of node
        Actual Value: ${this.xmlNode.Namespaces[0].Name}
        Expected Value: xmlns
        `;
      expect(this.xmlNode.Namespaces[0].Name, this.message).equal("xmlns");

      this.message = `
        Define attributes of node
        Actual Value: ${JSON.stringify(this.xmlNode.Attributes, null, 2)}
        Expected Value: ${JSON.stringify(this.attributes, null, 0)}
        `;
      expect(this.xmlNode.Attributes, this.message).equal(this.attributes);
    });
  });

  describe("addNamespace method", function() {
    it("adds default namespace", function() {
      // ARRANGE
      this.xmlNode = new XmlRootNode("test");

      // ACT
      this.xmlNode.addNamespace("namespace");

      // ASSERT
      this.message = `
        Define namespace value of node
        Actual Value: ${this.xmlNode.Namespaces[0].Value}
        Expected Value: namespace
        `;
      expect(this.xmlNode.Namespaces[0].Value, this.message).equal("namespace");
      this.message = `
        Define namespace name of node
        Actual Value: ${this.xmlNode.Namespaces[0].Name}
        Expected Value: xmlns
        `;
      expect(this.xmlNode.Namespaces[0].Name, this.message).equal("xmlns");
    });

    it("adds namespace with abreviation", function() {
      // ARRANGE
      this.xmlNode = new XmlRootNode("test");

      // ACT
      this.xmlNode.addNamespace("namespace", "r");

      // ASSERT
      this.message = `
          Define namespace value of node
          Actual Value: ${this.xmlNode.Namespaces[0].Value}
          Expected Value: namespace
          `;
      expect(this.xmlNode.Namespaces[0].Value, this.message).equal("namespace");
      this.message = `
          Define namespace name of node
          Actual Value: ${this.xmlNode.Namespaces[0].Name}
          Expected Value: xmlns:r
          `;
      expect(this.xmlNode.Namespaces[0].Name, this.message).equal("xmlns:r");
    });
  });

  describe("toString method", function() {
    it("stringify default root node", function() {
      // ARRANGE
      this.xmlNode = new XmlRootNode("test");

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
      Stringify default root node
      Actual Result: ${this.result}
      Expected Result: <test/>
      `;
      expect(this.result).equal("<test/>");
    });

    it("stringify root node with namespace", function() {
      // ARRANGE
      this.xmlNode = new XmlRootNode("test", "namespace");

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
        Stringify root node with abreviation
        Actual Result: ${this.result}
        Expected Result: <test xmlns="namespace"/>
        `;
      expect(this.result).equal('<test xmlns="namespace"/>');
    });

    it("stringify root node with namespace - abreviation", function() {
      // ARRANGE
      this.xmlNode = new XmlRootNode("test");
      this.xmlNode.addNamespace("namespace", "r");

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
          Stringify root node with namespace - abreviation
          Actual Result: ${this.result}
          Expected Result: <test xmlns:r="namespace"/>
          `;
      expect(this.result).equal('<test xmlns:r="namespace"/>');
    });

    it("stringify root node with multiple namespace", function() {
      // ARRANGE
      this.xmlNode = new XmlRootNode("test", "namespace2");
      this.xmlNode.addNamespace("namespace1", "r");

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
            Stringify root node with multiple namespace
            Actual Result: ${this.result}
            Expected Result: <test xmlns="namespace2" xmlns:r="namespace1"/>
            `;
      expect(this.result).equal(
        '<test xmlns="namespace2" xmlns:r="namespace1"/>'
      );
    });

    it("return stringify result with an attribute of node", function() {
      // ARRANGE
      this.xmlNode = new XmlRootNode("test", null, [
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
      this.xmlNode = new XmlRootNode("test", null, [
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
      this.xmlNode = new XmlRootNode("test");
      this.childNode = new XmlRootNode("child");
      this.xmlNode.addChild(this.childNode);

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
        Return stringify xml node with a child
        Actual Result: ${this.result}
        Expected Result: <test><child/></test>
        `;
      expect(this.result).equal("<test><child/></test>");
    });

    it("return stringify result with child nodes", function() {
      // ARRANGE
      this.xmlNode = new XmlRootNode("test");
      this.childNode1 = new XmlRootNode("child1");
      this.childNode2 = new XmlRootNode("child2");
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
      expect(this.result).equal("<test><child1/><child2/></test>");
    });

    it("return stringify result with child nodes and attributes", function() {
      // ARRANGE
      this.xmlNode = new XmlRootNode("test", "namespace", [
        new XmlAttribute("attr1", "val1"),
        new XmlAttribute("attr2", "val2")
      ]);
      this.childNode1 = new XmlRootNode("child1");
      this.childNode2 = new XmlRootNode("child2", null, [
        new XmlAttribute("attr3", "val3")
      ]);
      this.xmlNode.addChild(this.childNode1);
      this.xmlNode.addChild(this.childNode2);

      // ACT
      this.result = this.xmlNode.toString();

      // ASSERT
      this.message = `
        Return stringify xml node with child nodes and attributes
        Actual Result: ${this.result}
        Expected Result: <test xmlns="namespace" attr1="val1" attr2="val2"><child1/><child2 attr3="val3"/></test>
        `;
      expect(this.result).equal(
        '<test xmlns="namespace" attr1="val1" attr2="val2"><child1/><child2 attr3="val3"/></test>'
      );
    });
  });
});
