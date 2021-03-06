module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
    ' * Main Banki.ru 10 Years Promo v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
    ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
    ' */\n',

    // Task configuration.
    clean: {
      dist: ['dist'],
      icons: ['assets/icons']
    },
    copy: {
      fonts: {
        expand: true,
        cwd: 'assets/fonts/',
        src: '*',
        dest: 'dist/fonts'
      },
      images: {
        expand: true,
//				cwd: '.',
        flatten: true,
        src: ['assets/img/*', 'vendor/bower/slick-carousel/slick/*.gif'],
        dest: 'dist/img'
      },
      styles: {
        expand: true,
        flatten: true,
        src: ['vendor/bower/skrollr/examples/fixed-positioning.css'],
        dest: 'dist/css'
      },
      icons: {
        expand: true,
        cwd: 'assets/icons/',
        src: '**/*',
        dest: 'dist/icons'
      }
    },
    concat: {
      options: {
        separator: ';',
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= pkg.build.js %>',
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['assets/js/main.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
      compile: {
        options: {
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        files: {
          'assets/css/<%= pkg.name %>.css': 'assets/less/main.less'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      core: {
        options: {
          //map: true
        },
        src: 'assets/css/<%= pkg.name %>.css'
      }
    },
    cssmin: {
      combine: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': '<%= pkg.build.css %>'
        }
      },
      minify: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
    grunticon: {
      icons: {
        files: [{
          expand: true,
          cwd: 'assets/svg/',
          src: ['*.svg'],
          dest: "assets/icons"
        }],
        options: {
          cssprefix: '.icon-',
          colors: {
            black: '#000000',
            white: '#ffffff',
            orange: '#f1c40f',
            grey: '#7f8c8d'
          },
          dynamicColorOnly: true
        }
      }
    },
    watch: {
      src: {
        files: 'assets/js/*.js',
        tasks: ['dist-js']
      },
      less: {
        files: 'assets/less/**/*.less',
        tasks: ['dist-css']
      },
      all: {
        files: ['<%= watch.less.files %>', '<%= watch.src.files %>'],
        tasks: ['default']
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compile']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer', 'cssmin']);

  // Icons
  grunt.registerTask('dist-icons', ['grunticon:icons', 'copy:icons']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'copy:fonts', 'copy:images', 'copy:styles', 'copy:icons', 'dist-css', 'dist-js', 'dist-icons']);

};