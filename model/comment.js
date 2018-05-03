const fs = require('fs')

const filePath = 'db/comment.json'

// 这是一个用来存储 comment 数据的对象
class ModelComment {
    constructor(form) {
        this.author = form.author || ''
        this.content = form.content || ''
        this.blog_id = Number(form.blog_id || 0)
        // 生成一个 unix 时间，unix 时间是什么，上课会说
        this.created_time = Math.floor(new Date() / 1000)
    }
}

const loadData = () => {
    // 确保文件有内容
    var content = fs.readFileSync(filePath, 'utf8')
    var data = JSON.parse(content)
    return data
}

var b = {
    data: loadData(),
}

b.all = function() {
    return this.data
}

b.new = function(form) {
    var m = new ModelComment(form)
    // console.log('new blog', form, m)
    // 设置新数据的 id
    var d = this.data[this.data.length - 1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    // 把数据加入 this.data 数组
    this.data.push(m)
    // 把最新数据保存到文件中
    this.save()
    // 返回新建的数据
    return m
}

b.save = function() {
    var s = JSON.stringify(this.data, null, 2)
    fs.writeFile(filePath, s, (error) => {
        if (error != null) {
            console.log('error', error)
        } else {
            console.log('保存成功')
        }
    })
}

module.exports = b
