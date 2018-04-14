$(function () {    
    $(document).on("mainAjax", function() {
        main_loading();

        main_initializers();

        main_bindAnimations();

        main_clickHandlers();
    });
});

var isIE9OrBelow = function () {
    return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
}

//Template Manager

function TemplateManager(template) {
    this.template = template;
}

TemplateManager.prototype.generateContent = function (content) {
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
        } else {
            var regex = new RegExp("%%" + text + "%%", "gi");
            finalContent = finalContent.replace(regex, content[text]);
        }
    }

    return finalContent;
}

TemplateManager.prototype.JsonToContent = function (json, maxIteration, revert) {
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
    } else {
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

//LOADING

function main_loading() {
    $ldn = $("#ldn");
    $ldnLogo = $ldn.children("img");
    $body = $("body");

    if (isIE9OrBelow()) {
        $body.removeClass("loading");
        $body.css("overflow", "visible");
        $ldn.css("opacity","0");
    }

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

//INITIALIZERS

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
    }).on("focus", function () {
        var p = Object.keys(projetos);
        var c = Object.keys(cursos);
        $(".autocomplete-content").html(
            '<small style="display: block; padding-top: 5px; padding-left: 16px; color: rgba(0, 0, 0, 0.5);">Sugestões</small>' +
            "<li><span>" + p.pop() + "</span></li>" +
            "<li><span>" + c.pop() + "</span></li>" +
            "<li><span>" + p.pop() + "</span></li>"
        );
    });
}

//ANIMATIONS

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
        var navHeight = window.innerWidth > 600 ? 64 : 0;
        try {
            $('html, body').animate({
                scrollTop: $(elem).offset().top - navHeight
            }, 1500);
        }
        catch (e) {

        }
    }

    $("footer a img").on("mouseenter", function() {
        $(this).css({ "transition": "transform .6s ease-in-out", "transform": "rotateY(360deg)"});
        $(this).one("transitionend", function() {
            $(this).css({ "transition": "none", "transform": "rotateY(0deg)" });
        });
    });
}

//EVENTS

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

function checkLinksProjetos(elems, linkLabel) {
    $(elems).each(function () {
        var $link = $(this).find(linkLabel);
        $.ajax({
            url: $link.attr("href"),
            type: 'HEAD',
            error: function () {
                if ($link.attr("fallback-url") != "" && typeof $link.attr("fallback-url") != "undefined") {
                    $.ajax({
                        url: $link.attr("fallback-url"),
                        success: function() {
                            $link.attr("href", $link.attr("fallback-url"));
                        },
                        error: function () {
                            $link.addClass("disabled");
                        }
                    });
                }
                else {
                    $link.addClass("disabled");
                }
            }
        });
    });
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
            var position = $(this).attr("class").split(" ").filter(function(val) {return  val.match("in-") })[0].split("in-")[1];
            position = position[0].toUpperCase() + position.substr(1);

            var $cardReveal = $(this).find(".card-reveal");

            $cardReveal.addClass("pre" + position);
            setTimeout(function () {
                $cardReveal.addClass("from" + position);
            }, 5);
        });

        $(this).on("out", function () {
            var position = $(this).attr("class").split(" ").filter(function(val) { return val.match("out-") })[0].split("out-")[1];
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
            if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) || isIE9OrBelow()) {
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
            if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) || isIE9OrBelow()) {
                clearAllMobile(e, "");
            }
        });

        function clearAllMobile(e, $notThis) {            
            var $cardReveal = $(_nodes).find(".card-reveal").not($notThis);
            
            $cardReveal.removeClass(function (index, className) {
                return (className.match(/(^|\s)from\S+/g) || []).join(' ');
            });
            $cardReveal.one("transitionend", function() {
                if (!$cardReveal.is("[class*=from]")) {
                    $cardReveal.removeClass(function (index, className) {
                        return (className.match(/(^|\s)pre\S+/g) || []).join(' ');
                    });
                }
            });
        }
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




// class TemplateManager {
//     constructor(template) {
//         this.template = template;
//     }

//     generateContent(content) {
//         var finalContent = this.template;
//         for (var text in content) {
//             if (Array.isArray(content[text])) {

//                 var regex = new RegExp("##", "g");

//                 var i1 = regex.exec(finalContent).index;
//                 var i2 = regex.exec(finalContent).index + 2;

//                 var match = finalContent.substring(i1, i2); //##<div>%TESTE%</div>##

//                 var trimmedMatch = match.substring(2, match.length - 2); //<div>%TESTE%</div>

//                 var partialContent = "";

//                 for (var i in content[text]) {
//                     var regex = new RegExp("%%" + text + "%%", "gi");
//                     partialContent += trimmedMatch.replace(regex, content[text][i]);
//                 }

//                 finalContent = finalContent.replace(match, partialContent);
//             } else {
//                 var regex = new RegExp("%%" + text + "%%", "gi");
//                 finalContent = finalContent.replace(regex, content[text]);
//             }
//         }
//         return finalContent;
//     }

//     JsonToContent(json, maxIteration, revert) {
//         var contents = [],
//             count = 0;

//         if (typeof revert === "undefined" || revert == null) {
//             revert = false;
//         }

//         if (revert) {
//             for (var i = Object.keys(json).length - 1; i >= 0; i--) {
//                 if ((typeof maxIteration != "undefined" && maxIteration != null) && count >= maxIteration) {
//                     break;
//                 }

//                 var content = json[Object.keys(json)[i]]; //e.g. "Projetos 1": {}
//                 var template = new TemplateManager(this.template);

//                 contents.push(template.generateContent(content));

//                 count++;
//             }
//         } else {
//             for (var i = 0; i < Object.keys(json).length; i++) {
//                 if ((typeof maxIteration != "undefined" && maxIteration != null) && count >= maxIteration) {
//                     break;
//                 }

//                 var content = json[Object.keys(json)[i]]; //e.g. "Projetos 1": {}
//                 var template = new TemplateManager(this.template);

//                 contents.push(template.generateContent(content));

//                 count++;
//             }
//         }

//         return contents;
//     }
// }