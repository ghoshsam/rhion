let path = require("path");

let ejs = require("ejs");
//let data = require("./sample.json");
let model = Object.assign({});
model.name = "My Name";
let result = ejs.renderFile(path.join(__dirname), "sample.json", model);
console.log(JSON.stringify(result));
