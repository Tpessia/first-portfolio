$(function() {
    clickHandlers(); //arrumar pois vai quebrar no ajax async na hora de chamar os jsons
});

function clickHandlers() {
    $(".content-projetos").on("click", function (e) { //previne o click no elemento "visitar" antes do bubble up
        if (!$(e.target).hasClass('visitar') || !$(this).hasClass('mobileAnim')) {
            $(this).toggleClass('mobileAnim');
        }
    });
}