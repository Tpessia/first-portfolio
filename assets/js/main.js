
$(() => {
    loading();
});

function loading() {
    $logo = $(".brand-logo img");
    $body = $("body");
    window.onload = () => {
        $logo.one("animationiteration", () => {
            $body.removeClass("start");
            $body.addClass("onprogress");
        });
    };

    $logo.one("transitionend", () => {
        $body.removeClass("loading onprogress");
    });
}