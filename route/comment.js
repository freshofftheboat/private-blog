const comment = require('../model/comment')


const all = {
    path: '/api/comment/all',
    method: 'get',
    func: (request, response) => {
        var comments = comment.all()
        var r = JSON.stringify(comments)
        response.send(r)
    }
}

const add = {
    path: '/api/comment/add',
    method: 'post',
    func: (request, response) => {
        // 浏览器发过来的数据我们一般称之为 form（表单）
        var form = request.body
        // 插入新数据并返回
        var b = comment.new(form)
        var r = JSON.stringify(b)
        response.send(r)
    }
}

var routes = [
    all,
    add,
]

module.exports.routes = routes
