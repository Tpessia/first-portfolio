$(function () {
    $(document).on("mainAjax", function () {
        createContent();

        clickHandlers(); //arrumar pois vai quebrar no ajax async na hora de chamar os jsons        
    });

    $.ajax({
        url: "/assets/contents/projetos.json",
        datatype: "json",
        success: function (data) {
            projetos = data;
            $(document).trigger("projetos");
        },
    });

    $(document).on("projetos", function () {
        $.ajax({
            url: "/assets/contents/cursos.json",
            datatype: "json",
            success: function (data) {
                cursos = data;
                $(document).trigger("mainAjax");
            },
        });
    });
});

function createContent() {
    gridProjetos();

    function gridProjetos() {
        var projetosGrid = '<div class="col s12 m6"><div id="%%ID%%" class="bg-projetos" style="background-image: url(%%IMG%%)"><div class="content-projetos"><div class="title">%%NAME%%</div><div class="hidden-content">%%DESCRIPTION%%</div><a href="%%URL%%" target="_blank" class="visitar">Visitar</a><span class="close hide">x</span></div></div></div>';

        var projetosGridT = new TemplateManager(projetosGrid);

        var projetosGridContent = projetosGridT.JsonToContent(projetos, null, true);

        $(".container .row").html(projetosGridContent);
    }
}

function clickHandlers() {
    $(".content-projetos").on("click", function (e) { //previne o click no elemento "visitar" antes do bubble up
        if (!$(e.target).hasClass('visitar') || !$(this).hasClass('mobileAnim')) {
            $(this).toggleClass('mobileAnim');
        }
    });
}