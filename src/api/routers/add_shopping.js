const Router = require('koa-router');

const bodyparse = require('koa-body');
const path = require('path');
const util = require('util');

const db = require('../db/tool');

// 创建路由
var router = new Router();

// 添加
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

//修改
router.post('/update',async (ctx,next)=>{
    let {id,name, classify, original, now, warehousing, state, joinTime} = ctx.request.body;
    
    // console.log({id,name, classify, original, now, warehousing, state, joinTime});

    let res =await db.update('goods',{id:id*1},{$set:{name, classify, original, now, warehousing, state, joinTime}});

    ctx.body = res
});

module.exports = router;
