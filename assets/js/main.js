
$(function () {
    projetos = [
        {name: "Projeto 1", id: "1", description: "Proident aliquip quis elit magna reprehenderit esse proident.", img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
        {name: "Projeto 2", id: "2", description: "Consectetur reprehenderit ad magna ut laboris ex excepteur in ad non.", img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
        {name: "Projeto 3", id: "3", description: "Sint non reprehenderit magna consectetur do quis laboris nulla sunt fugiat.", img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
        {name: "Projeto 4", id: "4", description: "Id ea officia aliquip deserunt elit proident irure mollit laboris ullamco.", img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
        {name: "Projeto 5", id: "5", description: "Et consequat velit ex nostrud esse eiusmod sint aliquip veniam cillum id sint.", img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
        {name: "Projeto 6", id: "6", description: "Irure minim sunt id ea tempor.", img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
    ];

    cursos = [
        {name: "Curso 1", id: "1", tags: ["Que", "Curso", "Legal"], img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
        {name: "Curso 2", id: "2", tags: ["Que", "Curso", "Legal"], img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
        {name: "Curso 3", id: "3", tags: ["Que", "Curso", "Legal"], img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
        {name: "Curso 4", id: "4", tags: ["Que", "Curso", "Legal"], img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
        {name: "Curso 5", id: "5", tags: ["Que", "Curso", "Legal"], img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
        {name: "Curso 6", id: "6", tags: ["Que", "Curso", "Legal"], img: "/assets/img/old/maps/format/img_12.jpg", url: "/assets/img/old/maps/format/img_12.jpg"},
    ];

    function getObjByValue(obj, key, value) {
        return obj.filter(function(obj) {return obj[key] === value});
    }

    $('.collapsible').collapsible();
    $(".button-collapse").sideNav({ closeOnClick: true });
    $(document).ready(function () {
        $('.modal').modal();
    });
    
    loading();

    function animeteScroll(elem) {
        var navHeight = window.innerWidth > 600 ? 64 : 56;
        $('html, body').animate({
            scrollTop: $(elem).offset().top - navHeight
        }, 1500);
    }
    if(location.hash) {
        $("body").on("load-finishing", function () {
            window.scrollTo(0, 0);
            animeteScroll(location.hash);
        });
    }
    $(window).on("hashchange", function() {
        window.scrollTo(0, 0);
        animeteScroll(location.hash);
    });

    $('#searchVal.autocomplete').autocomplete({
        data: {
            "Projeto 1": null,
            "Projeto 2": null,
            "Projeto 3": 'https://placehold.it/250x250',
            "Projeto 4": null,
            "Projeto 5": null,
            "Projeto 6": 'https://placehold.it/250x250',
            "Curso 1": null,
            "Curso 2": null,
            "Curso 3": 'https://placehold.it/250x250',
            "Curso 4": null,
            "Curso 5": null,
            "Curso 6": 'https://placehold.it/250x250'
        },
        limit: 3, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function (val) {
            // Callback function when value is autcompleted.
            var projeto = getObjByValue(projetos, "name", val)[0];
            var curso = getObjByValue(cursos, "name", val)[0];

            var destination = jQuery.isEmptyObject(projeto) ? "/sobre.html#" + curso.id : "/projetos.html#" + projeto.id;

            window.location.replace(destination);
        },
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    }).keypress(function (e) {
        if (e.which == 13) {
            $autocomplete = $(".autocomplete-content li");
            if ($autocomplete.length == 1) {
                $autocomplete.trigger("mousedown");
            }
        }
    });
});

function loading() {
    $ldn = $("#ldn");
    $ldnLogo = $ldn.children("img");
    $body = $("body");
    window.onload = function() {
        $ldnLogo.one("animationiteration", function () {
            $body.trigger("load-finishing");
            $body.css("overflow","initial");
            $ldn.animate({ opacity: 0 }, 1000, function() {
                $body.removeClass("loading");
            });
        });
    };
}

function smartHover(elem) {
    var nodes = document.querySelectorAll(elem),
        _nodes = [].slice.call(nodes, 0);

    var getDirection = function (ev, obj) {
        var w = obj.offsetWidth,
            h = obj.offsetHeight,
            x = (ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? (h / w) : 1)),
            y = (ev.pageY - obj.offsetTop - (h / 2) * (h > w ? (w / h) : 1)),
            d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

        return d;
    };

    var addClass = function (ev, obj, state) {
        var direction = getDirection(ev, obj),
            class_suffix = "";

        $(obj).removeClass(function (index, className) {
            return (className.match(/(^|\s)in-\S+/g) || []).join(' ');
        }).removeClass(function (index, className) {
            return (className.match(/(^|\s)out-\S+/g) || []).join(' ');
        });

        switch (direction) {
            case 0:
                class_suffix = '-top';
                break;
            case 1:
                class_suffix = '-right';
                break;
            case 2:
                class_suffix = '-bottom';
                break;
            case 3:
                class_suffix = '-left';
                break;
        }

        obj.classList.add(state + class_suffix);

        $(obj).trigger(state);
    };

    _nodes.forEach(function (el) {
        el.addEventListener('mouseover', function (ev) {
            if (!$(el).is('[class*="in"]')) {
                addClass(ev, this, 'in');
            }
        }, false);

        el.addEventListener('mouseleave', function (ev) {
            if (!$(el).is('[class*="out"]')) {
                addClass(ev, this, 'out');
            }
        }, false);
    });

    $(_nodes).each(function () {
        $(this).on("in", function () {
            var position = $(this).attr("class").split(" ").filter(val => val.match("in-"))[0].split("in-")[1];
            position = position[0].toUpperCase() + position.substr(1);

            var $cardReveal = $(this).find(".card-reveal");

            $cardReveal.addClass("pre" + position);
            setTimeout(function () {
                $cardReveal.addClass("from" + position);
            }, 5);
        });

        $(this).on("out", function () {
            var position = $(this).attr("class").split(" ").filter(val => val.match("out-"))[0].split("out-")[1];
            position = position[0].toUpperCase() + position.substr(1);

            var $cardReveal = $(this).find(".card-reveal");

            $cardReveal.removeClass(function (index, className) {
                return (className.match(/(^|\s)pre\S+/g) || []).join(' ');
            }).addClass("pre" + position);

            $cardReveal.removeClass(function (index, className) {
                return (className.match(/(^|\s)from\S+/g) || []).join(' ');
            });
            $cardReveal.one("transitionend", function () {
                $cardReveal.removeClass(function (index, className) {
                    return (className.match(/(^|\s)pre\S+/g) || []).join(' ');
                });
            });
        });

        $(this).on("click", function () {
            if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
                var $cardReveal = $(this).find(".card-reveal");
                //melhorar
                $cardReveal.addClass("preBottom");
                setTimeout(function () {
                    $cardReveal.addClass("fromBottom");
                }, 5);
            }
        });
    });
}