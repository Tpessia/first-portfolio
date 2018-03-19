var script = document.createElement("script"); script.src = "/assets/js/pessia-lib.js"; document.head.appendChild(script); //load lib

//CONTROLLER
$(function() {
    $('#search').on("click", function () {
        $("#modal").modal('open');
    });

    $("#searchVal").on("search", function () {
        $("#modal").modal('open');
    });
});