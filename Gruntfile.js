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
            options: {
                sourcemap: 'none',
            },
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

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/styles/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/styles/css/min',
                    ext: '.min.css'
                }]
            }
        },

        includereplace: {
            options: {
                globals: {
                    title: "Pessia",
                    description: "",
                    file: "index",
                    index: "",
                    projetos: "",
                    sobre: "",
                },
            },
            dist: {
                files: [
                    { 
                        cwd: 'Views',
                        src: '*.html',
                        dest: './',
                        expand: true,
                        rename: function (dest, src) {
                            if (src.split("/").pop().split(".")[0] != "index") {
                                return dest + src.split("/").pop().split(".")[0] + '/index.html';
                            }
                            else {
                                return dest + "index.html";
                            }
                        }
                    },
                ]
            }
        },

        sitemap: {
            dist: {
                pattern: ['Views/*.html', '!Views/403.html'],
                siteRoot: './',
                homepage: 'http://www.pessia.xyz',
                changefreq: 'monthly',
            }
        },

        watch: {
            sass: {
                files: 'assets/styles/*.scss',
                tasks: ['sass', 'cssmin']
            },

            html: {
                files: ['Views/{,*/}*.html'],
                tasks: ['includereplace']
            },

            sitemap: {
                files: ['Views/{,*/}*.html'],
                tasks: ['sitemap']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-sitemap');

    // Default task(s).
    grunt.registerTask('default', ['encapsulator']);

    grunt.registerTask('encapsulator', ['sass', 'cssmin', 'connect', 'includereplace', 'sitemap', 'watch']);

};