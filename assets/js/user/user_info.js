$(function () {
    const form = layui.form

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success(res) {
                if (res.status !== 0) {
                    layer.msg(res.message || '获取用户信息失败')
                    return
                }
                // console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url:'/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message||'更新用户信息失败！')
                    return
                }
                layer.msg('更新用户信息成功！')
            }
        })
        window.parent.getUserInfo()
    })
})
