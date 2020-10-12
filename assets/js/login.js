$(function () {
  //点击登录 跳转注册
  $('#link-reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })
  //点击注册跳转登录
  $('#link-login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })
  //自定义校验规则
  const { form, layer } = layui
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd(value) {
      const pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return `两次密码不一致`
      }
    }
  })
  //注册功能
  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    $.ajax({
      url: '/api/reguser',
      method: 'POST',
      data: {
        username: $('.reg-box [name="username"]').val(),
        password: $('.reg-box [name="password"]').val()
      },
      success(res) {
        if (res.status !== 0) {
          layer.msg(res.message)
          return
        }
        layer.msg('注册成功')
        $('#link-login').click()
      }
    })
  })

  $('#form-login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data:$(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          layer.msg(res.message||'登陆失败')
          return
        }
        layer.msg('登陆成功')
        localStorage.setItem('token',res.token)
        location.href='/index.html'
      }
    })
  })

})