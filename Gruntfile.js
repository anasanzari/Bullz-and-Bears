module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'resources/src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
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
      }
    },
    concat: {
      basic: {
        src: ['resources/src/app/*.js'],
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
    },
    uglify: {
      my_target: {
        files: {
          'public/app/app.min.js': ['resources/src/app/*.js']
        }
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      files: ['resources/**/*.js','resources/**/*.scss','resources/**/*.html'],
      tasks: ['jshint','sass','concat:basic','copy:main']
    },
    connect: {
        server: {
            options: {
                port: 9001,
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('server', function (target) {
       grunt.task.run([
           'configureProxies:server',
           'connect',
           'watch'
       ]);
   });

};
