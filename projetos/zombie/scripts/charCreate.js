var game = "off", //Verifica se o jogo já iniciou, serve para o jogador só poder resetar a vida quando o jogo não começou ainda
    healthInGame = 0; //separa a health aumentada em charCreate da in game

window.alert("What started with rumors now is your reallity. Chaos is an eufemism for what the world has become, and now your only objective is to survive!");

window.alert("Welcome to DEATH CALL, a text based zombie game!");

var character = {
    name: window.prompt("What's your name?"),
    health: 100,
    healthPoints: 0, // evita que a vida alocada na charCreate possa ser resetada in game (guarda qnts pontos foram alocados e salvos)
    strength: 0,
    gun_expertise: 0,
    stealth: 0,
    xp: 0,
    lvl: 1,
    currentHealth: 100, //faz com que a vida atual in game do player seja guardada msm qnd ocorrem resets
    
    setSkills: {
        points: 15, //skillpoints available
        
        choose: function () {
            var skill = window.prompt("Choose your skills (e.g. strength or strength 3): \n \n" + "Health: " + character.health + "   (max: 150) \n" + "Strength: " + character.strength + "   (max: 10) \n" + "Gun-Expertise: " + character.gun_expertise + "   (max: 10) \n" + "Stealth: " + character.stealth + "   (max: 10) \n \n" + "Points left: " + character.setSkills.points + "\n \n" + "Or RESET").split(" "); //split separa as palavras em posições do array
            
            skill[0] = skill[0].toLowerCase();
            
            skill[1] = parseInt(skill[1], 10);
            
            if (!skill[1]) {
                skill[1] = 1;
            }
            
            if (skill[1] <= character.setSkills.points) {  //verifica se o player tem pontos o suficiente para usa-los     
                switch (skill[0]) {
                    case "health":
                        if ((character.health + 5 * skill[1]) > 150) {
                            window.alert("The addition would surpass the limit!");
                        }
                        else {
                            character.health += 5 * skill[1];
                            character.setSkills.points -= skill[1];
                            
                            character.healthPoints += skill[1]; //fixa points em health
                            
                            if (game == "on") { //separa health dada em charCreate da in game
                                healthInGame += skill[1];
                            }
                        }
                        
                        //character.health += 5 * skill[1];
                        break;
                        
                    case "strength":
                        if ((character.strength + skill[1]) > 10) {
                            window.alert("The addition would surpass the limit!");
                        }
                        else {
                            character.strength += skill[1];
                            character.setSkills.points -= skill[1];
                        }
                        
                        //character.strength += skill[1];
                        break;
                        
                    case "gun-expertise":
                        if ((character.gun_expertise + skill[1]) > 10) {
                            window.alert("The addition would surpass the limit!");
                        }
                        else {
                            character.gun_expertise += skill[1];
                            character.setSkills.points -= skill[1];
                        }
                        
                        //character.agility += skill[1];
                        break;
                        
                    case "stealth":
                        if ((character.stealth + skill[1]) > 10) {
                            window.alert("The addition would surpass the limit!");
                        }
                        else {
                            character.stealth += skill[1];
                            character.setSkills.points -= skill[1];
                        }
                        
                        //character.stealth += skill[1];
                        break;
                        
                    case "reset":
                        character.health = character.currentHealth; //resolve problema com reset in game
                        character.strength = 0;
                        character.gun_expertise = 0;
                        character.stealth = 0;
                        
                        if (game == "off") {
                            character.setSkills.points = 15 + character.lvl - 1; //lvl é necessário para se lembrar dos pontos que o player ganha a cada level, e o -1 retira o lvl 1 do calculo, visto que ele é o inicial
                        }
                        else if (game == "on") {
                            character.setSkills.points = 15 + character.lvl - 1 - character.healthPoints + healthInGame;
                        }
                        break;
                    default:
                        window.alert("Invalid Input");
                    }
                }
            else {
                    window.alert("Insert a number lower or equal to the available points!");
            }
        },
        
        display: function() { //transformar em atributo?
            return "Health: " + character.health + "\n" + "Strength: " + character.strength + "\n" + "Gun-Expertise: " + character.gun_expertise + "\n" + "Stealth: " + character.stealth;
        }
    }
};

while (!character.name) {
    character.name = window.prompt("Please, insert your name: ");
}

var resetSkills = false;

while (!resetSkills) {
    while (character.setSkills.points > 0) {
        character.setSkills.choose();
    }
    
    resetSkills = window.confirm(character.setSkills.display() + "\n \n" + "Would you like to keep your choices?");
    
    if (resetSkills == false) {
        character.setSkills.points = 15;
        character.health = 100;
        character.strength = 0;
        character.gun_expertise = 0;
        character.stealth = 0;
    }
}