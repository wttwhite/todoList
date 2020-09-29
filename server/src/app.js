const express = require('express')
const app = express()
const bodyParser = require('body-parser')  //中间件

const models = require('../models')
const fs = require('fs')

app.use(express.json()) // 处理json数据
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded()) // url
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({extend: true}))

// 查询列表
app.get('/list', async (req, res, next) => {
  try {
    // 1 待办 2 完成 3 删除 -1 全部
    let { status, pageNo, pageSize } = req.query
    let offset = (pageNo - 1) * pageSize
    let where = {}
    if (status != -1) {
      where.status = status
    }
    let list = await models.Todo.findAndCountAll({
      where,
      offset,
      limit: pageSize
    })
    res.json({
      list,
      code: 0,
      message: '查询列表成功'
    })
  } catch (error) {
    next(error)
  }
})
// 新增一条数据
app.post('/create', async (req, res, next) => {
  try {
    let { name, deadline, content } = req.body
    let todo = await models.Todo.create({
      name,
      deadline,
      content
    })
    res.json({
      code: 0,
      todo
    })
  } catch (error) {
    next(error)
  }
})

// 修改
app.post('/update', async (req, res, next) => {
  try {
    let { name, deadline, content, status, id } = req.body
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    })
    if (todo) {
      await todo.update({
        name, deadline, content, status, id
      })
      res.json({
        code: 0,
        todo
      })
    } else {
      res.json({
        message: '没有找到'
      })
    }
  } catch (error) {
    next(error)
  }
})

app.use('/changeStatus', async (req, res, next) => {
  try {
    let { status, id } = req.body
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    })
    if (todo) {
      await todo.update({ status }) 
      res.json({
        code: 0,
        message: '状态修改成功'
      })
    } else {
      res.json({
        message: '没有找到'
      })
    }
  } catch (error) {
    next(error)
  }
})

app.all('*', (req, res) => {
  // let data
  fs.readFile('../public/index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.json(content)
  })
  // let data = fs.readFileSync('../public/index.html', 'utf-8')
  // res.end(data)
})
// app.use(express.static('public', {
//   // 默认后缀
//   extensions: ['html', 'htm']
// }))


// 1. 所有的错误处理， http status = 500

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: res.message
    })
  }
})

// app.get('/', (req, res) => {
//   res.json({
//     message: '启动服务'
//   })
// })

app.listen(3001, () => {
  console.log('server启动成功')
})