/*global character, hitChance, levelUp, game, zombie, weapon, dmgUpdate*/

var choice, //attack or stealth
    attack = true, //run from combat
    weaponType,
    weaponFound = "fists",
    hitHolder,
    keepPoints,
    changeWeapon,
    hide,
    z_health,
    z_damage,
    z_xp,
    z_name;

function alertDamage() {
    window.alert("You dealed " + window[weaponFound].damage + " points to the zombie's health (" + z_health + " left), and it dealed " + z_damage + " to yours (" + character.health + " left).");
}
    
function combat() {
    while (z_health > 0 && character.health > 0 && attack == true) {
         //damage related
        
        hitHolder = hitChance(); //hold boolean
        
        if (hitHolder == true && window[weaponFound].type == "gun") { //shot chance true
            z_health -= window[weaponFound].damage;
            character.health -= z_damage;
            character.currentHealth = character.health; //solves reset in game bug
            
            alertDamage();
        }
        else if (hitHolder == false && window[weaponFound].type == "gun") { //shot chance false
            character.health -= z_damage;
            character.currentHealth = character.health; //solves reset in game bug
            
            window.alert("You missed your target! But he damaged you by " + z_damage + " (" + character.health + " left).");
        }
        else if (window[weaponFound].type != "gun") { //not gun hit
            z_health -= window[weaponFound].damage;
            character.health -= z_damage;
            character.currentHealth = character.health; //solves reset in game bug
            
            alertDamage();
        }
        
        //after attack
        
        if (z_health > 0 && character.health > 0) {
            attack = window.confirm("Would you like to keep attacking?");
        }
        else if (z_health <= 0 && character.health <= 0) {
            window.alert("What a perfect scene! You both attack each other at the same time, and die at the same moment... pity you coudn't see it!");
        }
        else if (z_health <= 0) {
            character.xp += z_xp;
            
            window.alert("You killed the zombie and gained " + z_xp + " XP \n XP: " + character.xp);
            
            levelUp();
        }
        else if (character.health <= 0) {
            window.alert("You died!");
        }
    }
}

while (character.health > 0) { //roda jogo enquanto player vivo
    game = "on";
    
    attack = true;
    
    window.alert("You've found a " + event.placeObj.placeCurrent() + ". You look outside and see that it's " + event.weatherObj.weatherCurrent() + " and " + event.timeObj.timeCurrent() + ".");
    
    if (event.zombieChance()) { //zombie found
        do { //attack or stealth
            choice = window.prompt("You spot a zombie, but luckly he hasn't noticed you yet. Would you like to 'attack' it or try 'stealth'?").toLowerCase();
        } while (choice != "attack" && choice != "stealth");
        
        z_health = zombie.healthGen();
        z_damage = zombie.damageGen(); //fixed while combat
        z_name = zombie.name(z_health, z_damage);
        z_xp = z_health + z_damage;
        
        if (choice == "attack") {
            window.alert("You decide to attack the zombie, and realize that it's a " + z_name + ". You start the combat!");
            
            combat();
        }
        
        if (choice == "stealth") {
            window.alert("You decide to try hiding from the zombie, noticing it's a " + z_name + ".");
            
            hide = (Math.random() * 13); //stealth chance arrumei
            
            if (hide <= character.stealth) { //stealth chance check, high because he shouldn't always succeed, arrumar
                character.xp += Math.round(z_xp / 3); //xp ganha com successful stealth
                
                window.alert("You successfully pass by the zombie without alerting it, gaining " + Math.round(z_xp / 3) + " XP! \n XP: " + character.xp);
                
                levelUp();
            }
            else {
                window.alert("Oh no, you alerted it! And it rushed to attack you (-" + z_damage / 2 + " health).");
                
                character.health -= z_damage / 2;
                
                combat();
            }
        }
        
        if (character.health > 0 && attack == true) {
            if (choice == "attack" || (choice == "stealth" && hide > character.stealth)) { //mudar junto com o stealth chance check, ocorre quando não passar. ADD ATTACK == TRUE;;; Arrumei hide
                window.alert("After you killed the zombie, you searched for loot.");
            }
            else if (choice == "stealth" && hide <= character.stealth) { //arrumei hide
                window.alert("After you went unnoticed by the zombie, you searched for loot.");
            }
        }
    }
    else {
        window.alert("After checking the insides you don't find any zombie, so you start looking for loot.");
    }
    
    
    if (character.health > 0 && attack == true) { //loot
        
        weaponType = Math.round(Math.random() * (weapon.length - 1));
            
        if (Math.random() > 0.5) { //chance de achar loot
            character.xp += 5;
            
            changeWeapon = window.confirm("You found a " + weapon[weaponType].name + " (+5 XP)! Do you wanna switch for your's? \n XP: " + character.xp);
                        
            levelUp();
                
            if (changeWeapon == true) {
                weaponFound = weapon[weaponType].id; //não é tipo window["var"] de string para nome de variável, é apenas um array, pois weaponType é um número
                
                if (window[weaponFound].type == "melee") {
                    dmgUpdate(); //atualiza dmg da arma quando player troca de arma
                }
                    
                window.alert("Now you have a " + weapon[weaponType].name + "!");
            }
        }
        else {
            window.alert("After tirelessly looking for something you have no results, and decide to keep wandering.");
        }
    }
    else if (character.health > 0 && attack == false) {
        window.alert("You manage to escape from the zombie, but also lose the opportunity to loot the building!");
    }
}

window.alert("Your Stats: \n \n" + character.name + "\n \n" + character.setSkills.display() + "\n \n Level: " + character.lvl + "\n XP: " + character.xp + "\n \n Thanks for playing!");



localStorage.index = parseInt(localStorage.index) + 1 || 0;

var rank = ["",0];

rank[0] = character.name;
rank[1] = character.xp;

localStorage["obj" + localStorage.index] = rank;

/*var arr = [[],[],[],[],[]];

var p = 0;

for (a in localStorage) {
    Array.prototype.move = function (old_index, new_index) {
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    };
    
    var boolean = false;

    for(i=0;i<arr.length;i++){
        if((localStorage[a].split(',')[1]>arr[i][1] || arr[i][1] == null) && boolean == false && p>0) {
            var j = 0;

            while((arr.length-2-j)>=i) {
                if(arr[arr.length-1-j][1]!=null){
                    arr.move((arr.length-2-j),(arr.length-1-j));
                }
                j++;
            }

            arr[i][0] = localStorage[a].split(',')[0];
            arr[i][1] = localStorage[a].split(',')[1];

            boolean = true;
        }
    }

    p++;
}

window.alert(arr[0][0] + ": " + arr[0][1] + "\n" + arr[1][0] + ": " + arr[1][1] + "\n" + arr[2][0] + ": " + arr[2][1] + "\n" + arr[3][0] + ": " + arr[3][1] + "\n" + arr[4][0] + ": " + arr[4][1] + "\n");*/

var i = 0, rankList = "";

for(a in localStorage) {

    if(i != 0) {
       rankList = rankList + localStorage[a].split(',')[0] + ": " + localStorage[a].split(',')[1] + "\n";
       console.log(rankList);
    }

    i++;
}

window.alert(rankList);