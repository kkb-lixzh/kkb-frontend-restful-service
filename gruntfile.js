module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: 'lib',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: '/'
                }]
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            built_js: {
                src: [
                    'src/*.js',
                    'src/**/*.js',
                ],
                dest: 'dist/kkb.framework.restful.js'
            },
            dist_js: {
                src: [
                    'src/**/*.js',
                ],
                dest: 'kkb.framework.restful.js'
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //beautify : true,
                mangle: true //混淆变量名
            },
            built: {
                src: ["dist/kkb.framework.restful.js"],
                dest: "dist/kkb.framework.restful.min.js"
            },
            dist_js: {
                src: ["dist/kkb.framework.restful.js"],
                dest: "kkb.framework.restful.min.js"
            }
        },
        jshint: {
            all: ['src/*.js', 'src/**/*.js']
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },
        clean: {
            js: ["dist/js/built.js"],
            css: ["dist/css/built.css"]
        },
        karma: {
            unit: {
                configFile: "tests/karma.conf.js",
                options: {
                    files: ['../lib/angular/angular.js', '../lib/kkb-framework-core/kkb.framework.js', '../dist/kkb.framework.restful.js', '../lib/**/*.js', '../tests/**/*.js'],
                    browsers: ['Chrome' /*, 'Firefox', 'Safari', 'IE', 'Opera'*/ ]
                }
            },
            options: {
                files: ['dist/**/*.js', 'tests/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    //grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-bower-task');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['bower', 'concat', 'uglify', 'karma', /*','jshint',copy','cssmin','clean'*/ ]);
};