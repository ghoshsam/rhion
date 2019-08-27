var express=require("express");
var path= require("path");
var app=express();

app.engine("html",require("ejs").renderFile);
app.set('view engine','html');
app.set("views",path.join(__dirname,"/src/editor/views"));
app.use('/public', express.static(path.join(__dirname, '/src/public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap')));
app.use('/d3', express.static(path.join(__dirname, '/node_modules/d3/dist')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

//app.use('/vendor', express.static(path.join(__dirname, 'vendor')));
app.use('/editor', express.static(path.join(__dirname, '/src/editor')));
app.get("/",function(req,res){
    res.render("pipeEditor");
})
console.log("http://localhost:3000");
app.listen(3000);