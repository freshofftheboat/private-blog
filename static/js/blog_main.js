var log = console.log.bind(console)

var ajax = function(request) {
    /*
    request 属性
        method，请求的方法，string
        url，请求的路径，string
        data，请求发送的数据，string
        callback，响应回调，function
    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

var templateBlog = function(blog) {
    var id = blog.id
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
        <div class="uu-blog-cell">
            <div class="">
                <a class="blog-title" href="/blog/${id}" data-id="${id}">
                    ${title}
                </a>
            </div>
            <div class="">
                <span>${author}</span> @ <time>${time}</time>
            </div>
            <div class="blog-comments">
                <div class="new-comment">
                    <input class="comment-blog-id" type=hidden value="${id}">
                    <input class="comment-author" value="">
                    <input class="comment-content" value="">
                    <button class="comment-add">添加评论</button>
                </div>
            </div>
        </div>
    `
    return t
}

var insertBlogAll = function(blogs) {
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        var t = templateBlog(b)
        html += t
    }
    // 把数据写入 .uu-blogs 中
    var div = document.querySelector('.uu-blogs')
    div.innerHTML = html
}

var blogAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            // console.log('响应', response)
            var blogs = JSON.parse(response)
            window.blogs = blogs
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}

var blogNew = function(form) {
    // var form = {
    //     title: "测试标题",
    //     author: "uu",
    //     content: "测试内容",
    // }
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/blog/add',
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            // console.log('响应', response)
            var res = JSON.parse(response)
        }
    }
    ajax(request)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var commentNew = function(form, callback) {
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/comment/add',
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            var c = JSON.parse(response)
            callback(c)
        }
    }
    ajax(request)
}

var actionCommmentAdd = (event) => {
    var self = event.target
    var form = self.closest('.new-comment')
    var blogId = form.querySelector('.comment-blog-id').value
    var author = form.querySelector('.comment-author').value
    var content = form.querySelector('.comment-content').value
    var form = {
        blog_id: blogId,
        author: author,
        content: content,
    }
    commentNew(form, function(comment) {
        log('新评论', comment)
    })
}

var bindEvents = function() {
    // 发表新博客事件
    var button = e('#id-button-submit')
    button.addEventListener('click', function(event) {
        console.log('click new')
        // 得到用户填写的数据
        var form = {
            title: e('#id-input-title').value,
            author: e('#id-input-author').value,
            content: e('#id-input-content').value,
        }
        blogNew(form)
    })

    document.body.addEventListener('click', (event) => {
        log('click new')
        var self = event.target
        if (self.classList.contains('comment-add')) {
            actionCommmentAdd(event)
        }
    })
}

var __main = function() {
    // 载入博客列表
    blogAll()
    // 绑定事件
    bindEvents()
}

__main()
