/*global character, keepPoints, dmgUpdate, healthInGame*/

var zombie = {
    healthGen: function () {
        return Math.round(Math.random() * 50 + 25);
    },
            
    damageGen: function () {
        return Math.round(Math.random() * 10 + 5);
    },
    
    name: function (health, damage) {
        var name,
        power = health + damage;
        
        if (power < 46) {
            name = "Weak Zombie";
        }
        else if (power < 61) {
            name = "Zombie";
        }
        else if (power < 76) {
            name = "Strong Zombie";
        }
        else if (power < 91) {
            name = "Hunter Zombie";
        }
        
        return name;
    }
};

var event = {
    weatherObj: {
        weathers: ["sunny", "foggy", "rainy", "cloudy", "thunderstorm", "snowy"],
        weatherCurrent: function () {
            return event.weatherObj.weathers[Math.round(Math.random() * (event.weatherObj.weathers.length - 1))];
        }
    },
    
    placeObj: {
        places: ["shopping mall", "grocery store", "random house", "military base", "hospital", "tech store"],
        placeCurrent: function () {
            return event.placeObj.places[Math.round(Math.random() * (event.placeObj.places.length - 1))];
        }
    },
    
    timeObj: {
        times: ["early morning", "morning", "around midday", "afternoon", "evening", "around midnight"],
        timeCurrent: function () {
            return event.timeObj.times[Math.round(Math.random() * (event.timeObj.times.length - 1))];
        }
    },
    
    zombieChance: function () {
        if (Math.random() > 0.8) {
            return false;
        }
        else {
            return true;
        }
    }
};

function levelUp () {
    if ((character.lvl * 100) < character.xp) { //LEVEL UP -------------------------- TORNAR FUNÇÃO E COLOCAR SEPRE DEPOIS QUE O PLAYER GANHAR XP
        character.lvl++;
            
        character.setSkills.points++;
            
        healthInGame = 0; //reseta a var pois depende deste evento
        keepPoints = false;
        while (keepPoints == false && character.setSkills.points > 0) {
            character.setSkills.choose(); //quando player fica com 0, nao dá opção de resetar pois avança direto
                    
            if (character.setSkills.points > 0) { //quando in game, ao dar pontos para health e depois resetar, a vida reseta mas os pontos inseridos não voltam
                keepPoints = window.confirm("Would you like to distribute your point/s later?");
            }
        }
                
        window.alert(character.setSkills.display());
            
        dmgUpdate(); //atualiza a dmg das armas quando player upa
    }
}

//window.alert(zombie.name());

//window.alert(event.weatherObj.weatherCurrent());

//window.alert(event.placeObj.placeCurrent());

//window.alert(event.timeObj.timeCurrent());

//window.alert(event.zombieChance());