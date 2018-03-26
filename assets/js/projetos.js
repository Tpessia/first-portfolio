$(function() {
    // $(".content-projetos").each(function () {
    //     this.addEventListener('click', function () { $(this).addClass('mobileAnim'); }, true);
    // });
    // $(".close").each(function() {
    //     this.addEventListener('click', function () { $(this).closest('.content-projetos').removeClass('mobileAnim'); }, true);
    // });
    $(".content-projetos").on("click", function (e) {
        if (!$(e.target).hasClass('visitar') || !$(this).hasClass('mobileAnim')) {
            $(this).toggleClass('mobileAnim');
        }
    });
});