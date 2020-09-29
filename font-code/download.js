// node 不能读取整个文件夹
// 非常重要的思维 - 数据驱动思维
const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')

//
const main = (name) => {
  const spinner = ora(chalk.blue('下载中...')).start()
  fs.mkdir('./' + name, () => {
    downloadFile(name)
  })
  spinner.stop()
  console.log(chalk.green('下载完成'))
}
// 下载文件
const downloadFile = (name) => {
  const demoPath = './src'
  const targetPath = './' + name
  const arr = makeArr()
  while (arr.length > 0) {
    const item = arr.shift()
    // ./init/.src/api
    const path = targetPath + '/' + item[1].replace(demoPath+'/', '')
    console.log('path', path)
    if (item[0] === 'file') {
      const data = fs.readFileSync(item[1])
      fs.writeFileSync(path, data)
    } else {
      fs.mkdirSync(path)
    }
  }
}
// 获取文件数组
const makeArr = () => {
  let arr = []
  readFile('./src', arr)
  return arr
}
// 读取文件
const readFile = (path, arr) => {
  const files = fs.readdirSync(path)
  files.forEach((item, index) => {
    const newPath = path + '/' + item
    const stat = fs.statSync(newPath)
    // 判断是否是文件夹
    if (stat.isDirectory()) {
      arr.push(['dir', newPath])
      readFile(newPath, arr)
    } else {
      arr.push(['file', newPath])
    }
  })
}
module.exports = main