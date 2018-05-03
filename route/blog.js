// ../ 表示上一级目录
const blog = require('../model/blog')

const all = {
    path: '/api/blog/all',
    method: 'get',
    func: (request, response) => {
        var blogs = blog.all()
        var r = JSON.stringify(blogs, null, 2)
        response.send(r)
    }
}

const add = {
    path: '/api/blog/add',
    method: 'post',
    func: (request, response) => {
        // 浏览器发过来的 form（表单）
        var form = request.body
        // 插入新数据并返回
        console.log('form', form)
        var b = blog.new(form)
        var r = JSON.stringify(b)
        response.send(r)
    }
}

var deleteBlog = {
    path: '/api/blog/delete',
    method: 'post',
    func: (request, response) => {
        // 浏览器发过来的数据我 —— form（表单）
        var form = request.body
        // 删除数据并返回结果
        var success = blog.delete(form.id)
        var result = {
            success: success,
        }
        var r = JSON.stringify(result)
        response.send(r)
    }
}

var detailBlog = {
    path: '/api/blog/:id',
    method: 'get',
    func: (request, response) => {
        var id = Number(request.params.id)
        var b = blog.get(id)
        var r = JSON.stringify(b, null, 2)
        response.send(r)
    }
}

var routes = [
    all,
    add,
    deleteBlog,
    detailBlog,
]

module.exports.routes = routes
