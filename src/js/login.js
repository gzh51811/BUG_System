document.addEventListener("DOMContentLoaded", ()=>{

    layui.use('element', function(){
        var element = layui.element;
    });

    layui.use('form', function(){
        var form = layui.form;
    })


    let username = document.querySelector('#username');
    let password = document.querySelector('#password');
    let wcode = document.querySelector('#wcode');
    let yzm = document.querySelector('#yzm');
    let loginbtn = document.querySelector('.loginbtn');

    yzm.innerHTML = randomCode();
    yzm.onclick = ()=>{
        yzm.innerHTML = randomCode();
    }
    

    loginbtn.onclick = (e)=>{
        let _username = username.value;
        let _password = password.value;

        // 发起ajax请求
        let xhr = new XMLHttpRequest();
        xhr.onload = ()=>{
            if(xhr.status == 200){
                let res = JSON.parse(xhr.responseText);
                if(res._id){
                    location.href = '../index.html';
                }

                // Cookie
                // 读取：document.cookie
                // Storage：sessionStorage和localStorage
                // 写入：setItem(name,value) 只能写入字符串
                // 读取：getItem(name)
                // 删除：remoteItem(name)
                // 清除：clear()

                // sessionStorage.setItem('user',xhr.responseText);
                localStorage.setItem('user',xhr.responseText);
            }
        }
        xhr.open('post','/login',true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        

        let data = `username=${_username}&password=${_password}`;
        xhr.send(data);

        e.preventDefault();
    }


});