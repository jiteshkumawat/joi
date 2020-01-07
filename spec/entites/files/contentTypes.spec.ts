import { ContentTypes } from "../../../entities/files/contentTypes";
import { expect } from "chai";
import * as sinon from "sinon";
import { XmlParser } from "../../../util/parser";
import { Xml } from "../../../entities/base/xml";
import { FileAdapter } from "../../../util/fileHandler";
import { EventBus } from "../../../util/eventBus";

describe("Content Types", function() {

  this.beforeEach(function(){
    this.eventBus = new EventBus();
  });

  describe("initialize", function() {
    it("define default values", function() {
      // ARRANGE, ACT
      this.contentTypes = new ContentTypes(this.eventBus);

      // ASSERT
      this.message = `
      Namespace should be defined.
      Actual Result: ${this.contentTypes.rootNode.namespaces["http://schemas.openxmlformats.org/package/2006/content-types"]}
      Expected Result: ''
      `;
      expect(
        this.contentTypes.rootNode.namespaces["http://schemas.openxmlformats.org/package/2006/content-types"],
        this.message
      ).equal("");

      // ASSERT
      this.message = `
      Name should be defined.
      Actual Result: ${this.contentTypes.rootNode.name}
      Expected Result: Types
      `;
      expect(this.contentTypes.rootNode.name, this.message).equal("Types");

      // ASSERT
      this.message = `
      FileName should be defined.
      Actual Result: ${this.contentTypes.fileName}
      Expected Result: [Content_Types].xml
      `;
      expect(this.contentTypes.fileName, this.message).equal(
        "[Content_Types].xml"
      );

      this.message = `
      Initialized default.
      Actual Result: ${!!this.contentTypes.defaults}
      Expected Result: true
      `;
      expect(!!this.contentTypes.defaults, this.message).equal(true);

      this.message = `
      Initialized overrides.
      Actual Result: ${!!this.contentTypes.overrides}
      Expected Result: true
      `;
      expect(!!this.contentTypes.overrides, this.message).equal(true);
    });
  });

  describe("addDefault", function() {
    it("adds first node Default to root node", function() {
      // ARRANGE
      this.contentTypes = new ContentTypes(this.eventBus);

      // ACT
      this.contentTypes.addDefault("contentType", "extension");

      // ASSERT
      this.message = `
        Adds new node Default.
        Actual Result: ${this.contentTypes.rootNode.children[0].name}
        Expected Result: Default
        `;
      expect(this.contentTypes.rootNode.children[0].name, this.message).equal(
        "Default"
      );

      this.message = `
        Adds new ContentType attribute to new Default node.
        Actual Result: ${this.contentTypes.rootNode.children[0].attributes[0].name}
        Expected Result: ContentType
        `;
      expect(
        this.contentTypes.rootNode.children[0].attributes[0].name,
        this.message
      ).equal("ContentType");

      this.message = `
        Define value of new ContentType attribute to new Default node.
        Actual Result: ${this.contentTypes.rootNode.children[0].attributes[0].value}
        Expected Result: contentType
        `;
      expect(
        this.contentTypes.rootNode.children[0].attributes[0].value,
        this.message
      ).equal("contentType");

      this.message = `
        Adds new Extension attribute to new Default node.
        Actual Result: ${this.contentTypes.rootNode.children[0].attributes[1].name}
        Expected Result: Extension
        `;
      expect(
        this.contentTypes.rootNode.children[0].attributes[1].name,
        this.message
      ).equal("Extension");

      this.message = `
        Define value of new Extension attribute to new Default node.
        Actual Result: ${this.contentTypes.rootNode.children[0].attributes[1].value}
        Expected Result: extension
        `;
      expect(
        this.contentTypes.rootNode.children[0].attributes[1].value,
        this.message
      ).equal("extension");

      this.message = `
        Define value in defaults
        Actual Result: ${this.contentTypes.defaults["contentType"]}
        Expected Result: extension
        `;
      expect(this.contentTypes.defaults["contentType"], this.message).equal(
        "extension"
      );
    });

    it("adds new node Default to root node", function() {
      // ARRANGE
      this.contentTypes = new ContentTypes(this.eventBus);
      this.contentTypes.addDefault("dummy", "dummy");

      // ACT
      this.contentTypes.addDefault("contentType", "extension");

      // ASSERT
      this.message = `
        Adds new node Default.
        Actual Result: ${this.contentTypes.rootNode.children[1].name}
        Expected Result: Default
        `;
      expect(this.contentTypes.rootNode.children[1].name, this.message).equal(
        "Default"
      );

      this.message = `
        Adds new ContentType attribute to new Default node.
        Actual Result: ${this.contentTypes.rootNode.children[1].attributes[0].name}
        Expected Result: ContentType
        `;
      expect(
        this.contentTypes.rootNode.children[1].attributes[0].name,
        this.message
      ).equal("ContentType");

      this.message = `
        Define value of new ContentType attribute to new Default node.
        Actual Result: ${this.contentTypes.rootNode.children[1].attributes[0].value}
        Expected Result: contentType
        `;
      expect(
        this.contentTypes.rootNode.children[1].attributes[0].value,
        this.message
      ).equal("contentType");

      this.message = `
        Adds new Extension attribute to new Default node.
        Actual Result: ${this.contentTypes.rootNode.children[1].attributes[1].name}
        Expected Result: Extension
        `;
      expect(
        this.contentTypes.rootNode.children[1].attributes[1].name,
        this.message
      ).equal("Extension");

      this.message = `
        Define value of new Extension attribute to new Default node.
        Actual Result: ${this.contentTypes.rootNode.children[1].attributes[1].value}
        Expected Result: extension
        `;
      expect(
        this.contentTypes.rootNode.children[1].attributes[1].value,
        this.message
      ).equal("extension");

      this.message = `
        Define value in defaults
        Actual Result: ${this.contentTypes.defaults["contentType"]}
        Expected Result: extension
        `;
      expect(this.contentTypes.defaults["contentType"], this.message).equal(
        "extension"
      );
    });
  });

  describe("addOverride", function() {
    it("adds first node Override to root node", function() {
      // ARRANGE
      this.contentTypes = new ContentTypes(this.eventBus);

      // ACT
      this.contentTypes.addOverride("contentType", "partName");

      // ASSERT
      this.message = `
        Adds new node Override.
        Actual Result: ${this.contentTypes.rootNode.children[0].name}
        Expected Result: Override
        `;
      expect(this.contentTypes.rootNode.children[0].name, this.message).equal(
        "Override"
      );

      this.message = `
        Adds new ContentType attribute to new Override node.
        Actual Result: ${this.contentTypes.rootNode.children[0].attributes[0].name}
        Expected Result: ContentType
        `;
      expect(
        this.contentTypes.rootNode.children[0].attributes[0].name,
        this.message
      ).equal("ContentType");

      this.message = `
        Define value of new ContentType attribute to new Override node.
        Actual Result: ${this.contentTypes.rootNode.children[0].attributes[0].value}
        Expected Result: contentType
        `;
      expect(
        this.contentTypes.rootNode.children[0].attributes[0].value,
        this.message
      ).equal("contentType");

      this.message = `
        Adds new PartName attribute to new Override node.
        Actual Result: ${this.contentTypes.rootNode.children[0].attributes[1].name}
        Expected Result: PartName
        `;
      expect(
        this.contentTypes.rootNode.children[0].attributes[1].name,
        this.message
      ).equal("PartName");

      this.message = `
        Define value of new PartName attribute to new Override node.
        Actual Result: ${this.contentTypes.rootNode.children[0].attributes[1].value}
        Expected Result: partName
        `;
      expect(
        this.contentTypes.rootNode.children[0].attributes[1].value,
        this.message
      ).equal("partName");

      this.message = `
        Define value in overrides
        Actual Result: ${this.contentTypes.overrides["contentType"]}
        Expected Result: partName
        `;
      expect(this.contentTypes.overrides["contentType"], this.message).equal(
        "partName"
      );
    });

    it("adds new node Override to root node", function() {
      // ARRANGE
      this.contentTypes = new ContentTypes(this.eventBus);
      this.contentTypes.addOverride("dummy", "dummy");

      // ACT
      this.contentTypes.addOverride("contentType", "partName");

      // ASSERT
      this.message = `
        Adds new node Override.
        Actual Result: ${this.contentTypes.rootNode.children[1].name}
        Expected Result: Override
        `;
      expect(this.contentTypes.rootNode.children[1].name, this.message).equal(
        "Override"
      );

      this.message = `
        Adds new ContentType attribute to new Override node.
        Actual Result: ${this.contentTypes.rootNode.children[1].attributes[0].name}
        Expected Result: ContentType
        `;
      expect(
        this.contentTypes.rootNode.children[1].attributes[0].name,
        this.message
      ).equal("ContentType");

      this.message = `
        Define value of new ContentType attribute to new Override node.
        Actual Result: ${this.contentTypes.rootNode.children[1].attributes[0].value}
        Expected Result: contentType
        `;
      expect(
        this.contentTypes.rootNode.children[1].attributes[0].value,
        this.message
      ).equal("contentType");

      this.message = `
        Adds new PartName attribute to new Override node.
        Actual Result: ${this.contentTypes.rootNode.children[1].attributes[1].name}
        Expected Result: PartName
        `;
      expect(
        this.contentTypes.rootNode.children[1].attributes[1].name,
        this.message
      ).equal("PartName");

      this.message = `
        Define value of new PartName attribute to new Override node.
        Actual Result: ${this.contentTypes.rootNode.children[1].attributes[1].value}
        Expected Result: partName
        `;
      expect(
        this.contentTypes.rootNode.children[1].attributes[1].value,
        this.message
      ).equal("partName");

      this.message = `
        Define value in overrides
        Actual Result: ${this.contentTypes.overrides["contentType"]}
        Expected Result: partName
        `;
      expect(this.contentTypes.overrides["contentType"], this.message).equal(
        "partName"
      );
    });
  });

  describe("toString", function() {
    it("without any child node", function() {
      // ARRANGE
      this.contentTypes = new ContentTypes(this.eventBus);

      // ACT
      var result = this.contentTypes.toString();

      // ASSERT
      this.message = `
        Stringify wihtout any child node.
        Actual Result: ${result}
        Expected Result: <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"/>
        `;
      expect(result, this.message).contains(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      );
      expect(result, this.message).contains(
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"/>'
      );
    });

    it("with only default node", function() {
      // ARRANGE
      this.contentTypes = new ContentTypes(this.eventBus);

      // ACT
      this.contentTypes.addDefault("contentType1", "extension1");
      this.contentTypes.addDefault("contentType2", "extension2");
      this.contentTypes.addDefault("contentType3", "extension3");
      var result = this.contentTypes.toString();

      // ASSERT
      this.message = `
        Stringify with only default node.
        Actual Result: ${result}
        Expected Result: <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default ContentType="contentType1" Extension="extension1"/><Default ContentType="contentType2" Extension="extension2"/><Default ContentType="contentType3" Extension="extension3"/></Types>
        `;
      expect(result, this.message).contains(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      );
      expect(result, this.message).contains(
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default ContentType="contentType1" Extension="extension1"/><Default ContentType="contentType2" Extension="extension2"/><Default ContentType="contentType3" Extension="extension3"/></Types>'
      );
    });

    it("with default and override node", function() {
      // ARRANGE
      this.contentTypes = new ContentTypes(this.eventBus);

      // ACT
      this.contentTypes.addDefault("contentType1", "extension1");
      this.contentTypes.addDefault("contentType2", "extension2");
      this.contentTypes.addDefault("contentType3", "extension3");
      this.contentTypes.addOverride("contentType2", "partName");
      var result = this.contentTypes.toString();

      // ASSERT
      this.message = `
        Stringify with only default node.
        Actual Result: ${result}
        Expected Result: <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default ContentType="contentType1" Extension="extension1"/><Default ContentType="contentType2" Extension="extension2"/><Default ContentType="contentType3" Extension="extension3"/><Override ContentType="contentType2" PartName="partName"/></Types>
        `;
      expect(result, this.message).contains(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      );
      expect(result, this.message).contains(
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default ContentType="contentType1" Extension="extension1"/><Default ContentType="contentType2" Extension="extension2"/><Default ContentType="contentType3" Extension="extension3"/><Override ContentType="contentType2" PartName="partName"/></Types>'
      );
    });
  });

  describe("load", function() {
    this.beforeEach(function() {
      this.file = new FileAdapter();
      this.file.fileContent = `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
      <Default ContentType="application/vnd.openxmlformats-package.relationships+xml" Extension="rels"/>          
      <Default ContentType="application/xml" Extension="xml"/>          
      <Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" PartName="/xl/workbook.xml"/>          
      <Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" PartName="/xl/worksheets/sheet1.xml"/>          
      <Override ContentType="application/vnd.openxmlformats-officedocument.theme+xml" PartName="/xl/theme/theme1.xml"/>          
      <Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" PartName="/xl/styles.xml"/>          
      <Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml" PartName="/xl/sharedStrings.xml"/>          
      <Override ContentType="application/vnd.openxmlformats-package.core-properties+xml" PartName="/docProps/core.xml"/>          
      <Override ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml" PartName="/docProps/app.xml"/>          
      </Types>`;
    });

    it("Returns a Promise", function() {
      // ACT
      this.result = ContentTypes.load(this.file, this.eventBus);

      // ASSERT
      this.message = `
      Expect Promise.
      Actual Result: ${this.result instanceof Promise}
      Expected Result: true
      `;
      expect(this.result instanceof Promise, this.message).equal(true);
    });

    it("Promise resolves Content Types", function(done) {
      // ARRANGE
      let self = this;

      // ACT
      ContentTypes.load(this.file, this.eventBus).then(function(contentTypes) {
        // ASSERT
        self.message = `
      Should resolves Content Types.
      Actual Result: ${contentTypes instanceof ContentTypes}
      Expected Result: true
      `;
        expect(contentTypes instanceof ContentTypes, self.message).equal(true);
        done();
      });
    });

    it("Calls Parser method", function(done) {
      // ARRANGE
      let self = this;
      this.parserStub = sinon
        .stub(XmlParser, "parse")
        .returns(Promise.resolve(new Xml()));

      // ACT
      ContentTypes.load(this.file, this.eventBus).then(function(contentTypes) {
        // ASSERT
        self.message = `
      Should have called XmlParser.parse.
      `;
        sinon.assert.called(self.parserStub);
        self.parserStub.restore();
        done();
      });
    });

    it("Parse Content", function(done) {
      // ARRANGE
      let self = this;

      // ACT
      ContentTypes.load(this.file, this.eventBus).then(function(contentTypes) {
        // ASSERT
        self.message = `
       Should have root node Types.
       Actual value: ${contentTypes.rootNode.name}
       Expected value: Types
       `;
        expect(contentTypes.rootNode.name, self.message).equal("Types");

        self.message = `
       Should have rels node name.
       Actual value: ${contentTypes.rootNode.children[0].name}
       Expected value: Default
       `;
        expect(contentTypes.rootNode.children[0].name, self.message).equal(
          "Default"
        );

        self.message = `
        Should have default value
        Actual value: ${contentTypes.defaults["application/vnd.openxmlformats-package.relationships+xml"]}
        Expected value: rels
        `;
        expect(
          contentTypes.defaults[
            "application/vnd.openxmlformats-package.relationships+xml"
          ],
          self.message
        ).equal("rels");

        self.message = `
       Should have rels node content type.
       Actual value: ${
         contentTypes.rootNode.children[0].attribute("ContentType").value
       }
       Expected value: application/vnd.openxmlformats-package.relationships+xml
       `;
        expect(
          contentTypes.rootNode.children[0].attribute("ContentType").value,
          self.message
        ).equal("application/vnd.openxmlformats-package.relationships+xml");

        self.message = `
       Should have rels node extention.
       Actual value: ${
         contentTypes.rootNode.children[0].attribute("Extension").value
       }
       Expected value: rels
       `;
        expect(
          contentTypes.rootNode.children[0].attribute("Extension").value,
          self.message
        ).equal("rels");

        self.message = `
       Should have xml node name.
       Actual value: ${contentTypes.rootNode.children[1].name}
       Expected value: Default
       `;
        expect(contentTypes.rootNode.children[1].name, self.message).equal(
          "Default"
        );
        self.message = `
       Should have xml node content type.
       Actual value: ${
         contentTypes.rootNode.children[1].attribute("ContentType").value
       }
       Expected value: application/xml
       `;
        expect(
          contentTypes.rootNode.children[1].attribute("ContentType").value,
          self.message
        ).equal("application/xml");

        self.message = `
        Should have default value
        Actual value: ${contentTypes.defaults["application/xml"]}
        Expected value: rels
        `;
        expect(contentTypes.defaults["application/xml"], self.message).equal(
          "xml"
        );

        self.message = `
       Should have xml node extention.
       Actual value: ${
         contentTypes.rootNode.children[1].attribute("Extension").value
       }
       Expected value: xml
       `;
        expect(
          contentTypes.rootNode.children[1].attribute("Extension").value,
          self.message
        ).equal("xml");

        self.message = `
       Should have /xl/workbook.xml node name.
       Actual value: ${contentTypes.rootNode.children[2].name}
       Expected value: Override
       `;
        expect(contentTypes.rootNode.children[2].name, self.message).equal(
          "Override"
        );

        self.message = `
       Should have /xl/workbook.xml node content type.
       Actual value: ${
         contentTypes.rootNode.children[2].attribute("ContentType").value
       }
       Expected value: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml
       `;
        expect(
          contentTypes.rootNode.children[2].attribute("ContentType").value,
          self.message
        ).equal(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"
        );

        self.message = `
        Should have override value
        Actual value: ${contentTypes.overrides["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"]}
        Expected value: /xl/workbook.xml
        `;
        expect(
          contentTypes.overrides[
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"
          ],
          self.message
        ).equal("/xl/workbook.xml");

        self.message = `
       Should have /xl/workbook.xml node extention.
       Actual value: ${
         contentTypes.rootNode.children[2].attribute("PartName").value
       }
       Expected value: /xl/workbook.xml
       `;
        expect(
          contentTypes.rootNode.children[2].attribute("PartName").value,
          self.message
        ).equal("/xl/workbook.xml");

        self.message = `
       Should have /xl/worksheets/sheet1.xml node name.
       Actual value: ${contentTypes.rootNode.children[3].name}
       Expected value: Override
       `;
        expect(contentTypes.rootNode.children[3].name, self.message).equal(
          "Override"
        );
        self.message = `
       Should have /xl/worksheets/sheet1.xml node content type.
       Actual value: ${
         contentTypes.rootNode.children[3].attribute("ContentType").value
       }
       Expected value: application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml
       `;
        expect(
          contentTypes.rootNode.children[3].attribute("ContentType").value,
          self.message
        ).equal(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"
        );

        self.message = `
        Should have override value
        Actual value: ${contentTypes.overrides["application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"]}
        Expected value: /xl/worksheets/sheet1.xml
        `;
        expect(
          contentTypes.overrides[
            "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"
          ],
          self.message
        ).equal("/xl/worksheets/sheet1.xml");

        self.message = `
       Should have /xl/worksheets/sheet1.xml node extention.
       Actual value: ${
         contentTypes.rootNode.children[3].attribute("PartName").value
       }
       Expected value: /xl/worksheets/sheet1.xml
       `;
        expect(
          contentTypes.rootNode.children[3].attribute("PartName").value,
          self.message
        ).equal("/xl/worksheets/sheet1.xml");

        self.message = `
       Should have /xl/theme/theme1.xml node name.
       Actual value: ${contentTypes.rootNode.children[4].name}
       Expected value: Override
       `;
        expect(contentTypes.rootNode.children[4].name, self.message).equal(
          "Override"
        );
        self.message = `
       Should have /xl/theme/theme1.xml node content type.
       Actual value: ${
         contentTypes.rootNode.children[4].attribute("ContentType").value
       }
       Expected value: application/vnd.openxmlformats-officedocument.theme+xml
       `;
        expect(
          contentTypes.rootNode.children[4].attribute("ContentType").value,
          self.message
        ).equal("application/vnd.openxmlformats-officedocument.theme+xml");

        self.message = `
        Should have override value
        Actual value: ${contentTypes.overrides["application/vnd.openxmlformats-officedocument.theme+xml"]}
        Expected value: /xl/theme/theme1.xml
        `;
        expect(
          contentTypes.overrides[
            "application/vnd.openxmlformats-officedocument.theme+xml"
          ],
          self.message
        ).equal("/xl/theme/theme1.xml");

        self.message = `
       Should have /xl/theme/theme1.xml node extention.
       Actual value: ${
         contentTypes.rootNode.children[4].attribute("PartName").value
       }
       Expected value: /xl/theme/theme1.xml
       `;
        expect(
          contentTypes.rootNode.children[4].attribute("PartName").value,
          self.message
        ).equal("/xl/theme/theme1.xml");

        self.message = `
        Should have /xl/styles.xml node name.
        Actual value: ${contentTypes.rootNode.children[5].name}
        Expected value: Override
        `;
        expect(contentTypes.rootNode.children[5].name, self.message).equal(
          "Override"
        );
        self.message = `
        Should have /xl/styles.xml node content type.
        Actual value: ${
          contentTypes.rootNode.children[5].attribute("ContentType").value
        }
        Expected value: application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml
        `;
        expect(
          contentTypes.rootNode.children[5].attribute("ContentType").value,
          self.message
        ).equal(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"
        );

        self.message = `
        Should have override value
        Actual value: ${contentTypes.overrides["application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"]}
        Expected value: /xl/styles.xml
        `;
        expect(
          contentTypes.overrides[
            "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"
          ],
          self.message
        ).equal("/xl/styles.xml");

        self.message = `
        Should have /xl/styles.xml node extention.
        Actual value: ${
          contentTypes.rootNode.children[5].attribute("PartName").value
        }
        Expected value: /xl/styles.xml
        `;
        expect(
          contentTypes.rootNode.children[5].attribute("PartName").value,
          self.message
        ).equal("/xl/styles.xml");

        self.message = `
         Should have /xl/sharedStrings.xml node name.
         Actual value: ${contentTypes.rootNode.children[6].name}
         Expected value: Override
         `;
        expect(contentTypes.rootNode.children[6].name, self.message).equal(
          "Override"
        );
        self.message = `
         Should have /xl/sharedStrings.xml node content type.
         Actual value: ${
           contentTypes.rootNode.children[6].attribute("ContentType").value
         }
         Expected value: application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml
         `;
        expect(
          contentTypes.rootNode.children[6].attribute("ContentType").value,
          self.message
        ).equal(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"
        );

        self.message = `
        Should have override value
        Actual value: ${contentTypes.overrides["application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"]}
        Expected value: /xl/sharedStrings.xml
        `;
        expect(
          contentTypes.overrides[
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"
          ],
          self.message
        ).equal("/xl/sharedStrings.xml");

        self.message = `
         Should have /xl/sharedStrings.xml node extention.
         Actual value: ${
           contentTypes.rootNode.children[6].attribute("PartName").value
         }
         Expected value: /xl/sharedStrings.xml
         `;
        expect(
          contentTypes.rootNode.children[6].attribute("PartName").value,
          self.message
        ).equal("/xl/sharedStrings.xml");

        self.message = `
        Should have /docProps/core.xml node name.
        Actual value: ${contentTypes.rootNode.children[7].name}
        Expected value: Override
        `;
        expect(contentTypes.rootNode.children[7].name, self.message).equal(
          "Override"
        );
        self.message = `
        Should have /docProps/core.xml node content type.
        Actual value: ${
          contentTypes.rootNode.children[7].attribute("ContentType").value
        }
        Expected value: application/vnd.openxmlformats-package.core-properties+xml
        `;
        expect(
          contentTypes.rootNode.children[7].attribute("ContentType").value,
          self.message
        ).equal("application/vnd.openxmlformats-package.core-properties+xml");

        self.message = `
        Should have override value
        Actual value: ${contentTypes.overrides["application/vnd.openxmlformats-package.core-properties+xml"]}
        Expected value: /docProps/core.xml
        `;
        expect(
          contentTypes.overrides[
            "application/vnd.openxmlformats-package.core-properties+xml"
          ],
          self.message
        ).equal("/docProps/core.xml");

        self.message = `
        Should have /docProps/core.xml node extention.
        Actual value: ${
          contentTypes.rootNode.children[7].attribute("PartName").value
        }
        Expected value: /docProps/core.xml
        `;
        expect(
          contentTypes.rootNode.children[7].attribute("PartName").value,
          self.message
        ).equal("/docProps/core.xml");

        self.message = `
         Should have /docProps/app.xml node name.
         Actual value: ${contentTypes.rootNode.children[8].name}
         Expected value: Override
         `;
        expect(contentTypes.rootNode.children[8].name, self.message).equal(
          "Override"
        );
        self.message = `
         Should have /docProps/app.xml node content type.
         Actual value: ${
           contentTypes.rootNode.children[8].attribute("ContentType").value
         }
         Expected value: application/vnd.openxmlformats-officedocument.extended-properties+xml
         `;
        expect(
          contentTypes.rootNode.children[8].attribute("ContentType").value,
          self.message
        ).equal(
          "application/vnd.openxmlformats-officedocument.extended-properties+xml"
        );

        self.message = `
        Should have override value
        Actual value: ${contentTypes.overrides["application/vnd.openxmlformats-officedocument.extended-properties+xml"]}
        Expected value: /docProps/app.xml
        `;
        expect(
          contentTypes.overrides[
            "application/vnd.openxmlformats-officedocument.extended-properties+xml"
          ],
          self.message
        ).equal("/docProps/app.xml");

        self.message = `
         Should have /docProps/app.xml node extention.
         Actual value: ${
           contentTypes.rootNode.children[8].attribute("PartName").value
         }
         Expected value: /docProps/app.xml
         `;
        expect(
          contentTypes.rootNode.children[8].attribute("PartName").value,
          self.message
        ).equal("/docProps/app.xml");

        done();
      });
    });
  });
});
