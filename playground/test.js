var parser = require("../dist/util/parser");

parser.XmlParser.parse("<?xml version=1.0?>\n\
<root att1='v1' att2='v2'><child1 att1='v1' /><child1/><child2 att3='v3'></child2></root>", []).then(d => {
    console.log(d["rootNode"]);
});