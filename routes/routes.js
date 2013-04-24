var config, lodash;

lodash = require('lodash');

config = {
  project: ''
};

exports.index = function(req, res) {
  res.locals = config;
  return res.render("index", {
    partials: {
      content: "index",
      sidebar: "sidebar"
    }
  });
};
