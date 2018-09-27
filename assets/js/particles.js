$(function () {

    // Initial config
    
    function initializeParticles(pBoxId, targetElem) {
        // Destroy previous
        if (window["pJSDom"] instanceof Array && window["pJSDom"].length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window["pJSDom"] = [];
        }

        // Set element length
        $("#" + pBoxId).css("height", $(targetElem)[0].offsetHeight);

        // Load particles
        particlesJS.load(pBoxId, '/lib/particles.json', function () {
            console.log('callback - particles.js config loaded');
        });
    }

    // Events

    $(window).resize(function () {
        initializeParticles("particles-js", "#cursos-container");
    });

    $(document).on("mainAjax", function () {
        initializeParticles("particles-js", "#cursos-container");
    });

});