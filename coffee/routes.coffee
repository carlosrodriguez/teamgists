# Modules
lodash = require 'lodash'

# Project Settings
config = require '../config.js'

config =
  project: config

# Homepage
exports.index = (req, res) ->
  res.locals = config
  res.render "index", partials: { content: "index", sidebar: "sidebar" }