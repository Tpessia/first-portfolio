module.exports = function (grunt) {

    grunt.initConfig({

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/styles',
                    src: ['*.scss'],
                    dest: 'assets/styles/css',
                    ext: '.css'
                }]
            }
        },

        uglify: {
            options: {
                mangle: false, // angular fix
                sourceMap: true
            },
            my_target: {
                files: {
                    'app/app.min.js': ['app/app.js', 'app/services/*.js', 'app/*/*.controller.js']
                }
            }
        },

        watch: {
            sass: {
                files: ['assets/styles/*.scss'],
                tasks: ['sass']
            },

            uglify: {
                files: ['app/{,*/}*.js', '!app/app.min.js'],
                tasks: ['uglify']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['encapsulator']);

    grunt.registerTask('encapsulator', [
        'sass',
        'uglify',
        'watch'
    ]);

};