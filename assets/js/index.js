//CONTROLLER
$(function() {
    $('#search').on("click", function () {
        $("#modal").modal('open');
    });

    $("#searchVal").on("search", function () {
        $("#modal").modal('open');
    });

    var elem = document.querySelector('.carousel');
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

    smartHover("#cursos .card");
});

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
            if(!$(el).is('[class*="in"]')) {
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