$(function() {
    $(document).on("mainAjax", function () {
        createContent();

        initializers();

        bindAnimations(); //arrumar pois vai quebrar no ajax async na hora de chamar os jsons

        clickHandlers(); //arrumar pois vai quebrar no ajax async na hora de chamar os jsons
    });

    $.ajax({
        url: "/assets/contents/projetos.json",
        datatype: "json",
        success: function (data) {
            projetos = data;
            $(document).trigger("projetos");
        },
    });

    $(document).on("projetos", function () {
        $.ajax({
            url: "/assets/contents/cursos.json",
            datatype: "json",
            success: function (data) {
                cursos = data;
                $(document).trigger("cursos");
            },
        });
    });

    $(document).on("cursos", function () {
        $.ajax({
            url: "/assets/contents/habilidades.json",
            datatype: "json",
            success: function (data) {
                habilidades = data;
                $(document).trigger("mainAjax");
            },
        });
    });
});

function createContent() {
    carouselProjetos();
    gridProjetos();
    gridCursos();
    gridHabilidades();
    
    function carouselProjetos() {
        var carousel = '<div class="carousel-item red white-text" href="#%%COUNT%%!"><a href="%%URL%%" target="_blank"><div class="bg-carousel" style="background-image: url(%%IMG%%);"></div></a></div>';

        var carouselT = new TemplateManager(carousel);

        var projetosCount = ["one", "two", "three", "four", "five"];

        for (var projeto in projetos) {
            projetos[projeto].count = projetosCount.shift();
        }

        var carouselContent = carouselT.JsonToContent(projetos, 5, true);

        $("#projetos .carousel .verMais").parent("a").before(carouselContent);
    }

    function gridProjetos() {
        var flatGrid = '<div class="col s12 m6"><div class="bg-projetos" style="background-image: url(%%IMG%%)"><div class="content-projetos"><div class="title">%%NAME%%</div><div class="hidden-content">%%DESCRIPTION%%</div><a href="%%URL%%" target="_blank" class="visitar">Visitar</a><span class="close hide">x</span></div></div></div>';

        var flatGridT = new TemplateManager(flatGrid);

        var flatGridContent = flatGridT.JsonToContent(projetos, 5, true);

        $("#projetos .hide-on-med-and-up .verMais").closest(".col").before(flatGridContent);
    }

    function gridCursos() {
        var cursosGrid = '<div class="col l4 m6 s12"><div class="card"><div class="card-image"><div class="card-bg" style="background-image: url(%%IMG%%)"></div></div><div class="card-action grey darken-4 white-text">%%NAME%%</div><div class="card-reveal"><span class="card-title grey-text text-darken-4" style="font-weight:  400;">%%NAME%%</span><div class="tags">##<div>%%TAGS%%</div>##</div><div class="course-link"><a href="%%URL%%" target="_blank">Visitar curso</a></div></div></div></div>';
        
        var cursosGridT = new TemplateManager(cursosGrid);

        var cursosGridContent = cursosGridT.JsonToContent(cursos, 5, true);
        
        $("#cursos .col.verMais").before(cursosGridContent);
    }

    function gridHabilidades() {
        var habilidadesGrid = '<a href="%%URL%%" target="_blank"><div class="col s6 m4"><img src="%%IMG%%"></div></a>';

        var habilidadesT = new TemplateManager(habilidadesGrid);

        var habilidadesContent = habilidadesT.JsonToContent(habilidades);

        $("#habilidades h1").after(habilidadesContent);
    }
}

function initializers() {
    var elem = document.querySelector('.carousel');
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });
}

function bindAnimations() {
    smartHover("#cursos .col:not(.verMais)>.card");

    $("#cursos .verMais .card").on('mouseenter', function () {
        $arrow = $(this).find(".arrow");
        $arrow.animate({
            left: '100%'
        }, 500, function () {
            $arrow.css('left', '-100%');
            $arrow.animate({
                left: '0'
            }, 500);
        });
    });

    $("#projetos .carousel .verMais").on("mouseenter", function () {
        $arrow = $(this).find(".arrow");
        $arrow.animate({
            'margin-left': '150%'
        }, 500, function () {
            $arrow.css('margin-left', '-150%');
            $arrow.animate({
                'margin-left': '0'
            }, 500);
        });
    });
}

function clickHandlers() {
    //duplicado do projetos.js
    $(".content-projetos").on("click", function (e) {
        if (!$(e.target).hasClass('visitar') || !$(this).hasClass('mobileAnim')) {
            $(this).toggleClass('mobileAnim');
        }
    });

    $(".tags div").on("click", function () { //click nas habilidades leva ao wikipedia
        window.open("https://pt.wikipedia.org/wiki/" + $(this).html());
    });
}


// function smartHover(elem) {
//     var pageX,
//         pageY;
        
//     $(elem).each(function () {
//         var $elem = $(this),
//             posicao = getOffsets($elem);

//         $elem.on("mouseenter", function () {
//             var $this = $(this);
//             var dirIn;

//             if (pageX < posicao.left) {
//                 dirIn = "left";
//             }
//             else if (pageX > posicao.right) {
//                 dirIn = "right";
//             }
//             else if (pageY < posicao.top) {
//                 dirIn = "top";
//             }
//             else if (pageY > posicao.bottom) {
//                 dirIn = "bottom";
//             }

//             $this.removeClass(function (index, className) {
//                 return (className.match(/(^|\s)in-\S+/g) || []).join(' ');
//             }).addClass("in-" + dirIn);

//             $this.trigger('hover-in');
//         });

//         $elem.on("mouseleave", function () {
//             var $this = $(this);
//             var dirOut;

//             setTimeout(function () {
//                 if (pageX < posicao.left) {
//                     dirOut = "left";
//                 }
//                 else if (pageX > posicao.right) {
//                     dirOut = "right";
//                 }
//                 else if (pageY < posicao.top) {
//                     dirOut = "top";
//                 }
//                 else if (pageY > posicao.bottom) {
//                     dirOut = "bottom";
//                 }

//                 $this.removeClass(function (index, className) {
//                     return (className.match(/(^|\s)out-\S+/g) || []).join(' ');
//                 }).addClass("out-" + dirOut);

//                 $this.trigger('hover-out');
//             }, 10);
//         });

//         $elem.on("hover-in", function () {
//             var position = $(this).attr("class").split(" ").filter(val => val.match("in-"))[0].split("in-")[1];
//             position = position[0].toUpperCase() + position.substr(1);

//             var $cardReveal = $(this).find(".card-reveal");

//             $cardReveal.addClass("pre" + position);
//             setTimeout(function () {
//                 $cardReveal.addClass("from" + position);
//                 $elem.removeClass(function (index, className) {
//                     return (className.match(/(^|\s)in-\S+/g) || []).join(' ');
//                 });
//             }, 10);
//         });

//         $elem.on("hover-out", function () {
//             var position = $(this).attr("class").split(" ").filter(val => val.match("out-"))[0].split("out-")[1];
//             position = position[0].toUpperCase() + position.substr(1);

//             var $cardReveal = $(this).find(".card-reveal");

//             $cardReveal.removeClass(function (index, className) {
//                 return (className.match(/(^|\s)pre\S+/g) || []).join(' ');
//             }).addClass("pre" + position);

//             $cardReveal.removeClass(function (index, className) {
//                 return (className.match(/(^|\s)from\S+/g) || []).join(' ');
//             });
//             $cardReveal.one("transitionend", function () {
//                 $cardReveal.removeClass(function (index, className) {
//                     return (className.match(/(^|\s)pre\S+/g) || []).join(' ');
//                 });
//                 $elem.removeClass(function (index, className) {
//                     return (className.match(/(^|\s)out-\S+/g) || []).join(' ');
//                 });
//             });
//         });
//     });

//     $(document).mousemove(function (e) {
//         pageX = e.pageX;
//         pageY = e.pageY;
//     });

//     function getOffsets(elem) {
//         var offset = elem.offset();

//         offsets = {};

//         offsets.top = offset.top;
//         offsets.left = offset.left;

//         offsets.bottom = offsets.top + elem.outerHeight();
//         offsets.right = offsets.left + elem.outerWidth();

//         return offsets;
//     }
// }