const Router = require('koa-router');

const bodyparse = require('koa-body');
const path = require('path');
const util = require('util');

const db = require('../db/tool');

// 创建路由
var router = new Router();

router.post('/',async (ctx,next)=>{
    let {name, classify, original, now, warehousing, state, joinTime} = ctx.request.body;
    
    let find =await db.find('goods',{});

    let data = {
        id : find[find.length - 1].id+1,
        name : name,
        classify : classify,
        original : original,
        now : now,
        warehousing : warehousing,
        state : state,
        joinTime : joinTime
    }

    let res =await db.insert('goods',data);

    ctx.body = res;


});

module.exports = router;
