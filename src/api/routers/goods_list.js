const Router = require('koa-router');
const url = require('url');

const db = require('../db/tool');


// 创建路由
var router = new Router();


router.get('/',async (ctx,next)=>{
    let {id} = ctx.request.body;
    
    // let data={name:'oppo'}
    
    let res =await db.find('goods',{});
    // console.log(id)
    ctx.body = res;
});

router.delete('/',async (ctx,next)=>{
    let id = (ctx.url.split('=')[1])*1;
    console.log(id)
    let res =await db.delete('goods',{id});

    ctx.body = res;
});

router.post('/',async (ctx,next)=>{
    let id = ctx.request.body.split('=')[1]*1;
    let res =await db.find('goods',{id});
    // console.log(res)
    ctx.body = res;
});

module.exports = router;
