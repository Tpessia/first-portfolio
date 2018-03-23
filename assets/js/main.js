
$(function () {
    $('.collapsible').collapsible();
    $(".button-collapse").sideNav({ closeOnClick: true });
    $(document).ready(function () {
        $('.modal').modal();
    });
    
    loading();
});

function loading() {
    $logo = $(".brand-logo img");
    $body = $("body");
    window.onload = function() {
        $logo.one("animationiteration", function() {
            $body.removeClass("start");
            $body.addClass("onprogress");

            if (/*$(window).scrollTop() != 0*/true) {
                $body.removeClass("loading onprogress");
            }
            else {
                $logo.one("transitionend", function () {
                    $body.removeClass("loading onprogress");
                });
            }
        });
    };
}