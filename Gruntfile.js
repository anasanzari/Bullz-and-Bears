module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      js:{
        files: [{
        src: [
          'Gruntfile.js',
          'resources/src/**/*.js',
          'test/**/*.js'
        ]
       }]
      },
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
      },
      admin: {
        files: [{
          expand: true,
          cwd: 'resources/assets/sass',
          src: ['admin.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      },
      prod:{
          options: {                       // Target options
           style: 'compressed'
            },
          files: [{
              expand: true,
              cwd: 'resources/assets/sass',
              src: ['vendor.scss','app.scss'],
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
      admin: {
        src: ['resources/src/admin/**/*.js'],
        dest: 'public/app/admin.js',
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
             livereload: 35731
           },
           tasks: ['build:dev']
         },
         js: {
           files: 'resources/src/app/**/*.js',
           options: {
             nospawn: true,
             livereload: 35732
           },
           tasks: ['jshint', 'concat:basic']
         },
         html: {
           files: ['resources/src/index.template', 'resources/src/templates/**/*.html'],
           options: {
             nospawn: true,
             livereload: 35733
           },
           tasks: [ 'copy:main', 'preprocess:dev', 'preprocess:prod']
         },
         sass: {
           files: ['resources/assets/sass/**'],
           options: {
             nospawn: true,
             livereload: 35734
           },
           tasks: ['sass:dist']
         },

         /*admins*/

             admin_js: {
               files: 'resources/src/admin/**/*.js',
               options: {
                 nospawn: true,
                 livereload: 35735
               },
               tasks: ['jshint', 'concat:admin']
             },
             admin_html: {
               files: ['resources/src/admin/index.template', 'resources/src/templates/**/*.html'],
               options: {
                 nospawn: true,
                 livereload: 35736
               },
               tasks: [ 'copy:main', 'preprocess:admin_dev', 'preprocess:admin_prod']
             },
             admin_sass: {
               files: ['resources/assets/sass/**'],
               options: {
                 nospawn: true,
                 livereload: 35737
               },
               tasks: ['sass:admin']
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
          },
          admin_dev:{
                  options: {
                    context: {
                      MODE: 'prod',
                      BUILD_TS: '<%= ((new Date()).valueOf().toString()) + (Math.floor((Math.random()*1000000)+1).toString()) %>'
                    }
                  },
                  src: 'resources/src/admin/index.template',
                  dest: 'public/index2.html'
              },
         admin_prod:{
                  options: {
                    context: {
                      MODE: 'prod',
                      BUILD_TS: '<%= ((new Date()).valueOf().toString()) + (Math.floor((Math.random()*1000000)+1).toString()) %>'
                    }
                  },
                  src: 'resources/src/admin/index.template',
                  dest: 'resources/views/admin.blade.php'
              }


    },


    connect: {
        server: {
            options: {
                port: 8080,
                base: 'public',
                hostname: '*',
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
                    '^/api': '/api'
                }
              }
            ]
        }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      app: {
        tasks: ['watch:js',
            'watch:html',
            'watch:grunt',
            'watch:sass'
        ]
      },
      admin: {
          tasks: [
              'watch:admin_js',
              'watch:admin_html',
              'watch:admin_sass'
          ]
      }
    }

  });


  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('build:dev', function (target) {
       grunt.task.run([
         'copy:main',
         'copy:fonts',
         /*'htmlhint',*/
         'jshint',
         'sass',
         'concat:basic',
         'preprocess:dev',
         'preprocess:prod'
       ]);
   });

  grunt.registerTask('server', function (target) {
       grunt.task.run([
           'build:dev',
           'configureProxies:server',
           'connect',
           'concurrent:app'
       ]);
   });

   grunt.registerTask('build:admin', function (target) {
        grunt.task.run([
         'copy:main',
         'preprocess:admin_dev',
         'preprocess:admin_prod'
        ]);
    });

   grunt.registerTask('admin', function (target) {
        grunt.task.run([
            'build:admin',
            'configureProxies:server',
            'connect',
            'concurrent:admin'
        ]);
    });



};
