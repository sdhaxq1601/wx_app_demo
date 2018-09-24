var http = require('http')
var request = require('request')

var server = http.createServer(onRequest).listen(8080)
console.log("正在监听8080端口。。。")

function onRequest (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)

  req.url = "https://c8.cn"+"/api/LhcNews/GetLhcLotteryRecord" + req.url

  console.log(`SUCCESS CONNECT   ${req.url}`)
  if (req.method === 'GET') {
    if (req.url) {
      // request方法返回的对象兼具可读和可写权限，所以可以直接通过pipe给客户端返回值
      request({
        url: req.url
      }).on('error', function (e) {
        res.end(e)
      }).pipe(res)
    } else {
      res.end('no url found')
    }
  } else if (req.method === 'POST') {
    if (req.url) {
      let body = ""
      req.on('data', function (chunk) {
        body += chunk;
      })
      req.on('end', function () {
        // 这里的 from 其实就是把 data 组装成自己想要的格式
        let data = body.split('=')
        request.post(req.url).form({body:data[1]}).on('error', e => res.end(e)).pipe(res)
      })
    } else {
      res.end('wrong post')
    }
  } else {
    res.end('wrong method')
  }

}