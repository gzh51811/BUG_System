const Router = require('koa-router');

const db = require('../db/tool');

const token = require('../utils/token');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
    // 解构
    let {username,password} = ctx.request.body;

    let res = await db.find('user',{username,password});

    res = res[0];

    if(res){

        // 登录成功：发令牌
        let _token = token.create(username);

        ctx.body = {
            _id : res._id,
            username : res.username,
            permissions : res.permissions,
            regtime : res.regtime,
            token : _token
        }
    }else{
        ctx.body = {
            code : 404,
            msg : '失败'
        }
    }

    

    // 存入数据库

})

module.exports = router;