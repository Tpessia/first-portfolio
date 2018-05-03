$(function () {

    initializers();

    animations();

});

function initializers() {

    datepickers = M.Datepicker.init($$('.datepicker'), {
        'autoClose': true,
        'format': 'mmm dd, yyyy',
        'minDate': new Date('1996-06-30 00:00'),
        // 'setDefaultDate': true,
        'onOpen': function() {
            this.setDate(new Date(this.options.defaultDate));
        },
        'onSelect': function(d) {
            date = d; // Global date value
        },
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
        success: function (date) {
            datepickers[0].options.maxDate = new Date(date + " 00:00");
            datepickers[0].options.yearRange = [1996, new Date(date + " 00:00").getFullYear()];
            datepickers[0].options.defaultDate = new Date(date + " 00:00");
        },
        error: function() {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            datepickers[0].options.maxDate = new Date(yesterday);
            datepickers[0].options.yearRange = [1996, new Date(yesterday).getFullYear()];
            datepickers[0].options.defaultDate = new Date(yesterday);
        }
    });

    $("#date-form").on("submit", function () {
        $("#submit button").addClass("disabled")
        $("#submit .progress").removeClass("hide");

        var dateStr = date.getFullYear() + "" + dateFix(date.getMonth() + 1) + "" + dateFix(date.getDate());
        $.ajax({
            url: "query.php?date=" + dateStr,
            success: function (json) {
                var data = JSON.parse(json),
                    hoursHTML = "",
                    summaryHTML = "";

                if (!isNull(data.summary, 2)) {
                    var summary = data.summary;
                    
                    summaryHTML += `                                
                    <tr>
                        <td>` + summary.maxtempm + `</td>
                        <td>` + summary.meantempm + `</td>
                        <td>` + summary.mintempm + `</td>
                        <td>` + summary.humidity + `</td>
                        <td>` + summary.precipm + `</td>
                        <td>` + bitToStr(summary.fog) + `</td>
                        <td>` + bitToStr(summary.rain) + `</td>
                        <td>` + bitToStr(summary.hail) + `</td>
                        <td>` + bitToStr(summary.thunder) + `</td>
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

                $("#date-title h3").html(dateStr);
                $("#summary tbody").html(summaryHTML);
                $("#hourly tbody").html(hoursHTML);
                $("main").removeClass("hide");
            },
            complete: function() {
                $("#submit button").removeClass("disabled")
                $("#submit .progress").addClass("hide");
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