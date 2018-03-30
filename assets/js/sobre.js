$(function () {
    $(document).on("mainAjax", function () {
        createContent();

        bindAnimations(); //arrumar pois vai quebrar no ajax async na hora de chamar os jsons      
    });

    $.ajax({
        url: "/assets/contents/projetos.json",
        datatype: "json",
        success: function(data) {
            projetos = data;
        },
        complete: function() {
            $(document).trigger("projetos");
        }
    });

    $(document).on("projetos", function () {
        $.ajax({
            url: "/assets/contents/cursos.json",
            datatype: "json",
            success: function(data) {
                cursos = data;
            },
            complete: function() {
                $(document).trigger("mainAjax");
            }
        });
    });
});

function createContent() {
    gridCursos();

    function gridCursos() {
        var cursosGrid = '<div class="col l4 m6 s12"><div id="%%ID%%" class="card"><div class="card-image"><div class="card-bg" style="background-image: url(%%IMG%%)"></div></div><div class="card-action grey darken-4 white-text">%%NAME%%</div><div class="card-reveal"><span class="card-title grey-text text-darken-4" style="font-weight: 400;">%%NAME%%</span><div class="tags">##<div>%%TAGS%%</div>##</div><div class="course-link"><a href="%%URL%%" target="_blank">Visitar curso</a></div></div></div></div>';

        var cursosGridT = new TemplateManager(cursosGrid);

        var cursosGridContent = cursosGridT.JsonToContent(cursos, null, true);

        $("#cursos").html(cursosGridContent);
    }
}

function bindAnimations() {
    smartHover("#cursos .card");
}