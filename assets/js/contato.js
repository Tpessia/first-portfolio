$(function() {
    $('.modal').modal();

    $("#formulario").on("submit", function (event) {
        event.preventDefault();

        var myData = { nome: $("#first_name").val() + " " + $("#last_name").val(), email: $("#email").val(), assunto: $("#subject").val(), mensagem: $("#message").val().replace(/(?:\r\n|\r|\n)/g, '<br />') }

        $.ajax({
            method: "POST",
            url: "/assets/php/contact.php",
            data: myData,
            success: function () {
                $("#email, #subject, #message, #first_name, #last_name").val("");
                $('#modal_success').modal('open');
            },
            error: function () {
                $('#modal_error').modal('open');;
            }
        });
    });
});