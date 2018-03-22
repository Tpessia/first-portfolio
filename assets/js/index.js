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
});