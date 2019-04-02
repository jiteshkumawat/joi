import { XmlAttribute } from "../xmlAttribute";
import { expect } from "chai";

describe("xml Attribute", function() {
  describe("initialize", function() {
    it("define default value", function() {
      // ARRANGE, ACT
      this.attribute = new XmlAttribute("test");

      // ASSERT
      this.message = `
      Default value should be empty string.
      Actual Result: ${this.attribute.Value}
      `;
      expect(this.attribute.Value, this.message).equal("");
    });

    it("define value from constructor", function() {
      // ARRANGE, ACT
      this.attribute = new XmlAttribute("test", "value");

      // ASSERT
      this.message = `
      Default value should be value.
      Actual Result: ${this.attribute.Value}
      Expected Result: value
      `;
      expect(this.attribute.Value, this.message).equal("value");

      this.message = `
      Default value should be name.
      Actual Result: ${this.attribute.Name}
      Expected Result: test
      `;
      expect(this.attribute.Name, this.message).equal("test");
    });
  });

  describe("toString method", function() {
    it("valid string for empty values", function() {
      // ARRANGE
      this.attribute = new XmlAttribute("test");

      // ACT
      this.result = this.attribute.toString();

      // ASSERT
      this.message = `
      Result should be name="".
      Actual Result: ${this.result}
      Expected Result: test=""
      `;
      expect(this.result, this.message).equal('test=""');
    });

    it("valid string for defined values", function() {
      // ARRANGE
      this.attribute = new XmlAttribute("test", "value");

      // ACT
      this.result = this.attribute.toString();

      // ASSERT
      this.message = `
      Result should be name="value".
      Actual Result: ${this.result}
      Expected Result: test="value"
      `;
      expect(
        this.result,
        'Result should be name="value" but it is ' + this.result
      ).equal('test="value"');
    });
  });
});
