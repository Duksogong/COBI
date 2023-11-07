const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//네이버 검색 API
var client_id = 'EjE7zz7rypVA9GC28VpF'
var client_secret = 'IiNCJ63ats'

app.get('/api/search/book', function(req, res) {
  var api_url = 'https://openapi.naver.com/v1/search/book.json?query=' + encodeURI(req.query.query)
  var request = require('request')
  var options = {
    url: api_url,
    headers: {'X-Naver-Client-id': client_id, 'X-Naver-Client-Secret': client_secret}
  }
  request.get(options, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'})
      res.end(body)
    } else {
      res.status(response.statusCode).end()
      console.log('error = ' + response.statusCode)
    }
  })
})

//서버 실행
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})