express = require 'express'
partials = require 'express-partials'
hulk = require 'hogan-express'
lodash = require 'lodash'
request = require 'request'
path = require 'path'
http = require 'http'

# Custom modules
routes = require './routes/routes.js'

app = express()

app.configure 'development', () ->
  app.use express.errorHandler()

app.configure 'prodcution', () ->
  app.use express.errorHandler()

server = http.createServer(app)
port = process.env.PORT || 3000

app.use express.logger()
app.use partials()
# app.use(express.compress())

app.set 'view engine', 'html'
app.set 'layout', 'layout'
partials =
   head: "head"
   nav: "nav"
   footer: "footer"

app.set 'partials', partials

#app.enable('view cache')

app.engine 'html', hulk
app.set 'views', __dirname + '/views'
app.use express.static(path.join(__dirname, 'public'))

# Site structure
app.get '/', routes.index


server.listen port, () ->
  console.log("Express server listening on port " + port)
  return