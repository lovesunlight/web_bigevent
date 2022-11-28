$(function(){
    // 点击去注册
    $('#go-req').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录
    $('#go-login').on('click', function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui中获取form方法
    var form = layui.form
    var layer = layui.layer
    //定义表单校验自定义规则
    form.verify({
        password: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ],
        //自定义repassword验证规则
        repassword: function(value){
            var password = $('.reg-box #password2').val()
            if(password !== value){
                return '两次密码不一致!'
            }
        }
    })

    //监听注册表单提交事件
    $('#form_req').on('submit', function(e){
        console.log($('#password2').val());
        e.preventDefault()
        // $.post('http://127.0.0.1:3007/api/reguser',{
        //     username: $('#username2').val(),
        //     password: $('#password2').val(),
        //     function(res){
        //         if(res.status !== 0){
        //             return console.log('res.message');
        //         }
        //         console.log('注册成功!')
        //     }
        // })
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            ContentType: 'application/x-www-form-urlencoded',
            data:{
                username: $('#username2').val(),
                password: $('#password2').val(),
            },
            success: function(res){
                if(res.status !== 0){
                    // return console.log(res.message);
                    return layer.msg(res.message)
                }
                // console.log('注册成功!')
                layer.msg('注册成功!请登录')
                
                //模拟人为点击
                $('#go-login').click()
            }
        })
    })
     //监听登录表单提交信息
     $('#form_login').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            ContentType: 'application/x-www-form-urlencoded',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功!')
                //将token值存入本地
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})
    