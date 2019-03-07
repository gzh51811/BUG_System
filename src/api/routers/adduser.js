const Router = require('koa-router');

const db = require('../db/tool');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
    // 解构
    let {username,password,phone,born,email,sex,permissions,ps,regtime} = ctx.request.body;

    let data = {username,password,phone,born,email,sex,permissions,ps,regtime:Date.now()}
    let res = await db.insert('user',data);
    
    ctx.body = res;
    
    // 存入数据库

})

// 判断用户名是否存在
router.get('/',async (ctx,next)=>{
    let {username} = ctx.query;

    let res = await db.find('user',{username});

    if(res.length>0){
        ctx.body = 'no'
    }else{
        ctx.body = 'yes'
    }
})

module.exports = router;