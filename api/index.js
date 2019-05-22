const koa= require('koa');
const path= require('path');
const bodyParser=require('koa-body');
const routers=require('./lib/routers');
var api=routers({
    root:path.resolve(__dirname,path.normalize('./core/routers'))
});

var app=new koa();
//app.use(nv.routes());
app.use(api.routes());

// var router= new Router();
// router.get('/',(ctx,next)=>{
//     ctx.body='Hello World';
// })
// app.use();
// app.use(bodyParser({

// }));

//app.use(Utlis);
//util.RouterUtils.loadRouter(app);
app.listen(3000);
console.log("Started..")

