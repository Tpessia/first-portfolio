function smartHover(elem) {
    var pageX,
        pageY;

    $(elem).each(function () {
        var $elem = $(this),
            posicao = getOffsets($elem);

        $elem.on("mouseenter", function () {
            // console.log($elem.closest(".col").index());
            if (pageX < posicao.left) {
                // console.log("left");
                $(this).removeClass(function (index, className) {
                    return (className.match(/(^|\s)in-\S+/g) || []).join(' ');
                }).addClass("in-left");
                $(this).trigger('hover-in');
            }
            else if (pageX > posicao.right) {
                // console.log("right");
                $(this).removeClass(function (index, className) {
                    return (className.match(/(^|\s)in-\S+/g) || []).join(' ');
                }).addClass("in-right");
                $(this).trigger('hover-in');
            }
            else if (pageY < posicao.top) {
                // console.log("top");
                $(this).removeClass(function (index, className) {
                    return (className.match(/(^|\s)in-\S+/g) || []).join(' ');
                }).addClass("in-top");
                $(this).trigger('hover-in');
            }
            else if (pageY > posicao.bottom) {
                // console.log("bottom");
                $(this).removeClass(function (index, className) {
                    return (className.match(/(^|\s)in-\S+/g) || []).join(' ');
                }).addClass("in-bottom");
                $(this).trigger('hover-in');
            }
        });

        $elem.on("mouseleave", function () {
            $this = $(this);
            setTimeout(function () {
                if (pageX < posicao.left) {
                    $this.removeClass(function (index, className) {
                        return (className.match(/(^|\s)out-\S+/g) || []).join(' ');
                    }).addClass("out-left");
                    $this.trigger('hover-out');
                }
                else if (pageX > posicao.right) {
                    $this.removeClass(function (index, className) {
                        return (className.match(/(^|\s)out-\S+/g) || []).join(' ');
                    }).addClass("out-right");
                    $this.trigger('hover-out');
                }
                else if (pageY < posicao.top) {
                    $this.removeClass(function (index, className) {
                        return (className.match(/(^|\s)out-\S+/g) || []).join(' ');
                    }).addClass("out-top");
                    $this.trigger('hover-out');
                }
                else if (pageY > posicao.bottom) {
                    $this.removeClass(function (index, className) {
                        return (className.match(/(^|\s)out-\S+/g) || []).join(' ');
                    }).addClass("out-bottom");
                    $this.trigger('hover-out');
                }
            }, 10);
        });

        $elem.on("hover-in", function () {
            var position = $(this).attr("class").split(" ").filter(val => val.match("in-"))[0].split("in-")[1];
            position = position[0].toUpperCase() + position.substr(1);

            $cardReveal = $(this).find(".card-reveal");

            $cardReveal.addClass("pre" + position);
            setTimeout(function () {
                $cardReveal.addClass("from" + position);
                $elem.removeClass(function (index, className) {
                    return (className.match(/(^|\s)in-\S+/g) || []).join(' ');
                });
            }, 10);
        });

        $elem.on("hover-out", function () {
            var position = $(this).attr("class").split(" ").filter(val => val.match("out-"))[0].split("out-")[1];
            position = position[0].toUpperCase() + position.substr(1);

            $cardReveal = $(this).find(".card-reveal");

            $cardReveal.removeClass(function (index, className) {
                return (className.match(/(^|\s)pre\S+/g) || []).join(' ');
            }).addClass("pre" + position);

            $cardReveal.removeClass(function (index, className) {
                return (className.match(/(^|\s)from\S+/g) || []).join(' ');
            });
            $cardReveal.on("transitionend", function () {
                $cardReveal.removeClass(function (index, className) {
                    return (className.match(/(^|\s)pre\S+/g) || []).join(' ');
                });
                $elem.removeClass(function (index, className) {
                    return (className.match(/(^|\s)out-\S+/g) || []).join(' ');
                });
            });
        });
    });

    $(document).mousemove(function (e) {
        pageX = e.pageX;
        pageY = e.pageY;
    });

    function getOffsets(elem) {
        var offset = elem.offset();

        offsets = {};

        offsets.top = offset.top;
        offsets.left = offset.left;

        offsets.bottom = offsets.top + elem.outerHeight();
        offsets.right = offsets.left + elem.outerWidth();

        return offsets;
    }
}