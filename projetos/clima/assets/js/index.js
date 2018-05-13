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
            'defaultDate': yesterday,
            'onOpen': function () {
                this.setDate(new Date(this.options.defaultDate));
            },
            'onSelect': function (d) {
                datepickers[0].options.defaultDate = d;
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
                if (date.match(/^(\d){4}[- \/.]?(0[1-9]|1[012])[- \/.]?(0[1-9]|[12][0-9]|3[01])$/)) { // Match date [0000-9999][0-12][0-31]
                    for (var i in datepickers) {
                        datepickers[i].options.maxDate = new Date(date + "T00:00:00");
                        datepickers[i].options.yearRange = [1996, new Date(date + "T00:00:00").getFullYear()];
                        datepickers[i].options.defaultDate = new Date(date + "T00:00:00");
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
                    }], 1);
                }
            });

            $("#summary .t3").off().on("click", function () {
                if (!$(this).find("a").hasClass("active")) {
                    init.charts.buildPie("#chart-summary", "summary", [{
                        "label": "Humidade (%),Precipitação (mm),Visibilidade (km), Dir. do Vento (º),Vel. do Vento (km/h)",
                        "data": "misc"
                    }], 2);
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
        },

        allRange: function(labels) {
            this.charts.range.general();

            var data = [];
            for (var i in labels) {
                data.push({
                    "label": labels[i],
                    "data": parseInt(i) + 1
                });
            }
            this.charts.buildLine("#chart-range", "range", data);
        },

        tabs: function () {
            var instance = M.Tabs.init($$(".tabs"), {});
            $('#hourly .tabs').tabs('select', 'first-tab-hourly');
            $('#summary .tabs').tabs('select', 'first-tab-summary');
        },

        charts: {
            buildLine: function (el, chart, content, index) { // elem selector, charts[chart] content & chart parent id, {MyLabel, charts["chart"][data]}, index for right color, animate?
                var chartData = [];
                var dataLabel = [];

                if (typeof index !== "undefined") {
                    for (var i = index; i > 0; i--) {
                        chartData.push([]); //adiciona espaços vazios na frente do dado para colorir corretamente
                    }
                }

                for (var i in content) {
                    chartData.push(this[chart][content[i].data]());
                    dataLabel.push(content[i].label);
                }

                var options = {
                    fullWidth: true
                };
                // DEFINE MAX & MIN BY DATA SET
                // if (typeof this[chart].low !== "undefined") {
                //     options.low = this[chart].low;
                // }
                // if (typeof this[chart].high !== "undefined") {
                //     options.high = this[chart].high;
                // }
                // for (var i in chartData) {
                //     var value = chartData[i];
                //     var low = Math.min.apply(null, value);
                //     var high = Math.max.apply(null, value);
                //     if (typeof options.low === "undefined" || low < options.low) {
                //         options.low = low;
                //         this[chart].low = low;
                //     }
                //     if (typeof options.high === "undefined" || high > options.high) {
                //         options.high = high;
                //         this[chart].high = high;
                //     }
                // }

                for (var i in chartData) {
                    var value = chartData[i];
                    var low = Math.min.apply(null, value);
                    var high = Math.max.apply(null, value);
                    var delta = high - low;
                    if (typeof options.low === "undefined" || low < options.low) {
                        options.low = low - (delta * 0.1);
                    }
                    if (typeof options.high === "undefined" || high > options.high) {
                        options.high = high + (delta * 0.1);
                    }
                }

                var chartLine = new Chartist.Line(
                    el, {
                        labels: this[chart].label(),
                        series: chartData
                    },
                    options, [
                        ['(max-width: 992px)', {
                            showPoint: false,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value.slice(0, 2);
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

                $("#" + chart + " .custom-label").html('');
                for (var i in dataLabel) {
                    $("#" + chart + " .custom-label").append('<div class="label-data"><span class="label-color" style="background-color: ' + (typeof index === "undefined" ? this.labelColors[i] : this.labelColors[index]) + '"></span>' + dataLabel[i] + '</div>');
                }
            },

            buildBar: function (el, chart, content, index) {
                var chartData = [];
                var dataLabel = [];

                if (typeof index !== "undefined") {
                    for (var i = index; i > 0; i--) {
                        chartData.push([]);
                    }
                }

                for (var i in content) {
                    chartData.push(this[chart][content[i].data]());
                    dataLabel.push(content[i].label);
                }

                var chartBar = new Chartist.Bar(
                    el, {
                        labels: this[chart].label(),
                        series: chartData
                    }, {
                        seriesBarDistance: 10
                    }, [
                        ['screen and (max-width: 600px)', {
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
                        }).attr({
                            style: 'stroke-width:8%'
                        });
                    }
                });

                $("#" + chart + " .custom-label").html('');
                for (var i in dataLabel) {
                    $("#" + chart + " .custom-label").append('<div class="label-data"><span class="label-color" style="background-color: ' + (typeof index === "undefined" ? this.labelColors[i] : this.labelColors[index]) + '"></span>' + dataLabel[i] + '</div>');
                }
            },

            buildPie: function (el, chart, content, index) {
                var chartData = [];
                var dataLabel = [];

                for (var i in content) {
                    chartData = this[chart][content[i].data]();
                    dataLabel = content[i].label.split(",");
                }

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

                $("#" + chart + " .custom-label").html('');
                for (var i in dataLabel) {
                    $("#" + chart + " .custom-label").append('<div class="label-data"><span class="label-color" style="background-color: ' + (typeof index === "undefined" ? this.labelColors[i] : this.labelColors[parseInt(i) + parseInt(index)]) + '"></span>' + dataLabel[i] + '</div>');
                }
            },

            labelColors: ["#3f51b5", "#7986cb", "#0d47a1", "#2962ff", "#1a237e", "#c5cae9", "#2196f3", "#bbdefb", "#536dfe", "#304ffe", "#448aff", "#64b5f6"],

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
                label: function () {
                    return ["Mínima", "Média", "Máxima"];
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

            range: {
                label: function() {
                    return data[0];
                },

                general: function() {
                    if (typeof this.temp === "undefined") {
                        this.temp = [];
                    }

                    for (var i in dataRange) {
                        var day = dataRange[i];

                        var data = [];

                        data[0] = i;

                        for (var j in day) {
                            if (day[j] == "-999" || day[j] == "-9999" || day[j] == "") {
                                data = null;
                                break;
                            }

                            data[j] = day[j];
                        }

                        if (data == null) {
                            break;
                        }

                        var i = 0;
                        for (var j in data) {
                            
                            (typeof this.temp[i] === "undefined") ? this.temp[i] = [data[j]] : this.temp[i].push(data[j]);
                            i++;
                        }
                    }

                    for (var i = 0; i < this.temp.length; i++) {
                        this[i] = function() {
                            return this.temp[i];
                        }
                    }
                }
            }
        },
    };

    var submitBtn = {
        disable: function() {
            $("#day-tab .submit button").addClass("disabled")
            $("#day-tab .submit .progress").removeClass("hide");
        },
        
        enable: function() {
            $("#day-tab .submit button").removeClass("disabled")
            $("#day-tab .submit .progress").addClass("hide");
        }
    }

    $("#day-tab .date-form").on("submit", function () {
        submitBtn.disable();

        var date = datepickers[0].options.defaultDate;
        var dateStr = date.getFullYear() + "" + dateFix(date.getMonth() + 1) + "" + dateFix(date.getDate());

        $.ajax({
            url: "query.php?date=" + dateStr,
            success: function (json) {
                try {
                    dataDay = JSON.parse(json);
                    // dataDay = JSON.parse(`{"summary":{"ID":"2425","date":"2003-02-07","maxtempi":"91","maxtempm":"33","meantempi":"81","meantempm":"28","mintempi":"71","mintempm":"22","maxdewpti":"72","maxdewptm":"22","meandewpti":"69","meandewptm":"20","mindewpti":"61","mindewptm":"16","maxvisi":"6.2","maxvism":"10","meanvisi":"4.9","meanvism":"7.9","minvisi":"1.6","minvism":"2.5","maxpressurei":"30.09","maxpressurem":"1019","meanpressurei":"30.06","meanpressurem":"1017.92","minpressurei":"30.04","minpressurem":"1017","maxwspdi":"17","maxwspdm":"28","meanwindspdi":"6","meanwindspdm":"10","minwspdi":"0","minwspdm":"0","meanwdird":"12","meanwdire":"NNE","humidity":"73","maxhumidity":"89","minhumidity":"46","precipi":"0","precipm":"0","precipsource":"3Or6HourObs","fog":"0","hail":"0","rain":"1","snow":"0","thunder":"1","tornado":"0","snowdepthi":"","snowdepthm":"","snowfalli":"","snowfallm":"","coolingdegreedays":"16","coolingdegreedaysnormal":"0","heatingdegreedays":"0","heatingdegreedaysnormal":"0","gdegreedays":"31","monthtodatecoolingdegreedays":"","monthtodatecoolingdegreedaysnormal":"","monthtodateheatingdegreedays":"","monthtodateheatingdegreedaysnormal":"","monthtodatesnowfalli":"","monthtodatesnowfallm":"","since1jancoolingdegreedays":"","since1jancoolingdegreedaysnormal":"","since1julheatingdegreedays":"","since1julheatingdegreedaysnormal":"","since1julsnowfalli":"","since1julsnowfallm":"","since1sepcoolingdegreedays":"","since1sepcoolingdegreedaysnormal":"","since1sepheatingdegreedays":"","since1sepheatingdegreedaysnormal":""},"hourly":[{"ID":"29061","date":"2003-02-07","datetime":"2003-02-07 00:00:00","conds":"Clear","icon":"clear","tempi":"77","tempm":"25","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"-9999","vism":"-9999","hum":"74","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"80","wdire":"East","wspdi":"11.5","wspdm":"18.5","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070200Z 08010KT CAVOK 25/20 Q1019"},{"ID":"29062","date":"2003-02-07","datetime":"2003-02-07 01:00:00","conds":"Clear","icon":"clear","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"-9999","vism":"-9999","hum":"78","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"70","wdire":"ENE","wspdi":"9.2","wspdm":"14.8","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070300Z 07008KT CAVOK 24/20 Q1018"},{"ID":"29063","date":"2003-02-07","datetime":"2003-02-07 02:00:00","conds":"Clear","icon":"clear","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"-9999","vism":"-9999","hum":"78","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"0","wdire":"North","wspdi":"0","wspdm":"0","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070400Z 00000KT CAVOK 24/20 Q1018"},{"ID":"29064","date":"2003-02-07","datetime":"2003-02-07 03:00:00","conds":"Clear","icon":"clear","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"-9999","vism":"-9999","hum":"78","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"70","wdire":"ENE","wspdi":"6.9","wspdm":"11.1","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070500Z 07006KT CAVOK 24/20 Q1017"},{"ID":"29065","date":"2003-02-07","datetime":"2003-02-07 04:00:00","conds":"Clear","icon":"clear","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"66.2","dewptm":"19","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"-9999","vism":"-9999","hum":"73","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"900","wdire":"North","wspdi":"5.8","wspdm":"9.3","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070600Z 90005KT CAVOK 24/19 Q1017"},{"ID":"29066","date":"2003-02-07","datetime":"2003-02-07 05:00:00","conds":"Clear","icon":"clear","tempi":"73.4","tempm":"23","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"-9999","vism":"-9999","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"80","wdire":"East","wspdi":"6.9","wspdm":"11.1","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070700Z 08006KT CAVOK 23/20 Q1017"},{"ID":"29067","date":"2003-02-07","datetime":"2003-02-07 06:00:00","conds":"Clear","icon":"clear","tempi":"73.4","tempm":"23","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"5","vism":"8","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"90","wdire":"East","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070800Z 09004KT 8000 SKC 23/20 Q1017"},{"ID":"29068","date":"2003-02-07","datetime":"2003-02-07 07:00:00","conds":"Clear","icon":"clear","tempi":"73.4","tempm":"23","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"-9999","vism":"-9999","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"40","wdire":"NE","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070900Z 04004KT CAVOK 23/20 Q1018"},{"ID":"29069","date":"2003-02-07","datetime":"2003-02-07 08:00:00","conds":"Unknown","icon":"unknown","tempi":"77","tempm":"25","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"5","vism":"8","hum":"74","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"70","wdire":"ENE","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071000Z 07004KT 8000 NSC 25/20 Q1018"},{"ID":"29070","date":"2003-02-07","datetime":"2003-02-07 09:00:00","conds":"Unknown","icon":"unknown","tempi":"80.6","tempm":"27","heatindexi":"83.9","heatindexm":"28.9","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"5","vism":"8","hum":"70","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"70","wdire":"ENE","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071100Z 07004KT 8000 NSC 27/21 Q1019"},{"ID":"29071","date":"2003-02-07","datetime":"2003-02-07 10:00:00","conds":"Clear","icon":"clear","tempi":"82.4","tempm":"28","heatindexi":"87.2","heatindexm":"30.7","dewpti":"71.6","dewptm":"22","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"-9999","vism":"-9999","hum":"70","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"360","wdire":"North","wspdi":"5.8","wspdm":"9.3","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071200Z 36005KT CAVOK 28/22 Q1019"},{"ID":"29072","date":"2003-02-07","datetime":"2003-02-07 11:00:00","conds":"Scattered Clouds","icon":"partlycloudy","tempi":"86","tempm":"30","heatindexi":"89.4","heatindexm":"31.9","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"6.2","vism":"10","hum":"55","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"330","wdire":"NNW","wspdi":"9.2","wspdm":"14.8","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071300Z 33008KT 9999 FEW025 SCT300 30/20 Q1019"},{"ID":"29073","date":"2003-02-07","datetime":"2003-02-07 12:00:00","conds":"Scattered Clouds","icon":"partlycloudy","tempi":"87.8","tempm":"31","heatindexi":"92.6","heatindexm":"33.7","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"6.2","vism":"10","hum":"55","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"330","wdire":"NNW","wspdi":"11.5","wspdm":"18.5","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071400Z 33010KT 9999 SCT025 31/21 Q1019"},{"ID":"29074","date":"2003-02-07","datetime":"2003-02-07 13:00:00","conds":"Scattered Clouds","icon":"partlycloudy","tempi":"89.6","tempm":"32","heatindexi":"96.2","heatindexm":"35.6","dewpti":"71.6","dewptm":"22","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"6.2","vism":"10","hum":"55","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"360","wdire":"North","wspdi":"9.2","wspdm":"14.8","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071500Z 36008KT 9999 SCT025 SCT300 32/22 Q1018"},{"ID":"29075","date":"2003-02-07","datetime":"2003-02-07 14:00:00","conds":"Scattered Clouds","icon":"partlycloudy","tempi":"89.6","tempm":"32","heatindexi":"94.7","heatindexm":"34.9","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"6.2","vism":"10","hum":"52","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"350","wdire":"North","wspdi":"9.2","wspdm":"14.8","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071600Z 35008KT 9999 BKN030 SCT300 32/21 Q1018"},{"ID":"29076","date":"2003-02-07","datetime":"2003-02-07 15:00:00","conds":"Scattered Clouds","icon":"partlycloudy","tempi":"91.4","tempm":"33","heatindexi":"95.4","heatindexm":"35.2","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"6.2","vism":"10","hum":"46","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"360","wdire":"North","wspdi":"8.1","wspdm":"13","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071700Z 36007KT 9999 BKN030 SCT300 33/20 Q1017"},{"ID":"29077","date":"2003-02-07","datetime":"2003-02-07 16:00:00","conds":"Light Thunderstorms and Rain","icon":"tstorms","tempi":"77","tempm":"25","heatindexi":"-9999","heatindexm":"-9999","dewpti":"60.8","dewptm":"16","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"2.5","vism":"4","hum":"57","fog":"0","rain":"1","thunder":"1","hail":"0","snow":"0","tornado":"0","wdird":"160","wdire":"SSE","wspdi":"17.3","wspdm":"27.8","wgusti":"34.5","wgustm":"55.6","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071800Z 16015G30KT 4000 -TSRA SCT010 BKN030 FEW040CB BKN100 25/16 Q1017"},{"ID":"29078","date":"2003-02-07","datetime":"2003-02-07 17:00:00","conds":"Thunderstorms and Rain","icon":"tstorms","tempi":"71.6","tempm":"22","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"1.6","vism":"2.5","hum":"88","fog":"0","rain":"1","thunder":"1","hail":"0","snow":"0","tornado":"0","wdird":"340","wdire":"NNW","wspdi":"9.2","wspdm":"14.8","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071900Z 34008KT 2500 TSRA BKN007 BKN030 FEW040CB BKN100 22/20 Q1018"},{"ID":"29079","date":"2003-02-07","datetime":"2003-02-07 18:00:00","conds":"Mostly Cloudy","icon":"mostlycloudy","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"71.6","dewptm":"22","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"6.2","vism":"10","hum":"89","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"200","wdire":"SSW","wspdi":"5.8","wspdm":"9.3","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 072000Z 20005KT 9999 FEW030 BKN100 24/22 Q1017 RETS"},{"ID":"29080","date":"2003-02-07","datetime":"2003-02-07 19:00:00","conds":"Mostly Cloudy","icon":"mostlycloudy","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"5","vism":"8","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"330","wdire":"NNW","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 072100Z 33004KT 8000 FEW040 BKN100 24/21 Q1017"},{"ID":"29081","date":"2003-02-07","datetime":"2003-02-07 20:00:00","conds":"Unknown","icon":"unknown","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"4.3","vism":"7","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"300","wdire":"WNW","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 072200Z 30004KT 7000 NSC 24/21 Q1018"},{"ID":"29082","date":"2003-02-07","datetime":"2003-02-07 21:00:00","conds":"Unknown","icon":"unknown","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"4.3","vism":"7","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"300","wdire":"WNW","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 072300Z 30004KT 7000 NSC 24/21 Q1018"},{"ID":"29083","date":"2003-02-07","datetime":"2003-02-07 22:00:00","conds":"Unknown","icon":"unknown","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"71.6","dewptm":"22","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"4.3","vism":"7","hum":"89","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"310","wdire":"NW","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 080000Z 31004KT 7000 NSC 24/22 Q1018"},{"ID":"29084","date":"2003-02-07","datetime":"2003-02-07 23:00:00","conds":"Unknown","icon":"unknown","tempi":"77","tempm":"25","heatindexi":"-9999","heatindexm":"-9999","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"4.3","vism":"7","hum":"78","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"300","wdire":"WNW","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 080100Z 30004KT 7000 NSC 25/21 Q1019"}],"almanac":{}}`);
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
                $("main.day .row").removeClass("hide");
                $("section h5").addClass("hide");

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
        submitBtn.disable();

        var range1 = datepickers[1].options.defaultDate;
        var range2 = datepickers[2].options.defaultDate;
        var dateStr1 = range1.getFullYear() + "" + dateFix(range1.getMonth() + 1) + "" + dateFix(range1.getDate());
        var dateStr2 = range2.getFullYear() + "" + dateFix(range2.getMonth() + 1) + "" + dateFix(range2.getDate());

        var selected = $('header .select-input select option:selected');

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

                $(".range .search-title h3").html(selected.html() + " entre " + prettyDate(range1) + " e " + prettyDate(range2));
                $("main.range .row").removeClass("hide");
                $("section h5").addClass("hide");

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