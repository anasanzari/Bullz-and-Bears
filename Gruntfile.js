module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'resources/src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          'jQuery': true,
          'angular': true,
          'console': true,
          '$': true,
          '_': true,
          'moment': true
        }
      }
    },

    htmlhint: {
          options: {
            'attr-lower-case': true,
            'attr-value-not-empty': false,
            'tag-pair': true,
            'tag-self-close': true,
            'tagname-lowercase': true,
            'id-class-value': true,
            'id-unique': true,
            'img-alt-require': true,
            'img-alt-not-empty': true
          },
          main: {
            src: ['resources/src/index.template', 'resources/src/templates/**/*.html']
          }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'resources/assets/sass',
          src: ['app.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      },
      vendor:{
        files: [{
          expand: true,
          cwd: 'resources/assets/sass',
          src: ['vendor.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },
    concat: {
      basic: {
        src: ['resources/src/app/**/*.js'],
        dest: 'public/app/app.js',
      },
      extras: {
        src: ['src/main.js', 'src/extras.js'],
        dest: 'dist/with_extras.js',
      },
    },
    copy: {
      main: {
        expand: true,
        files: [
          {expand: true, cwd:'resources/src/templates/', src: '**', dest: 'public/templates'}
        ],
      },
      fonts:{
        expand: true,
        files:[
          {expand: true, cwd: 'public/bower_components/mdi/fonts', src:"**", dest:'public/fonts'},
          {expand: true, cwd: 'public/bower_components/font-awesome/fonts', src:"**", dest:'public/fonts'}
        ]
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/app/app.min.js': ['resources/src/app/*.js']
        }
      }
    },

    watch: {
         grunt: {
           files: ['Gruntfile.js'],
           options: {
             nospawn: true,
             keepalive: true,
             livereload: true
           },
           tasks: ['build:dev']
         },
         js: {
           files: 'resources/src/app/**/*.js',
           options: {
             nospawn: true,
             livereload: true
           },
           tasks: ['jshint', 'concat:basic']
         },
         html: {
           files: ['resources/src/index.template', 'resources/src/templates/**/*.html'],
           options: {
             nospawn: true,
             livereload: true
           },
           tasks: [ 'copy:main', 'preprocess:dev', 'preprocess:prod']
         },
         sass: {
           files: ['resources/assets/sass/**'],
           options: {
             nospawn: true,
             livereload: true
           },
           tasks: ['sass:dist']
         }

    },

    preprocess: {
          dev: {
            options: {
              context: {
                MODE: 'dev',
                BUILD_TS: '<%= ((new Date()).valueOf().toString()) + (Math.floor((Math.random()*1000000)+1).toString()) %>'
              }
            },
            src: 'resources/src/index.template',
            dest: 'public/index.html'
          },
          prod: {
            options: {
              context: {
                MODE: 'prod',
                BUILD_TS: '<%= ((new Date()).valueOf().toString()) + (Math.floor((Math.random()*1000000)+1).toString()) %>'
              }
            },
            src: 'resources/src/index.template',
            dest: 'resources/views/index.blade.php'
          }
    },


    connect: {
        server: {
            options: {
                port: 8080,
                base: 'public',
                hostname: 'localhost',
                livereload: true,
                middleware: function (connect, options, middlewares) {
                  middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
                  return middlewares;
                }
            },
            proxies: [
                {
                context: '/api',
                host: 'localhost',
                port: 80,
                changeOrigin: true,
                rewrite: {
                    '^/api': '/Github/Bullz/public/api'
                }
              }
            ]
        }
    }

  });


  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('build:dev', function (target) {
       grunt.task.run([
         'copy:main',
         'copy:fonts',
/*         'htmlhint',*/
         'jshint',
         'sass',
         'preprocess:dev',
         'preprocess:prod'
       ]);
   });

  grunt.registerTask('server', function (target) {
       grunt.task.run([
           'build:dev',
           'configureProxies:server',
           'connect',
           'watch'
       ]);
   });

};
