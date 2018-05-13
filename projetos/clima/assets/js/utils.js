var $$ = document.querySelectorAll.bind(document);

function dateFix(num) {
    return num < 10 ? "0" + num : num.toString();
}

function isNull(data, notNullQnt) { // verifica se conjunto ([1,2,3]) é nulo ou tem menos (<=) que x ("notNullQnt") propriedades
    if (data === null || typeof data === "undefined" || (data.hasOwnProperty("length") ? data.length == 0 : false) || (typeof date === "object" ? Object.keys(data).length == 0 : false)) {
        return true;
    }

    var notNull = 0;

    for (var i in data) {
        if (data[i] != "") {
            notNull++;
        }
    }

    if (notNull <= notNullQnt) {
        return true;
    }

    return false;
}

function checkNotAvailable(data) { // verifica e altera um conjunto ([1,2,3]) com valor "nulo"
    for (var p in data) {
        if (data[p] == "-999" || data[p] == "-9999") {
            data[p] = "n/a";
        }
    }
    return data;
}

function translate(text) {
    var dic = {

        "North": "Norte",
        "South": "Sul",
        "East": "Leste",
        "West": "Oeste",
        "Variable": "Variável",
        "Unknown Precipitation": "Precipitação Desconhecida",
        "Thunderstorms and Rain": "Tempestades e Chuva",
        "Thunderstorms and Snow": "Tempestades e Neve",
        "Thunderstorms and Ice Pellets": "Tempestades e Pelotas de Neve",
        "Thunderstorms with Hail": "Tempestades com Granizo",
        "Thunderstorms with Small Hail": "Tempestades com Pequenos Granizos",
        "Low Drifting Snow": "Neve à Deriva",
        "Low Drifting Widespread Dust": "Poeira à Deriva",
        "Low Drifting Sand": "Areia à Deriva",
        "Snow Blowing Snow Mist": "Sopros de Neve/Névoa",
        "Ice Pellet Showers": "Pancadas de Pelotas de Gelo",
        "Small Hail Showers": "Pancadas de Pequenos Granizos",
        "Blowing Widespread Dust": "Sopro de Poeira",
        "Partly Cloudy": "Parcialmente Nublado",
        "Mostly Cloudy": "Predominantemente Nublado",
        "Scattered Clouds": "Nuvens Dispersas",
        "Small Hail": "Chuva de Granizo Fraca",
        "Freezing Drizzle": "Garoa Congelante",
        "Freezing Rain": "Chuva Congelante",
        "Freezing Fog": "Névoa Congelante",
        "Patches of Fog": "Patches of Fog",
        "Shallow Fog": "Névoa Rasa",
        "Partial Fog": "Névoa Parcial",
        "Funnel Cloud": "Nuvem de Funil",
        "Blowing Snow": "Sopro de Neve",
        "Blowing Sand": "Sopro de Areia",
        "Rain Mist": "Névoa de Chuva",
        "Rain Showers": "Pancadas de Chuva",
        "Snow Showers": "Pancadas de Neve",
        "Hail Showers": "Pancadas de Granizo",
        "Dust Whirls": "Redemoinho de Poeira",
        "Volcanic Ash": "Cinzas Vulcânicas",
        "Widespread Dust": "Poeira Difusa",
        "Snow Grains": "Grãos de Neve",
        "Ice Crystals": "Cristais de Gelo",
        "Ice Pellets": "Pelotas de Gelo",
        "Drizzle": "Garoa",
        "Rain": "Chuva",
        "Snow": "Nevasca",
        "Hail": "Chuva de Granizo",
        "Mist": "Névoa",
        "Fog": "Névoa Densa",
        "Fog Patches": "Fog Patches",
        "Smoke": "Fumaça",
        "Sand": "Areia",
        "Haze": "Neblina",
        "Spray": "Spray",
        "Sandstorm": "Tempestade de Areia",
        "Thunderstorm": "Tempestada",
        "Overcast": "Nublado",
        "Clear": "Céu Limpo",
        "Squalls": "Rajadas de Vento",
        "Unknown": "Desconhecido"

    };

    for (var key in dic) {
        text = text.replace(key, dic[key]);
    }

    if (text.match("Heavy")) {
        text = text.replace("Heavy", "").concat(" Pesada").trim();
    } else if (text.match("Light")) {
        text = text.replace("Light", "").concat(" Leve").trim();
    }

    return text;
}