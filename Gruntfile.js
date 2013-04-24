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
				dest: "./app.js",
				options: {
					bare: true
				}
			},
			config: {
				src: ["coffee/config.coffee"],
				dest: "./config.js",
				options: {
					bare: true
				}
			},
			routes: {
				src: ["coffee/routes.coffee"],
				dest: "./routes/routes.js",
				options: {
					bare: true
				}
			}
		},

		compass: {
			build: {
				options: {
					config: 'config.rb'
				}
			}
		},

		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'source/',
						src: [
							'ui/**/*.css',
							'ui/**/*.js',
							'ui/**/*.jpg',
							'ui/**/*.gif',
							'ui/**/*.png'
						],
						dest: 'public'
					}
				]
			}
		},

		watch: {
			coffee: {
				files: [
					'coffee/**/*.coffee'
				],
				tasks: ["coffeelint","coffee"]
			},
			scss: {
				files: [
					"source/ui/**/*.scss"
				],
				tasks: ['scss','copy']
			},
			js: {
				files: [
					'app.js', 'routes/routes.js'
				],
				tasks: 'jslint'
			}
		},

		jshint: {
			files: ["Gruntfile.js", "lib/**/*.js", "test/**/*.js", "public/js/*.js"],
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
				node: true,
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
		}
	});

	// Grunt modules
	grunt.loadNpmTasks("grunt-coffeelint");
	grunt.loadNpmTasks("grunt-contrib-coffee");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");


	// Default task.
	grunt.registerTask("dev", ["compass","coffeelint","coffee","jshint","copy"]);
	grunt.registerTask('scss', ['compass']);

	grunt.registerTask("default", ["dev","watch"]);

};