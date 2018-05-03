$(function () {

    initializers();

    animations();

});

function initializers() {

    datepickers = M.Datepicker.init($$('.datepicker'), {
        'autoClose': true,
        'format': 'mmm dd, yyyy',
        'minDate': new Date('1996-06-30 00:00'),
        'yearRange': [1996, new Date().getFullYear()],
        'i18n': { // Internacionalização
            'cancel': 'Cancelar',
            'clear': 'Limpar',
            'months': [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
            ],
            'monthsShort': [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez'
            ],
            'weekdays': [
                'Domingo',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sábado'
            ],
            'weekdaysShort': [
                'Dom',
                'Seg',
                'Ter',
                'Qua',
                'Qui',
                'Sex',
                'Sab'
            ],
            'weekdaysAbbrev': ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
        }
    });
    
    $.ajax({
        url: "get-last.php",
        success: function (data) {
            datepickers[0].options.maxDate = new Date(data + " 00:00");
        }
    });

    $("#date-form").on("submit", function () {
        $.ajax({
            url: "query.php?date=" + $("#date-selector input").val(),
            success: function (json) {
                var data = JSON.parse(json),
                    hoursHTML = "",
                    summaryHTML = "";

                $(".data-table tbody tr").remove();

                if (!isNull(data.summary, 2)) {
                    var summary = data.summary

                    summaryHTML += `                                
                    <tr>
                        <td>` + hour.maxtempm + `</td>
                        <td>` + hour.meantempm + `</td>
                        <td>` + hour.mintempm + `</td>
                        <td>` + hour.humidity + `</td>
                        <td>` + hour.precipm + `</td>
                        <td>` + bitToStr(hour.fog) + `</td>
                        <td>` + bitToStr(hour.rain) + `</td>
                        <td>` + bitToStr(hour.hail) + `</td>
                        <td>` + bitToStr(hour.thunder) + `</td>
                    </tr>
                    `;

                    function bitToStr(bit) {
                        return bit == 0 ? "Não" : "Sim";
                    }
                }
                else {
                    summaryHTML = `
                        <tr>
                            <td colspan="9">Resumo do Dia Indisponível</td>
                        </tr>
                    `;
                }

                if (!isNull(data.hourly, 3)) {
                    for (var i in data.hourly) {
                        var hour = data.hourly[i],
                            date = new Date(hour.datetime);

                        hoursHTML += `                                
                        <tr>
                            <td>` + dateFix(date.getHours()) + ":" + dateFix(date.getMinutes()) + ":" + dateFix(date.getSeconds()) + `</td>
                            <td>` + hour.conds + `</td>
                            <td>` + hour.tempm + `</td>
                            <td>` + hour.hum + `</td>
                            <td>` + hour.pressurem + `</td>
                            <td>` + hour.vism + `</td>
                            <td>` + hour.wdire + `</td>
                            <td>` + hour.wdird + `</td>
                            <td>` + hour.wspdm + `</td>
                        </tr>
                    `;
                    }
                }
                else {
                    hoursHTML = `
                        <tr>
                            <td colspan="9">Dados Indisponíveis</td>
                        </tr>
                    `;
                }

                $("#summary").removeClass("hide")
                    .find("table tbody").append(summaryHTML);
                $("#results").removeClass("hide")
                    .find("table tbody").append(hoursHTML);
            }
        });
    });

    function isNull(data, notNullQnt) {
        var notNull = 0;

        for (var i in data) {
            if (data[i] != "") {
                notNull++;
            }
        }

        if (notNull == notNullQnt) {
            return true;
        }

        return false;
    }

}

function animations() {

}