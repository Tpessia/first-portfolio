//CONTROLLER
$(function() {
    $('#search').on("click", function () {
        $("#modal").modal('open');
    });

    $("#searchVal").on("search", function () {
        $("#modal").modal('open');
    });
});