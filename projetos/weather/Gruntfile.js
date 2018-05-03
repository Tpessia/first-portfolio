module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        connect: {
            preview: {
                options: {
                    port: 9000,
                    hostname: '*',
                    base: './'
                }
            }
        },

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

        watch: {
            sass: {
                files: 'assets/styles/*.scss',
                tasks: ['sass']
            },

            html: {
                files: ['Views/{,*/}*.html'],
                tasks: ['includereplace']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['encapsulator']);

    grunt.registerTask('encapsulator', ['sass', 'connect', 'watch']);

};