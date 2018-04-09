$(function() {
    $(document).on("mainAjax", function() {
        $('.modal').modal();

        $("form").on("submit", function (event) {
            event.preventDefault();

            var myData = { nome: $("#first_name").val() + " " + $("#last_name").val(), email: $("#email").val(), assunto: $("#subject").val(), mensagem: $("#message").val().replace(/(?:\r\n|\r|\n)/g, '<br />') }

            $.ajax({
                method: "POST",
                url: "/assets/php/contact.php",
                data: myData,
                success: function (data) {
                    if (data == "1") {
                        $("#email, #subject, #message, #first_name, #last_name").val("").trigger("focusin").trigger("focusout");;
                        $('#modal_success').modal('open');
                    }
                    else {
                        $('#modal_error').modal('open');
                    }
                },
                error: function () {
                    $('#modal_error').modal('open');
                }
            });
        });
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
