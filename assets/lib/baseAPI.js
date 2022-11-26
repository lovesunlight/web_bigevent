//注意:每次调用$.get()或$.post()或$.ajax()的时候
//会先调用 ajaxPrefilter 这个函数
//在这个函数中,可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function(option){
    //在发起真正的ajax请求之前,同一拼接请求的根路径
    //这里函数中option.url默认为ajax配置对象中的路径(例如:/api/login)
    option.url = 'http://127.0.0.1:3007' + option.url
})