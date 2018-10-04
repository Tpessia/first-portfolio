$(function() {
    $(document).on("mainAjax", function () {
        createContent();

        initializers();

        bindAnimations();

        clickHandlers();

        // checkLinksProjetos("#projetos .hide-on-med-and-up .col", ".visitar");
    });

    $.ajax({
        url: "/assets/contents/projetos.json",
        datatype: "json",
        success: function(data) {
            projetos = data;
        },
        complete: function() {
            $(document).trigger("projetos");
        }
    });

    $(document).on("projetos", function () {
        $.ajax({
            url: "/assets/contents/cursos.json",
            datatype: "json",
            success: function(data) {
                cursos = data;
            },
            complete: function() {
                $(document).trigger("cursos");
            }
        });
    });

    $(document).on("cursos", function () {
        $.ajax({
            url: "/assets/contents/habilidades.json",
            datatype: "json",
            success: function(data) {
                habilidades = data;
            },
            complete: function() {
                $(document).trigger("mainAjax");
            }
        });
    });
});

function createContent() {
    carouselProjetos();
    gridProjetos();
    gridCursos();
    gridHabilidades();
    
    function carouselProjetos() {
        var carousel = '<div class="carousel-item %%ISWHITE%%"><a href="%%URL%%" target="_blank"><div class="bg-carousel" style="background-image: url(%%IMG%%);" title="%%NAME%%"></div></a></div>';

        var carouselT = new TemplateManager(carousel);

        var projetosCount = ["one", "two", "three", "four", "five"];

        for (var projeto in projetos) {
            projetos[projeto].count = projetosCount.shift();
        }

        var carouselContent = carouselT.JsonToContent(projetos, 5, true);

        $("#projetos .carousel .verMais").parent("a").before(carouselContent);
    }

    function gridProjetos() {
        var flatGrid = '<div class="col s12 m6"><div class="bg-projetos" style="background-image: url(%%IMG%%)"><div class="content-projetos"><div class="title">%%NAME%%</div><div class="hidden-content">%%DESCRIPTION%%</div><a href="%%URL%%" target="_blank" class="visitar" fallback-url="%%FALLBACK_URL%%">Visitar</a><span class="close hide">x</span></div></div></div>';

        var flatGridT = new TemplateManager(flatGrid);

        var flatGridContent = flatGridT.JsonToContent(projetos, 5, true);

        $("#projetos .hide-on-med-and-up .verMais").closest(".col").before(flatGridContent);
    }

    function gridCursos() {
        var cursosGrid = '<div class="col l4 m6 s12"><div class="card"><div class="card-image"><div class="card-bg" style="background-image: url(%%IMG%%)"></div></div><div class="card-action grey darken-4 white-text">%%NAME%%</div><div class="card-reveal"><span class="card-title grey-text text-darken-4" style="font-weight: 400;">%%NAME%%<a class="certificate" href="%%CERTIFICATE_URL%%" target="_blank"><img src="/assets/img/icons/certificate.png"></a></span><div class="tags">##<div>%%TAGS%%</div>##</div><div class="course-link"><a href="%%URL%%" target="_blank">Visitar curso</a></div></div></div></div>';
        
        var cursosGridT = new TemplateManager(cursosGrid);

        var cursosGridContent = cursosGridT.JsonToContent(cursos, 5, true);
        
        $("#cursos .col.verMais").before(cursosGridContent);
    }

    function gridHabilidades() {
        var habilidadesGrid = '<div class="col s6 m4"><img src="%%IMG%%" alt="%%NAME%%" class="tooltipped" data-position="bottom" data-tooltip="%%LEVEL%%"></div>';

        var habilidadesT = new TemplateManager(habilidadesGrid);

        var habilidadesContent = habilidadesT.JsonToContent(habilidades);

        $("#habilidades h1").after(habilidadesContent);
    }
}

function initializers() {
    //Materialize
    $('.tooltipped').tooltip({
        delay: 100
    });

    $('.carousel').carousel({
        fullWidth: true,
        indicators: true
    });    
}

function bindAnimations() {
    smartHover("#cursos .col:not(.verMais)>.card");

    $("#cursos .verMais .card").on('mouseenter', function () {
        $arrow = $(this).find(".arrow");
        var isAnimating = $arrow.filter(":animated").length > 0;
        if (window.innerWidth >= 992 && !isAnimating) {
            $arrow.animate({
                left: '100%'
            }, 500, function () {
                $arrow.css('left', '-100%');
                $arrow.animate({
                    left: '0'
                }, 500);
            });
        }
    });

    // Carousel
    var interval = setInterval(function () {
        $('.carousel').carousel('next');
    }, 3500);
    $('.carousel').on("click", function () {
        clearInterval(interval);

        interval = setInterval(function () {
            $('.carousel').carousel('next');
        }, 3500);
    });
    $('.carousel').on("mouseenter", function () {
        clearInterval(interval);
    });
    $('.carousel').on("mouseleave", function () {
        interval = setInterval(function () {
            $('.carousel').carousel('next');
        }, 3500);
    });
}

function clickHandlers() {
    //duplicado do projetos.js
    $(".content-projetos").on("click", function (e) {
        if (!$(e.target).hasClass('visitar') || !$(this).hasClass('mobileAnim')) {
            $(this).toggleClass('mobileAnim');
        }
    });

    // $(".tags div").on("click", function () { //click nas habilidades leva ao wikipedia
    //     window.open("https://pt.wikipedia.org/wiki/" + $(this).html());
    // });
}