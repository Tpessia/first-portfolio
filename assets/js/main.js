
$(function () {
    $('.collapsible').collapsible();
    $(".button-collapse").sideNav({ closeOnClick: true });
    $(document).ready(function () {
        $('.modal').modal();
    });
    
    loading();
    $("#ldn").on("transitionend", function () {
        alert();
    });

    if(location.hash) {
        $("body").on("load-finishing", function () {
            window.scrollTo(0, 0);
            $('html, body').animate({
                scrollTop: $(location.hash).offset().top - 64
            }, 1500);
        });
    }
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