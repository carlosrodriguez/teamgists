# Configuration
config = require './config.js'

_ = require 'lodash'
http = require 'http'
request = require 'request'


gistUrl = "http://gist.github.com/"

gists = (config) ->
  _.each config.team, (member) ->
    console.log member.alias
    process(list(member.alias))
    return

process = (url) ->
  options =
    uri: url
  console.log options
  request options, (error, response, body) ->
    console.log body
    body

list = (user) ->
  url = gistUrl + "users/" + user + "/gists"

url = (response) ->
  gist = JSON.parse(response).gists[0]
  'http://gist.github.com/' + gist.repo

create = (content, callback) ->
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

gists(config)

exports.url = url
exports.create = create