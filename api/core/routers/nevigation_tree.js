const Router =require('koa-router');

const rootMenu=[
    {id:"",name:"Projects",url:""},
    {id:"",name:"Setting",url:""},
    {id:"",name:"",url:""}
];

let route=new Router();
route.get('/',(ctx,next)=>{
    ctx.body='Nav Root'
});

module.exports=route;
