const Router=require('koa-router');

let router= new Router({
    path:"/nav/user"
});

router.get('/',async (ctx,next)=>{   
    
    ctx.body="User Router";      
});

router.get('/:role',async(ctx,next)=>{

});

module.exports=router;






