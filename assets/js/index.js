$(function(){
    //获取layui中的layer方法
    var layer = layui.layer
    //发起获取用户信息请求
    getUserinfo()
    //点击按钮,实现退出功能
    $('#btnLogout').on('click', function(){
        layer.confirm('是否退出登录?', {icon: 3, title:'提示'}, function(index){
            //1.清空本地存储中的token
            localStorage.removeItem('token')
            //2.跳转登录页
            location.href = '../login.html'

            //关闭confirm询问框
            layer.close(index);
          });
    })
})

function getUserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        ContentType: 'application/x-www-form-urlencoded',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        //在baseAPI.js文件中统一设置请求头
        success: function(res){
            if(res.status !== 0){
                // location.href = '/login.html'
                return layer.msg(res.message)
            }
            //调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // //不论成功还是失败,最终都会调用 complete 回调函数
        // complete: function(res){
        //     // console.log('执行了 complete 回调函数');
        //     console.log(res);
        //     // console.log(0);
        //     //在 complete 回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败!'){
        //         //1.强制清空token
        //         localStorage.removeItem('token')
        //         //2.强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })

}

//渲染用户对象
function renderAvatar(user){
    //获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;' + name)

    //渲染用户头像
    if(user.user_pic !== null){
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avertar').hide()
    }else{
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-aratar').html(first).show()
    }
}