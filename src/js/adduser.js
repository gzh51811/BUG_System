document.addEventListener("DOMContentLoaded", ()=>{

    layui.use('element', function(){
        var element = layui.element;
    });

    layui.use('form', function(){
        var form = layui.form;
    })


    let username = document.querySelector('#username');
    let password = document.querySelector('#password');
    let confirmpassword = document.querySelector('#confirmpassword');
    let phone = document.querySelector('#phone');
    let born = document.querySelector('#born');
    let email = document.querySelector('#email');
    let sex = document.querySelector('#sex');
    let ps = document.querySelector('#ps');
    let addbtn = document.querySelector('.addbtn');

    

    // 判断用户名是否符合正则，是否存在
    let ok1 = false;
    username.onchange = ()=>{
        let _username = username.value;
        let str = checkReg.trim(_username);
        
        if(str && checkReg.chinese(str)){
            username.parentNode.nextElementSibling.innerText = '你输入的用户可以使用';
            ok1 = true;
            // // 发起ajax请求
            let xhr = new XMLHttpRequest();
            xhr.onload = ()=>{

                if(xhr.status == 200){
                    if(xhr.responseText == 'no'){
                        username.parentNode.nextElementSibling.innerText = '你输入的用户太受欢迎';
                        ok1 = false;
                    }else{
                        username.parentNode.nextElementSibling.innerText = '你输入的用户可以使用';
                        ok1 = true;
                    }
                }

            }
            xhr.open('get',`/adduser?username=${_username}`,true);
            
            xhr.send()
        }else{
            username.parentNode.nextElementSibling.innerText = '你输入的用户不符合格式';
        }
    }

    //密码正则
    let ok2 = false;
    password.onchange = ()=>{
        let _password = password.value;
        let str = checkReg.trim(_password);
        
        if(str && checkReg.psweasy(str)){
            password.parentNode.nextElementSibling.innerText = '√';
            ok2 = true;
        }else{
            password.parentNode.nextElementSibling.innerText = '密码必须首字母开头';
            ok2 = false;
        }
    }

    //确认密码
    let ok3 = false;
    confirmpassword.onchange = ()=>{
        let _confirmpassword = confirmpassword.value;
        let str1 = checkReg.trim(_confirmpassword);
        let _password = password.value;
        let str2 = checkReg.trim(_password);
        
        if(str1 && checkReg.pwwagain(str1,str2)){
            confirmpassword.parentNode.nextElementSibling.innerText = '密码输入正确';
            ok3 = true;
        }else{
            confirmpassword.parentNode.nextElementSibling.innerText = '密码输入错误';
            ok3 = false;
        }
    }

    //手机号码正则
    let ok4 = false;
    phone.onchange = ()=>{
        let _phone = phone.value;
        let str = checkReg.trim(_phone);
        
        if(str && checkReg.phone(str)){
            phone.parentNode.nextElementSibling.innerText = '√';
            ok4 = true;
        }else{
            phone.parentNode.nextElementSibling.innerText = '×';
            ok4 = false;
        }
    }

    //生日正则
    let ok5 = false;
    born.onchange = ()=>{
        let _born = born.value;
        let str = checkReg.trim(_born);
        
        if(str && checkReg.birthday(str)){
            born.parentNode.nextElementSibling.innerText = '√';
            ok5 = true;
        }else{
            born.parentNode.nextElementSibling.innerText = '×';
            ok5 = false;
        }
    }

    //邮箱正则
    let ok6 = false;
    email.onchange = ()=>{
        let _email = email.value;
        let str = checkReg.trim(_email);
        
        if(str && checkReg.email(str)){
            email.parentNode.nextElementSibling.innerText = '√';
            ok6 = true;
        }else{
            email.parentNode.nextElementSibling.innerText = '×';
            ok6 = false;
        }
    }

    

    addbtn.onclick = (e)=>{
        let _username = username.value;
        let _password = password.value;
        let _phone = phone.value;
        let _born = born.value;
        let _email = email.value;
        let _sex = sex.value;
        let _permissions = permissions.value;
        let _ps = ps.value;

        console.log(_sex,_permissions);


        if(ok1 && ok2 && ok3 && ok4 && ok5 && ok6){
            // 发起ajax请求
            let xhr = new XMLHttpRequest();
            xhr.onload = ()=>{
                if(xhr.status == 200){
                    let res = JSON.parse(xhr.responseText);
                    if(res._id){
                        location.href = '../html/adduser.html';
                    }
                }
            }
            xhr.open('post','/adduser',true);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            

            let data = `username=${_username}&password=${_password}&phone=${_phone}&born=${_born}&email=${_email}&sex=${_sex}&permissions=${_permissions}&ps=${_ps}`;
            xhr.send(data);

        }

        // let data = `username=${_username}&password=${_password}&phone=${_phone}&born=${_born}&email=${_email}&sex=${_sex}&ps=${_ps}`;
        // console.log(data);
        e.preventDefault();
    } 

});