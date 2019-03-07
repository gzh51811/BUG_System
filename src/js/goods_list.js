/* 
* @Author: Marte
* @Date:   2019-02-28 17:19:25
* @Last Modified by:   Marte
* @Last Modified time: 2019-03-05 21:00:01
*/

window.onload=function(){
    layui.use('element', function(){
        var element = layui.element;
    });

    layui.use('form', function(){
        var form = layui.form;

        form.on('submit(formDemo)', function(data){
            layer.msg(JSON.stringify(data.field));
            return false;
        });
    });



    var data;
    var mypro=new Promise(function(resolve,reject){
      
      // 发起ajax请求
      let xhr = new XMLHttpRequest();
      xhr.onload = ()=>{
          if(xhr.status == 200){
              let res = JSON.parse(xhr.responseText);
              data = res;
              resolve(data);
          }
      }
      xhr.open('get','/goods_list',true);
      xhr.send();
    });




    mypro.then(function(data){
      layui.use('table', function(){
          var table = layui.table;
          table.render({
              elem: '#test'
              ,data:data
              ,toolbar: '#toolbarDemo'
              ,title: '用户数据表'
              ,cols: [[
                {type: 'checkbox', fixed: 'left'}
                ,{field:'id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
                ,{field:'name', title:'商品名称', width:120}
                ,{field:'classify', title:'分类', width:80}
                ,{field:'original', title:'原价', width:100, sort: true}
                ,{field:'now', title:'现价', sort: true}
                ,{field:'warehousing', title:'存库', width:80, sort: true}
                ,{field:'state', title:'状态', width:120}
                ,{field:'joinTime', title:'加入时间', width:120}
                ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
              ]]
              ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
                //,curr: 5 //设定初始在第 5 页
                ,groups: 1 //只显示 1 个连续页码
                ,first: false //不显示首页
                ,last: false //不显示尾页
                
              }
          });
      });
    },function(){
      alert('请求数据失败')
    });
    
    
    var right = document.getElementsByClassName('right')[0];
    right.onclick=function(ev){
      var ev = ev || window.event;
      if(ev.target.tagName == 'SPAN'){
        var id = ev.target.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.innerHTML;
        location.href='add_shopping.html?id='+id;
      }
      if(ev.target.tagName == 'A'){
        var id = ev.target.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.innerHTML;
        var ok = confirm('真的删除行么');
        if(ok){
          let xhr = new XMLHttpRequest();
          xhr.onload = ()=>{
              if(xhr.status == 200){
                  let res = JSON.parse(xhr.responseText);
                  if(res.ok){
                    location.reload();
                  }
              }
          }
          xhr.open('delete','/goods_list?id='+id,true);
          xhr.send();
        }
      }
    }
}