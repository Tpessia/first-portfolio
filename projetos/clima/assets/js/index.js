$(function () {

    initializers();

    events();

    animations();

});

function initializers() {

    M.Tabs.init($$("header .tabs"), {});

    M.FormSelect.init($$("header #select"), {});

    startDisabled();
    function startDisabled() {
        $(".date-input .datepicker").removeAttr("disabled");
        $(".tab-content .submit button").removeClass("disabled");
        $("header .tab").removeClass("disabled");
    }

    datepickerInit();
    function datepickerInit() {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        datepickers = M.Datepicker.init($$('.datepicker'), {
            'autoClose': true,
            'format': 'mmm dd, yyyy',
            'minDate': new Date('1996-06-30T00:00:00'),
            'maxDate': yesterday,
            'yearRange': [1996, yesterday.getFullYear()],
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
                if (date.match(/^(\d){4}[- \/.]?(0[1-9]|1[012])[- \/.]?(0[1-9]|[12][0-9]|3[01])$/)) { // Match date [0000-9999][0-12][0-31]
                    var newDate = new Date(date + "T00:00:00");
                    for (var i in datepickers) {
                        datepickers[i].options.maxDate = newDate;
                        datepickers[i].options.yearRange = [1996, newDate.getFullYear()];
                        datepickers[i].options.defaultDate = newDate;
                        datepickers[i].setDate(newDate);
                    }
                }
                else {
                    console.log("Valor inválido de get-last.php: " + date);
                }
            }
        });
    }
}

function events() {
    var init = {
        allDay: function () {
            this.tabs();

            // SUMMARY

            this.charts.buildBar("#chart-summary", "summary", [{
                "label": "Temperatura (ºC)",
                "data": "temp"
            }], 0);

            $("#summary .t1").off().on("click", function () {
                if (!$(this).find("a").hasClass("active")) {
                    init.charts.buildBar("#chart-summary", "summary", [{
                        "label": "Temperatura (ºC)",
                        "data": "temp"
                    }], 0);
                }
            });

            $("#summary .t2").off().on("click", function () {
                if (!$(this).find("a").hasClass("active")) {
                    init.charts.buildLine("#chart-summary", "summary", [{
                        "label": "Pressão (mBar)",
                        "data": "pres"
                    }], 1, false,
                    function (value) {
                        return value ? value.slice(0, 3) : value;
                    });
                }
            });

            $("#summary .t3").off().on("click", function () {
                if (!$(this).find("a").hasClass("active")) {
                    init.charts.buildBar("#chart-summary", "summary", [{
                        "label": "Humidade (%),Precipitação (mm),Visibilidade (km), Dir. do Vento (º),Vel. do Vento (km/h)",
                        "data": "misc"
                    }], 0, true); // index não funciona
                }
            });

            // HOURLY

            this.charts.buildLine("#chart-hourly", "hourly", [{
                "label": "Temperatura (ºC)",
                "data": "temp"
            }, {
                "label": "Umidade (%)",
                "data": "hum"
            }]);

            $("#hourly .t1").off().on("click", function () {
                if (!$(this).find("a").hasClass("active")) {
                    init.charts.buildLine("#chart-hourly", "hourly", [{
                        "label": "Temperatura (ºC)",
                        "data": "temp"
                    }, {
                        "label": "Umidade (%)",
                        "data": "hum"
                    }]);
                }
            });

            $("#hourly .t2").off().on("click", function () {
                if (!$(this).find("a").hasClass("active")) {
                    init.charts.buildLine("#chart-hourly", "hourly", [{
                        "label": "Temperatura (ºC)",
                        "data": "temp"
                    }], 0);
                }
            });

            $("#hourly .t3").off().on("click", function () {
                if (!$(this).find("a").hasClass("active")) {
                    init.charts.buildLine("#chart-hourly", "hourly", [{
                        "label": "Umidade (%)",
                        "data": "hum"
                    }], 1);
                }
            });

            $("#hourly .t4").off().on("click", function () {
                if (!$(this).find("a").hasClass("active")) {
                    init.charts.buildLine("#chart-hourly", "hourly", [{
                        "label": "Pressão (mBar)",
                        "data": "pres"
                    }], 2);
                }
            });

            // ALMANAC

            this.charts.buildBar("#chart-almanac", "almanac", [{
                "label": "Max. Média,Max. Recorde,Mín. Média,Mín. Recorde",
                "data": "rec"
            }], 0, true);
        },

        allRange: function(labels) {
            this.tabs();
            this.charts.range.general();

            labels = labels.reverse();

            var data = [];
            for (var i in labels) {
                data.push({
                    "label": labels[i],
                    "data": "shift"
                });
            }
            
            this.charts.buildLine("#chart-range", "range", data, 0, false, function(value) {
                return value ? value.slice(0, 6) + value.slice(8, 10) : value;
            });
        },

        tabs: function () {
            var instance = M.Tabs.init($$(".tabs"), {});
            $('#hourly .tabs').tabs('select', 'first-tab-hourly');
            $('#summary .tabs').tabs('select', 'first-tab-summary');
            $('#almanac .tabs').tabs('select', 'first-tab-almanac');
        },

        hideHover: function(el) {
            $(el).find(".custom-label .label-data").off()
                .on("mouseenter", function () {
                    var firstLine = $(el).find(".ct-series path[d][d!='']:first").parents(".ct-series").index();
                    var letter = String.fromCharCode(97 + $(this).index() + firstLine);
                    var parentChart = $(this).closest(".data-chart");
                    var ctLines = parentChart.find(".ct-series").not(".ct-series-" + letter).find(".ct-line, .ct-bar, .ct-point, .ct-slice-donut");
                    ctLines.css("display", "none");
                })
                .on("mouseleave", function () {
                    var firstLine = $(el).find(".ct-series path[d]:first").parents(".ct-series").index();
                    var letter = String.fromCharCode(97 + $(this).index() + firstLine);
                    var parentChart = $(this).closest(".data-chart");
                    var ctLines = parentChart.find(".ct-series").not(".ct-series-" + letter).find(".ct-line, .ct-bar, .ct-point, .ct-slice-donut");
                    ctLines.css("display", "inline");
                });
        },

        hideNullChart: function(el, chartData) {
            if (chartData.join("").replace(/,/g, "") == "") {
                var $query = $(el + ", " + el + "~.custom-label");
                if ($(el).parents(".data-chart").find(".tabs .tab").length < 2) {
                    $query = $(el).parents(".data-chart");
                }
                $query.addClass("hide");
                return true;
            } else {
                var $query = $(el + ", " + el + "~.custom-label");
                if ($(el).parents(".data-chart").find(".tabs .tab").length < 2) {
                    $query = $(el).parents(".data-chart");
                }
                $query.removeClass("hide");
                return false;
            }
        },

        charts: {
            buildLine: function (el, chartSet, content, index, points, respLabel) { // elem selector, charts[chart] content & chart parent id, {MyLabel, charts["chart"][data]}, index for right color, animate?
                var chartData = [];
                var dataLabel = [];

                if (typeof index !== "undefined") {
                    for (var i = index; i > 0; i--) {
                        chartData.push([]); //adiciona espaços vazios na frente do dado para colorir corretamente
                    }
                }

                for (var i in content) {
                    chartData.push(this[chartSet][content[i].data]());
                    dataLabel.push(content[i].label);
                }

                if (init.hideNullChart(el, chartData)) {
                    return false;   
                };

                var options = {
                    // fullWidth: true,
                    showPoint: (typeof points === "undefined") ? true : points
                };

                var low, high;
                for (var i in chartData) {
                    var value = Array.from(chartData[i]);
                    if (value.length > 0) {
                        if (typeof low !== "undefined") {
                            value.push(low);
                        }
                        if (typeof high !== "undefined") {
                            value.push(high);
                        }
                        low = Math.min.apply(null, value);
                        high = Math.max.apply(null, value);
                    }
                }

                var delta = high - low;
                if (typeof options.low === "undefined" || low < options.low) {
                    options.low = low - (delta * 0.1);
                }
                if (typeof options.high === "undefined" || high > options.high) {
                    options.high = high + (delta * 0.1);
                }
                
                var chartLine = new Chartist.Line(
                    el, {
                        labels: this[chartSet].label(),
                        series: chartData
                    },
                    options, [
                        ['(max-width: 992px)', {
                            showPoint: false,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    if (typeof respLabel !== "undefined") {
                                        return respLabel(value);
                                    }
                                    else {
                                        return value ? value.slice(0, 2) : value;
                                    }
                                }
                            }
                        }]
                    ]
                );

                chartLine.on('draw', function (data) {
                    if ((data.type === 'line' || data.type === 'area') && !/Mobi/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent)) {
                        data.element.animate({
                            d: {
                                begin: 0,
                                dur: 1500,
                                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                                to: data.path.clone().stringify(),
                                easing: Chartist.Svg.Easing.easeOutQuint
                            }
                        });
                    }
                });

                $("#" + chartSet + " .custom-label").html('');
                for (var i in dataLabel) {
                    $("#" + chartSet + " .custom-label").append('<div class="label-data"><span class="label-color" style="background-color: ' + (typeof index === "undefined" ? this.labelColors[i] : this.labelColors[parseInt(i) + parseInt(index)]) + '"></span>' + dataLabel[i] + '</div>');
                }

                init.hideHover($(el).closest("main")[0]);
            },

            buildBar: function (el, chartSet, content, index, distribute) {
                var chartData = [];
                var dataLabel = [];
                var distribute = (typeof distribute !== "undefined" && distribute);

                if (typeof index !== "undefined" && !distribute) {
                    for (var i = index; i > 0; i--) {
                        chartData.push([]);
                    }
                }

                for (var i in content) {
                    chartData.push(this[chartSet][content[i].data]());
                    dataLabel.push(content[i].label);
                }
            

                if (init.hideNullChart(el, chartData)) {
                    return false;   
                };
                
                if (distribute) {
                    dataLabel = content[0].label.split(",");
                    chartData = chartData[0];
                }

                var chartBar = new Chartist.Bar(
                    el, {
                        labels: this[chartSet].label(dataLabel),
                        series: chartData
                    }, {
                        seriesBarDistance: 10,
                        distributeSeries: distribute
                    }, [
                        ['screen and (max-width: 992px)', {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value.slice(0, 3);
                                }
                            }
                        }]
                    ]
                );

                chartBar.on('draw', function (data) {
                    if ((data.type == 'bar') && !/Mobi/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent)) {
                        data.element.animate({
                            y2: {
                                dur: '1.5s',
                                from: data.y1,
                                to: data.y2,
                                easing: Chartist.Svg.Easing.easeOutQuint
                            }
                        });
                    }
                });

                $("#" + chartSet + " .custom-label").html('');
                for (var i in dataLabel) {
                    $("#" + chartSet + " .custom-label").append('<div class="label-data"><span class="label-color" style="background-color: ' + (typeof index === "undefined" ? this.labelColors[i] : this.labelColors[parseInt(i) + parseInt(index)]) + '"></span>' + dataLabel[i] + '</div>');
                }

                init.hideHover($(el).closest("main")[0]);
            },

            buildPie: function (el, chartSet, content, index) {
                var chartData = [];
                var dataLabel = [];

                for (var i in content) {
                    chartData = this[chartSet][content[i].data]();
                    dataLabel = content[i].label.split(",");
                }

                if (init.hideNullChart(el, chartData)) {
                    return false;   
                };

                if (typeof index !== "undefined") {
                    for (var i = index; i > 0; i--) {
                        chartData.unshift(-1);
                    }
                }

                var chartPie = new Chartist.Pie(
                    el, {
                        series: chartData
                    }, {
                        labelInterpolationFnc: function (value) {
                            return value < 0 ? "" : value;
                        }
                    }
                );

                $("#" + chartSet + " .custom-label").html('');
                for (var i in dataLabel) {
                    $("#" + chartSet + " .custom-label").append('<div class="label-data"><span class="label-color" style="background-color: ' + (typeof index === "undefined" ? this.labelColors[i] : this.labelColors[parseInt(i) + parseInt(index)]) + '"></span>' + dataLabel[i] + '</div>');
                }

                init.hideHover($(el).closest("main")[0]);
            },

            labelColors: ["#3f51b5", "#7986cb", "#9c27b0", "#00796b", "#d32f2f", "#5e35b1", "#388e3c", "#ef6c00"],

            hourly: {
                label: function () {
                    var time = [];

                    if (!isNull(dataDay.hourly[0], 3)) {
                        for (var i in dataDay.hourly) {
                            var hour = checkNotAvailable(dataDay.hourly[i]),
                                datetime = new Date(hour.datetime.replace(" ", "T"));

                            time.push(dateFix(datetime.getHours()) + ":" + dateFix(datetime.getMinutes()));
                        }
                    }

                    return time;
                },

                temp: function () {
                    var temp = [];

                    if (!isNull(dataDay.hourly[0], 3)) {
                        for (var i in dataDay.hourly) {
                            var hour = checkNotAvailable(dataDay.hourly[i]),
                                datetime = new Date(hour.datetime.replace(" ", "T"));

                            temp.push(hour.tempm);
                        }
                    }

                    return temp;
                },

                hum: function () {
                    var hum = [];

                    if (!isNull(dataDay.hourly[0], 3)) {
                        for (var i in dataDay.hourly) {
                            var hour = checkNotAvailable(dataDay.hourly[i]),
                                datetime = new Date(hour.datetime.replace(" ", "T"));

                            hum.push(hour.hum);
                        }
                    }

                    return hum;
                },

                pres: function () {
                    var pres = [];

                    if (!isNull(dataDay.hourly[0], 3)) {
                        for (var i in dataDay.hourly) {
                            var hour = dataDay.hourly[i],
                                datetime = new Date(hour.datetime.replace(" ", "T"));

                            pres.push(hour.pressurem);
                        }
                    }

                    return pres;
                }
            },

            summary: {
                label: function (labels) {
                    return typeof labels === "undefined" || labels.length == 1 ? ["Mínima", "Média", "Máxima"] : labels;
                },

                temp: function () {
                    var summary = checkNotAvailable(dataDay.summary),
                        temp = [summary.mintempm, summary.meantempm, summary.maxtempm];

                    return temp;
                },

                pres: function () {
                    var summary = checkNotAvailable(dataDay.summary),
                        hum = [summary.minpressurem, summary.meanpressurem, summary.maxpressurem];

                    return hum;
                },

                misc: function () {
                    var summary = checkNotAvailable(dataDay.summary),
                        misc = [summary.humidity, summary.precipm, summary.meanvism, summary.meanwdird, summary.meanwindspdm];

                    return misc;
                }
            },

            almanac: {
                label: function() {
                    return ["Max. Média","Max. Recorde","Mín. Média","Mín. Recorde"];
                },

                rec: function() {
                    var almanac = checkNotAvailable(dataDay.almanac),
                        temp = [almanac.temp_high_normal_m, almanac.temp_high_record_m/*, almanac.temp_high_record_year*/, almanac.temp_low_normal_m, almanac.temp_low_record_m/*, almanac.temp_low_record_year*/];
                        
                    return temp;
                }
            },

            range: {
                label: function() {
                    var compactLabel = Array.from(this.temporary[0]);

                    var maxQnt = 10;
                    var pattern = compactLabel.length < 10 ? 1 : Math.round(compactLabel.length / maxQnt);
                    var progress = 0;
                    var inserted = 0;

                    for (var i in compactLabel) {
                        if (i%pattern == 0 && inserted < maxQnt) {
                            compactLabel[i] = prettyDate(new Date(this.temporary[0][i] + "T00:00:00"));
                            inserted++;
                        }
                        else {
                            compactLabel[i] = null;
                        }

                        progress += pattern;
                    }

                    return compactLabel;
                },

                general: function() {
                    this.temporary = [];

                    for (var i in dataRange) {
                        var day = dataRange[i];

                        var data = [];

                        data[0] = i;

                        for (var j in day) {
                            if (typeof day[j] === "undefined" || day[j] == "-999" || day[j] == "-9999" || day[j] == "") {
                                data.push(null);
                            }
                            else {
                                data.push(day[j]);
                            }
                        }

                        // Remove wrong data (e.g. max 0, med 0, min 0)
                        // var keys = Object.keys(data);
                        // var isInvalid = true;
                        // for (var j in keys) {
                        //     if (j > 1) {
                        //         if (data[j - 1] != data[j]) {
                        //             isInvalid = false;
                        //         }
                        //     }
                        // }
                        // if (isInvalid && data.length > 2) {
                        //     for (var j in keys) {
                        //         if (j > 0) {
                        //             data[j] = null;
                        //         }
                        //     }
                        // }

                        var i = 0;
                        for (var j in data) {
                            (typeof this.temporary[i] === "undefined") ? this.temporary[i] = [data[j]] : this.temporary[i].push(data[j]);
                            i++;
                        }
                    }

                    for (var i = 0; i < this.temporary.length; i++) {
                        this.shift = function() {
                            var a = this.temporary.splice(1, 1)[0];
                            
                            return a;
                        }
                    }
                }
            }
        },
    };

    var submitBtn = {
        disable: function() {
            $(".submit button").addClass("disabled")
            $(".submit .progress").removeClass("hide");
        },
        
        enable: function() {
            $(".submit button").removeClass("disabled")
            $(".submit .progress").addClass("hide");
        }
    }

    $("#day-tab .date-form").on("submit", function () {
        submitBtn.disable();

        var date = datepickers[0].date;
        var dateStr = date.getFullYear() + "" + dateFix(date.getMonth() + 1) + "" + dateFix(date.getDate());

        $.ajax({
            url: "query.php?date=" + dateStr,
            success: function (json) {
                try {
                    dataDay = JSON.parse(json);
                }
                catch (e) {
                    submitBtn.enable();
                    alert("Erro de conexão com o servidor (valor inesperado)");
                    throw "JSON inválido!";
                }

                var hoursHTML = "",
                    summaryHTML = "",
                    almanacHTML = "";

                if (!isNull(dataDay.summary, 2)) {
                    var summary = checkNotAvailable(dataDay.summary);

                    summaryHTML += '<tr><td>'
                        + summary.maxtempm + '</td><td>'
                        + summary.meantempm + '</td><td>'
                        + summary.mintempm + '</td><td>'
                        + summary.maxpressurem + '</td><td>'
                        + summary.meanpressurem + '</td><td>'
                        + summary.minpressurem + '</td><td>'
                        + summary.humidity + '</td><td>'
                        + summary.precipm + '</td><td>'
                        + summary.meanvism + '</td><td>'
                        + translate(summary.meanwdire) + '</td><td>'
                        + summary.meanwdird + '</td><td>'
                        + summary.meanwindspdm + '</td><td>'
                        + bitToStr(summary.fog) + '</td><td>'
                        + bitToStr(summary.rain) + '</td><td>'
                        + bitToStr(summary.hail) + '</td><td>'
                        + bitToStr(summary.thunder) + '</td></tr>';

                    function bitToStr(bit) {
                        return bit == 0 ? "Não" : "Sim";
                    }
                }
                else {
                    summaryHTML = '<tr><td colspan="16">Resumo do Dia Indisponível</td></tr>';
                }

                if (!isNull(dataDay.hourly[0], 3)) {
                    for (var i in dataDay.hourly) {
                        var hour = checkNotAvailable(dataDay.hourly[i]),
                            datetime = new Date(hour.datetime.replace(" ", "T"));

                        hoursHTML += '<tr><td>'
                            + dateFix(datetime.getHours()) + ":" + dateFix(datetime.getMinutes()) + /*":" + dateFix(datetime.getSeconds()) +*/ '</td><td>'
                            + translate(hour.conds) + '</td><td>'
                            + hour.tempm + '</td><td>'
                            + hour.pressurem + '</td><td>'
                            + hour.hum + '</td><td>'
                            + hour.precipm + '</td><td>'
                            + hour.vism + '</td><td>'
                            + translate(hour.wdire) + '</td><td>'
                            + hour.wdird + '</td><td>'
                            + hour.wspdm + '</td><td>'
                            + hour.wgustm + '</td></tr>';
                    }
                }
                else {
                    hoursHTML = '<tr><td colspan="11">Dados Indisponíveis</td></tr>';
                }

                if (!isNull(dataDay.almanac, 2)) {
                    var almanac = checkNotAvailable(dataDay.almanac);

                    almanacHTML += '<tr><td>'
                        + almanac.temp_high_normal_m + '</td><td>'
                        + almanac.temp_high_record_m + '</td><td>'
                        + almanac.temp_high_record_year + '</td><td>'
                        + almanac.temp_low_normal_m + '</td><td>'
                        + almanac.temp_low_record_m + '</td><td>'
                        + almanac.temp_low_record_year + '</td></tr>';
                }
                else {
                    almanacHTML = '<tr><td colspan="6">Recordes Indisponíveis</td></tr>';
                }

                $(".day .search-title h3").html("Clima em " + dateFix(date.getDate()) + "/" + dateFix(date.getMonth() + 1) + "/" + date.getFullYear());
                $("#summary tbody").html(summaryHTML);
                $("#hourly tbody").html(hoursHTML);
                $("#almanac tbody").html(almanacHTML);
                $("main.day").removeClass("hide");
                $("section h5, main.range").addClass("hide");

                init.allDay();
            },
            error: function () {
                alert("Erro de conexão. Tente novamente!");
            },
            complete: function () {
                submitBtn.enable();
            }
        });
    });

    $("#range-tab .date-form").on("submit", function() {
        var selected = $('header .select-input select option:selected');

        if (selected.prop("disabled")) {
            alert("Selecione uma opção de dado para concluir a pesquisa!");
            return false;
        }

        submitBtn.disable();

        var range1 = datepickers[1].date;
        var range2 = datepickers[2].date;
        var dateStr1 = range1.getFullYear() + "" + dateFix(range1.getMonth() + 1) + "" + dateFix(range1.getDate());
        var dateStr2 = range2.getFullYear() + "" + dateFix(range2.getMonth() + 1) + "" + dateFix(range2.getDate());

        if (range1 >= range2) {
            alert("Data de Início não pode ser maior ou igual à data de Fim!");
            submitBtn.enable();
            return false;
        }

        $.ajax({
            url: "query-mult.php?min=" + dateStr1 + "&max=" + dateStr2 + "&select=" + selected.val(),
            success: function (json) {
                try {
                    dataRange = JSON.parse(json);
                } catch (e) {
                    submitBtn.enable();
                    alert("Erro de conexão com o servidor (valor inesperado)");
                    throw "JSON inválido!";
                }

                $(".range .search-title h3").html("Clima entre " + prettyDate(range1) + " e " + prettyDate(range2));
                $("#range .t1 a").html(selected.html().toUpperCase());
                $("main.range").removeClass("hide");
                $("section h5, main.day").addClass("hide");

                var mathData = {}
                var i = 0;
                for (var n in dataRange[Object.keys(dataRange)[0]]) {
                    var arr = Object.keys(dataRange).map(function (key) {
                        return Object.keys(dataRange[key]).map(function (key2) {
                            return dataRange[key][key2];
                        })[i];
                    });

                    var average = 0;
                    for (var j in arr) {
                        var num = parseFloat(arr[j]) ? parseFloat(arr[j]) : 0;
                        average += num;
                    }
                    average /= arr.length;

                    mathData[n] = {};
                    mathData[n].min = Math.min.apply(null, arr);
                    mathData[n].max = Math.max.apply(null, arr);
                    mathData[n].avr = average.toFixed(3);

                    i++;
                }

                var rangeHeadHTML = "<tr style='border-bottom: 0;'>",
                    rangeSubHeadHTML = "<tr>",
                    rangeBodyHTML = "<tr>";

                var i = 0;
                var labels = selected.attr("labels").split(",").length > 1 ? selected.attr("labels").split(",").reverse() : [""];
                var name = selected.html();
                for (var j in mathData) {
                    rangeHeadHTML += '<th colspan="3">' + name + " " + labels[i] + '</th>';

                    rangeSubHeadHTML += "<th>Min</th><th>Med</th><th>Max</th>";

                    rangeBodyHTML += '<td>' +
                        mathData[j].min + '</td><td>' +
                        mathData[j].avr + '</td><td>' +
                        mathData[j].max + '</td>';
                    
                    i++;
                }

                rangeHeadHTML += "</tr>";
                rangeBodyHTML += "</tr>";
                rangeSubHeadHTML += "</tr>";

                $("#range thead").html(rangeHeadHTML);
                $("#range thead").append(rangeSubHeadHTML);
                $("#range tbody").html(rangeBodyHTML);

                init.allRange(selected.attr("labels").split(","));
            },
            error: function () {
                alert("Erro de conexão. Tente novamente!");
            },
            complete: function () {
                submitBtn.enable();
            }
        });
    });

    function prettyDate(date) {
        return dateFix(date.getDate()) + "/" + dateFix(date.getMonth() + 1) + "/" + date.getFullYear();
    }
}

function animations() {

    function scrollFire(selector, offset0, offset1, foo) {
        //SCROLL FIRE TOP TOGGLE
        //útil para sidebars com estados visível e não visível

        //seletor -> "#meuElemento"
        //foo -> function foo() { fazerAlgo(); }

        if (typeof scrollId === "undefined") {
            scrollId = [];
            scrollId[0] = 0;
        } else {
            scrollId[scrollId.length] = 0;
        }
        var id = scrollId.length - 1;

        $(window).scroll(function () {
            var sT = $(selector).offset().top,
                sH = $(selector).outerHeight(),
                wH = $(window).height(),
                wS = $(window).scrollTop();

            if (scrollId[id] == 0) {
                if (wS > sT + sH + offset0) {
                    foo();
                    scrollId[id] ^= 1;
                }
            } else {
                if (wS < sT + sH + offset1) {
                    foo();
                    scrollId[id] ^= 1;
                }
            }
        });
    }

}