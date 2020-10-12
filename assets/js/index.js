$(function () {
    getUserInfo()
    var { layer } = layui
    $('#btnlogout').click(function () {
        layer.confirm('确定退出登录?',
            { icon: 3, title: '提示' },
            function (index) {
                //do something
                localStorage.removeItem('token')
                location.href ='/login.html'
                layer.close(index);
            })
    })
})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers: {
        //     Authorization:localStorage.getItem('token')||''
        // },
        success(res) {
            // console.log(res);
            if (res.status !== 0) {
                layui.layer.msg(res.message || '获取用户失败')
                return
            }
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         console.log(111);
        //         localStorage.removeItem('token')
        //         location.href='/login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}