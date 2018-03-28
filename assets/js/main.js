$(function () {    
    // projetos = {
    //     "Projeto 1":
    //         {
    //             "name": "Projeto 1",
    //             "id": "1",
    //             "description": "Proident aliquip quis elit magna reprehenderit esse proident.",
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Projeto 2":
    //         {
    //             "name": "Projeto 2",
    //             "id": "2",
    //             "description": "Consectetur reprehenderit ad magna ut laboris ex excepteur in ad non.",
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Projeto 3":
    //         {
    //             "name": "Projeto 3",
    //             "id": "3",
    //             "description": "Sint non reprehenderit magna consectetur do quis laboris nulla sunt fugiat.",
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Projeto 4":
    //         {
    //             "name": "Projeto 4",
    //             "id": "4",
    //             "description": "Id ea officia aliquip deserunt elit proident irure mollit laboris ullamco.",
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Projeto 5":
    //         {
    //             "name": "Projeto 5",
    //             "id": "5",
    //             "description": "Et consequat velit ex nostrud esse eiusmod sint aliquip veniam cillum id sint.",
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Projeto 6":
    //         {
    //             "name": "Projeto 6",
    //             "id": "6",
    //             "description": "Irure minim sunt id ea tempor.",
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         }
    // };

    // cursos = {
    //     "Curso 1":
    //         {
    //             "name": "Curso 1",
    //             "id": "1",
    //             "tags": ["Que", "Curso", "Legal"],
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Curso 2":
    //         {
    //             "name": "Curso 2",
    //             "id": "2",
    //             "tags": ["Que", "Curso", "Legal"],
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Curso 3":
    //         {
    //             "name": "Curso 3",
    //             "id": "3",
    //             "tags": ["Que", "Curso", "Legal"],
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Curso 4":
    //         {
    //             "name": "Curso 4",
    //             "id": "4",
    //             "tags": ["Que", "Curso", "Legal"],
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Curso 5":
    //         {
    //             "name": "Curso 5",
    //             "id": "5",
    //             "tags": ["Que", "Curso", "Legal"],
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Curso 6":
    //         {
    //             "name": "Curso 6",
    //             "id": "6",
    //             "tags": ["Que", "Curso", "Legal"],
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         },
    //     "Curso 7":
    //         {
    //             "name": "Curso 7",
    //             "id": "7",
    //             "tags": ["Ola", "Tudo", "Bem"],
    //             "img": "/assets/img/old/maps/format/img_12.jpg",
    //             "url": "/assets/img/old/maps/format/img_12.jpg"
    //         }
    // };

    // habilidades = {
    //     "HTML":
    //         {
    //             "name": "HTML",
    //             "img": "/assets/img/html.png",
    //             "url": "https://pt.wikipedia.org/wiki/HTML"
    //         },
    //     "CSS":
    //         {
    //             "name": "CSS",
    //             "img": "/assets/img/css.png",
    //             "url": "https://pt.wikipedia.org/wiki/Cascading_Style_Sheets"
    //         },
    //     "JavaScript":
    //         {
    //             "name": "JavaScript",
    //             "img": "/assets/img/javascript.png",
    //             "url": "https://pt.wikipedia.org/wiki/JavaScript"
    //         },
    //     "Bootstrap":
    //         {
    //             "name": "Bootstrap",
    //             "img": "/assets/img/bootstrap.png",
    //             "url": "http://getbootstrap.com/"
    //         },
    //     "Materialize":
    //         {
    //             "name": "Materialize",
    //             "img": "/assets/img/materialize.png",
    //             "url": "http://materializecss.com/"
    //         },
    //     "JQuery":
    //         {
    //             "name": "JQuery",
    //             "img": "/assets/img/jquery.png",
    //             "url": "https://jquery.com/"
    //         }
    // };

    $(document).on("mainAjax", function() {
        main_loading();

        main_initializers();

        main_bindAnimations();

        main_clickHandlers();
    });
});

class TemplateManager {
    constructor(template) {
        this.template = template;
    }

    generateContent(content) {
        var finalContent = this.template;
        for (var text in content) {
            if (Array.isArray(content[text])) {
                
                var regex = new RegExp("##", "g");

                var i1 = regex.exec(finalContent).index;
                var i2 = regex.exec(finalContent).index + 2;

                var match = finalContent.substring(i1, i2); //##<div>%TESTE%</div>##

                var trimmedMatch = match.substring(2, match.length - 2); //<div>%TESTE%</div>

                var partialContent = "";

                for (var i in content[text]) {
                    var regex = new RegExp("%%" + text + "%%", "gi");
                    partialContent += trimmedMatch.replace(regex, content[text][i]);
                }
                
                finalContent = finalContent.replace(match, partialContent);
            }
            else {
                var regex = new RegExp("%%" + text + "%%", "gi");
                finalContent = finalContent.replace(regex, content[text]);
            }
        }
        return finalContent;
    }

    JsonToContent(json, maxIteration, revert) {
        var contents = [],
            count = 0;

        if (typeof revert === "undefined" || revert == null) {
            revert = false;
        }

        if (revert) {
            for (var i = Object.keys(json).length - 1; i >= 0; i--) {
                if ((typeof maxIteration != "undefined" && maxIteration != null) && count >= maxIteration) {
                    break;
                }
                
                var content = json[Object.keys(json)[i]]; //e.g. "Projetos 1": {}
                var template = new TemplateManager(this.template);

                contents.push(template.generateContent(content));

                count++;
            }
        }
        else {
            for (var i = 0; i < Object.keys(json).length; i++) {
                if ((typeof maxIteration != "undefined" && maxIteration != null) && count >= maxIteration) {
                    break;
                }

                var content = json[Object.keys(json)[i]]; //e.g. "Projetos 1": {}
                var template = new TemplateManager(this.template);

                contents.push(template.generateContent(content));

                count++;
            }
        }
        
        return contents;
    }
}

function main_loading() {
    $ldn = $("#ldn");
    $ldnLogo = $ldn.children("img");
    $body = $("body");
    if (document.readyState == "complete") {
        removeLdn();
    }
    else {
        $(window).on("load", function () {
            removeLdn();
        });
    }

    function removeLdn() {
        $ldnLogo.one("animationiteration", function () {
            $body.trigger("load-finishing");
            $body.css("overflow", "initial");
            $ldn.animate({
                opacity: 0
            }, 1000, function () {
                $body.removeClass("loading");
            });
        });
    }
}

function main_initializers() {
    $('.collapsible').collapsible();
    $(".button-collapse").sideNav({ closeOnClick: true });
    $(document).ready(function () {
        $('.modal').modal();
    });
    
    $('#searchVal').autocomplete({
        data: JsonToAutocomplete([projetos, cursos]),
        limit: 3, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function (val) {
            // Callback function when value is autcompleted.
            var projeto = projetos[val];
            var curso = cursos[val];

            var destination = jQuery.isEmptyObject(projeto) ? "/sobre/#" + curso.id : "/projetos/#" + projeto.id;

            window.location.replace(destination);
        },
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });
}

function main_bindAnimations() {
    if (location.hash) {
        $("body").on("load-finishing", function () {
            window.scrollTo(0, 0);
            animeteScroll(location.hash);
        });
    }

    $(window).on("hashchange", function () {
        window.scrollTo(0, 0);
        animeteScroll(location.hash);
    });

    function animeteScroll(elem) {
        var navHeight = window.innerWidth > 600 ? 64 : 56;
        try {
            $('html, body').animate({
                scrollTop: $(elem).offset().top - navHeight
            }, 1500);
        }
        catch (e) {

        }
    }
}

function main_clickHandlers() {
    $("#searchVal").on("search", function () {
        $autocomplete = $(".autocomplete-content li");
        if ($autocomplete.length == 1) {
            $autocomplete.trigger("mousedown");
        }
    });

    $("#close").on("click", function () {
        $("#searchVal").blur();
        $("#searchVal").val("");
    });
}

function JsonToAutocomplete(contents) {
    var autocomplete = { content: {}, names: {} }

    for (var i = 0; i < contents.length; i++) {
        autocomplete.content = $.extend({}, autocomplete.content, contents[i]);
    }

    for (var i in autocomplete.content) {
        autocomplete.names[i] = null;
    }

    return autocomplete.names;
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
                if (!/Mobi/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent)) {
                    addClass(ev, this, 'in');
                }
            }
        }, false);

        el.addEventListener('mouseleave', function (ev) {
            if (!$(el).is('[class*="out"]')) {
                if (!/Mobi/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent)) {
                    addClass(ev, this, 'out');
                }
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

        $(this).on("click", function (e) {
            if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
                e.preventDefault();
                e.stopPropagation();

                var $cardReveal = $(this).find(".card-reveal");

                clearAllMobile(e, $cardReveal);

                $cardReveal.addClass("preBottom");
                setTimeout(function () {
                    $cardReveal.addClass("fromBottom");
                }, 5);
            }
        });

        $(document).on("click", function(e) {
            clearAllMobile(e,"");
        });

        function clearAllMobile(e, $notThis) {
            if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
                var $cardReveal = $(_nodes).find(".card-reveal").not($notThis);
                
                $cardReveal.removeClass(function (index, className) {
                    return (className.match(/(^|\s)from\S+/g) || []).join(' ');
                });
                $cardReveal.one("transitionend", function() {
                    if (!$cardReveal.is("[class*=from]")) {
                        $cardReveal.removeClass(function (index, className) {
                            return (className.match(/(^|\s)pre\S+/g) || []).join(' ');
                            alert();
                        });
                    }
                });
            }
        }
    });
}