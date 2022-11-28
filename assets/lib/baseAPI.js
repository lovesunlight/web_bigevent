//注意:每次调用$.get()或$.post()或$.ajax()的时候
//会先调用 ajaxPrefilter 这个函数
//在这个函数中,可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function(option){
    //在发起真正的ajax请求之前,同一拼接请求的根路径
    //这里函数中option.url默认为ajax配置对象中的路径(例如:/api/login)
    option.url = 'http://127.0.0.1:3007' + option.url
    //统一为有权限的接口,设置headers请求头
    if(option.url.indexOf('/my') !== -1){
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //不论成功还是失败,最终都会调用 complete 回调函数
    option.complete =  function(res){
        // console.log('执行了 complete 回调函数');
        console.log(res);
        // console.log(0);
        //在 complete 回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败!'){
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})