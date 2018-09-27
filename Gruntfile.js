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
                options: {
                    style: "compressed"
                },
                files: [{
                    expand: true,
                    cwd: 'assets/styles',
                    src: ['*.scss'],
                    dest: 'assets/styles/css',
                    ext: '.min.css'
                }]
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },
            my_target: {
                files: {
                    'assets/js/min/index.min.js': ['assets/js/main.js', 'assets/js/index.js'],
                    'assets/js/min/projetos.min.js': ['assets/js/main.js', 'assets/js/projetos.js'],
                    'assets/js/min/sobre.min.js': ['assets/js/main.js', 'assets/js/sobre.js'],
                    'assets/js/min/contato.min.js': ['assets/js/main.js', 'assets/js/contato.js'],
                    'assets/js/min/error.min.js': ['assets/js/main.js', 'assets/js/error.js'],
                }
            }
        },

        includereplace: {
            options: {
                globals: {
                    main_title: "Pessia",
                    index: "",
                    projetos: "",
                    sobre: "",
                    contato: ""
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
                homepage: 'http://www.thiagopessia.com',
                changefreq: 'monthly',
            }
        },

        watch: {
            sass: {
                files: 'assets/styles/*.scss',
                tasks: ['sass']
            },

            sass: {
                files: 'assets/js/*.js',
                tasks: ['uglify']
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-sitemap');

    // Default task(s).
    grunt.registerTask('default', ['encapsulator']);

    grunt.registerTask('encapsulator', ['sass', 'uglify', 'includereplace', 'sitemap', 'connect', 'watch']);

};