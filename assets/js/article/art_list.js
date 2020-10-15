$(function () {
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date);
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate)
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return `${y}-${m}-${d}-${hh}-${mm}-${ss}`
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }


    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    const { layer } = layui
    const { form } = layui
    initTable()
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message || '获取数据失败!')
                    return
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                // layer.msg('获取数据成功!')
                renderPage(res.total)
                // console.log(res);
            }
        })
    }

    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message || '获取分类数据失败!')
                    return
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
                // console.log(res);
            }
        })
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })
    const { laypage } = layui
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                // console.log(first);
                // console.log(obj.curr)
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });

    }
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                url:  '/my/article/delete/' + id,
                method: 'GET',
                success: function (res) {
                    if (res.status !== 0) {
                        layer.msg(res.message || '删除分类失败！')
                        return
                    }
                    layer.msg('删除分类成功！')
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                      }
                    
                    initTable()
                }
            })
            layer.close(index)
          });
        
    })


})