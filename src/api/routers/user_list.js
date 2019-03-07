const Router = require('koa-router');
const url = require('url');

const db = require('../db/tool');

// 创建路由
var router = new Router();

router.get('/',async (ctx,next)=>{
    // let {id} = ctx.request.body;
    
    let res =await db.find('user',{});
    // console.log(id)
    ctx.body = res;
});

router.post('/',async (ctx,next)=>{
    let {username} = ctx.request.body;

    // console.log(username)
    let res =await db.delete('user',{username});

    ctx.body = res;
});

module.exports = router;