import { Node } from "../../../entities/base/node";
import { expect } from "chai";
import { Attribute } from "../../../entities/base/attribute";

describe("xml root node", function() {
  describe("initialize", function() {
    it("define default values", function() {
      // ARRANGE, ACT
      this.xmlNode = new Node("test");

      // ASSERT
      this.message = `
      Define name of node
      Actual Value: ${this.xmlNode.name}
      Expected Value: test
      `;
      expect(this.xmlNode.name, this.message).equal("test");

      this.message = `
      Define namespaces of node
      Actual Value: ${typeof this.xmlNode.namespaces === "object"}
      Expected Value: true
      `;
      expect(typeof this.xmlNode.namespaces === "object", this.message).equal(
        true
      );

      this.message = `
      Define attributes of node
      Actual Value: ${this.xmlNode.attributes.length}
      Expected Value: 0
      `;
      expect(this.xmlNode.attributes.length, this.message).equal(0);
    });

    it("define values from constructor", function() {
      // ARRANGE, ACT
      this.attributes = [new Attribute("attr")];
      this.namespace = "namespace";
      this.xmlNode = new Node(
        "test",
        this.attributes,
        true,
        "",
        this.namespace
      );
      // ASSERT
      this.message = `
        Define name of node
        Actual Value: ${this.xmlNode.name}
        Expected Value: test
        `;
      expect(this.xmlNode.name, this.message).equal("test");

      this.message = `
        Define namespaces value of node
        Actual Value: ${this.xmlNode.namespaces["namespace"]}
        Expected Value: ''
        `;
      expect(this.xmlNode.namespaces["namespace"], this.message).equal("");

      this.message = `
        Define attributes of node
        Actual Value: ${JSON.stringify(this.xmlNode.attributes, null, 2)}
        Expected Value: ${JSON.stringify(this.attributes, null, 0)}
        `;
      expect(this.xmlNode.attributes, this.message).equal(this.attributes);
    });
  });

  describe("addNamespace method", function() {
    it("adds default namespace", function() {
      // ARRANGE
      this.xmlNode = new Node("test");

      // ACT
      this.xmlNode.addNamespace("namespace");

      // ASSERT
      this.message = `
        Define namespace value of node
        Actual Value: ${this.xmlNode.namespaces["namespace"]}
        Expected Value: ''
        `;
    });

    it("adds namespace with abreviation", function() {
      // ARRANGE
      this.xmlNode = new Node("test");

      // ACT
      this.xmlNode.addNamespace("namespace", "r");

      // ASSERT
      this.message = `
          Define namespace value of node
          Actual Value: ${this.xmlNode.namespaces["namespace"]}
          Expected Value: namespace
          `;
      expect(this.xmlNode.namespaces["namespace"], this.message).equal("r");
    });
  });

  describe("toString method", function() {
    it("stringify default root node", function() {
      // ARRANGE
      this.xmlNode = new Node("test");

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
      this.xmlNode = new Node("test", [], true, "", "namespace");

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
      this.xmlNode = new Node("test");
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
      this.xmlNode = new Node("test", [], true, "", "namespace2");
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
      this.xmlNode = new Node("test", [new Attribute("attribute", "value")]);

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
      this.xmlNode = new Node("test", [
        new Attribute("attribute1", "value1"),
        new Attribute("attribute2", "value2")
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
      this.xmlNode = new Node("test");
      this.childNode = new Node("child");
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
      this.xmlNode = new Node("test");
      this.childNode1 = new Node("child1");
      this.childNode2 = new Node("child2");
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
      this.xmlNode = new Node(
        "test",
        [new Attribute("attr1", "val1"), new Attribute("attr2", "val2")],
        true,
        "",
        "namespace"
      );
      this.childNode1 = new Node("child1");
      this.childNode2 = new Node("child2", [new Attribute("attr3", "val3")]);
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
