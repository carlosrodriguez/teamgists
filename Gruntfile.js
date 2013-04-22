"use strict";

module.exports = function(grunt) {

// Project configuration.
	grunt.initConfig({
		pkg: "<json:package.json>",

		test: {
			files: ["test/**/*.js"]
		},

		coffeelintOptions: {
            "no_backticks": {
                "level": "ignore"
            },
            "no_trailing_whitespace": {
                "level": "ignore"
            },
            "no_tabs" : {
                "level": "ignore"
            },
            "indentation": {
                "level": "ignore"
            },
            "max_line_length": {
				"level": "ignore"
            }
        },

		coffeelint: {
			app: ["coffee/*.coffee"]
		},

		coffee: {
			app: {
				src: ["coffee/app.coffee"],
				dest: "./",
				options: {
					bare: true
				}
			},
			settings: {
				src: ["coffee/settings.coffee"],
				dest: "./config/",
				options: {
					bare: true
				}
			}
		},

		lint: {
			files: ["grunt.js", "lib/**/*.js", "test/**/*.js", "public/js/*.js"]
		},

		watch: {
			files: ["<config:lint.files>", "coffee/**/*.coffee", "source/**/*"],
			tasks: "default"
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				node: true
			},
			globals: {
				exports: true,
				document: true,
				window: true,
				$: true,
				jQuery: true,
				_: true,
				io: true,
				Mustache: true,
				HULK: true,
				Handlebars: true
			}
		}
	});

	// Grunt modules
	grunt.loadNpmTasks("grunt-coffeelint");
	grunt.loadNpmTasks("grunt-coffee");


	// Default task.
	grunt.registerTask("dev", "coffeelint coffee lint");

	grunt.registerTask("default", "dev watch");

};