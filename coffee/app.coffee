http = require 'http'

url = (response) ->
  gist = JSON.parse(response).gists[0]
  'http://gist.github.com/' + gist.repo

exports.url = url
exports.create = (content, callback) ->
  body = 'files[newfile]=' + content

  options =
    host: 'gist.github.com',
    port: 80,
    path: '/api/v1/json/new',
    method: 'POST',
    headers:
      'host': 'gist.github.com',
      'Content-length': body.length,
      'Content-Type': 'application/x-www-form-urlencoded'

  req = http.request(options, (res) ->
    res.body = ''
    res.setEncoding('utf8')
    res.on('data',  (chunk) ->
      res.body += chunk
    )
    res.on('end', () ->
      callback.apply(null, [url(res.body)])
    )
  )

  req.end(body)