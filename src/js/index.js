document.addEventListener("DOMContentLoaded", ()=>{

    layui.use('element', function(){
        var element = layui.element;
    });

    layui.use('form', function(){
        var form = layui.form;
    });


    let welcome = document.querySelector('.welcome');
    let user = localStorage.getItem('user');//获取user的值

    if(!user){
        user = {}
    }else{
        user = JSON.parse(user);
    }


    // if(user._id){
    //     welcome.innerHTML = `<li class="layui-nav-item">
    //                             welcome to this,${user.username} <button class="layui-btn-sm layui-btn-danger layui-btn-radius logoutbtn">退出</button>
    //                         </li>`;
    // }


    // token验证方式
    if(user.token){
        // 判断本地是否有token
        let xhr = new XMLHttpRequest();
        xhr.onload = ()=>{
            let res = JSON.parse(xhr.responseText);
            if(res.status == 200){
                welcome.innerHTML = 
                `<li class="layui-nav-item">
                    welcome to this,${user.username} <button class="layui-btn-sm layui-btn-danger layui-btn-radius logoutbtn">退出</button>
                </li>`;
            }
        }
        xhr.open('post','/tokenverify',true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send('token='+user.token)
    }

    //    退出
    welcome.onclick = (e)=>{
        if(e.target.classList.contains('logoutbtn')){
            localStorage.removeItem('user');
            location.reload();
        }
    }

})