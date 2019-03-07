window.onload=function(){
    layui.use('element', function(){
        var element = layui.element;
    });

    layui.use('form', function(){
        var form = layui.form;
    });


    var name = document.getElementById('name');
    var classify = document.getElementById('classify');
    var original = document.getElementById('original');
    var now = document.getElementById('now');
    var warehousing = document.getElementById('warehousing');
    var state = document.getElementById('state');
    var goods = document.getElementById('goods');
    var btn = document.getElementById('btn');

    //修改商品
    if(window.location.href.split('?')[1]){
        var id = (window.location.href.split('=')[1])*1;
        let xhr = new XMLHttpRequest();
        xhr.onload = ()=>{
          if(xhr.status == 200){
              let res = JSON.parse(xhr.responseText);
              console.log(res)
              if(res[0].id){
                name.value = res[0].name;
                original.value = res[0].original;
                now.value = res[0].now;
                warehousing.value = res[0].warehousing;
                classify.nextSibling.firstChild.firstChild.value = res[0].classify
                if(res[0].state == '上架'){
                    state.nextSibling.classList.add("layui-form-onswitch")
                }else{
                    state.nextSibling.classList.remove("layui-form-onswitch")

                }
              }
          }
        }
        xhr.open('post','/goods_list',true);
        xhr.send('id='+id);
    }

    btn.onclick= e=>{
        _name = name.value;
        _classify = classify.value;
        _original = original.value;
        _now = now.value;
        _warehousing = warehousing.value;
        _state = state.value ? '上架' : '下架';

        let xhr = new XMLHttpRequest();
        xhr.onload = ()=>{
            if(xhr.status == 200){
                let res = JSON.parse(xhr.responseText);
                if(res.ok){
                    alert('添加成功');
                }
            }
        }
        xhr.open('post','/add_shopping',true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        
        let data = `name=${_name}&classify=${_classify}&original=${_original}&now=${_now}&warehousing=${_warehousing}&state=${_state}&joinTime=${getNowFormatDate(Date.now())}`
        xhr.send(data);

        e.preventDefault();
    }

    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

}