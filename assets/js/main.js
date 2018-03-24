
$(function () {
    $('.collapsible').collapsible();
    $(".button-collapse").sideNav({ closeOnClick: true });
    $(document).ready(function () {
        $('.modal').modal();
    });
    
    loading();
});

function loading() {
    $ldn = $("#ldn");
    $ldnLogo = $ldn.children("img");
    $body = $("body");
    window.onload = function() {
        $ldnLogo.one("animationiteration", function() {
            $ldn.animate({ opacity: 0 }, 1000, function() {
                $body.removeClass("loading");
            });
        });
    };
}