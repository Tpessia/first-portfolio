/*global character, weaponFound*/

function Weapons(id, name, type, damage, weight, accuracy) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.weight = weight;
    this.accuracy = accuracy;
}

var pistol_9mm = new Weapons("pistol_9mm", "9mm pistol", "gun", 25, 1.5, 0.7);

var submachine_gun = new Weapons("submachine_gun", "Submachine Gun", "gun", 30, 2.5, 0.5);

var assault_rifle = new Weapons("assault_rifle", "Assault Rifle", "gun", 45, 4, 0.6);

var baseball_bat = new Weapons("baseball_bat", "Baseball Bat", "melee", (10 + 3 * character.strength), 3, 1);

var combat_knife = new Weapons("combat_knife", "Combat Knife", "melee", (8 + 2 * character.strength), 0.5, 1);

var fists = new Weapons("fists", "Fists", "melee", (10 + character.strength), 0, 1);

//SE CRIAR NOVA MELEE, ATUALIZAR FUNCAO dmgUpdate

var weapon = [];

weapon.push(pistol_9mm, submachine_gun, assault_rifle, baseball_bat, combat_knife);

function hitChance() {
    if (Math.random() > (window[weaponFound].accuracy + (character.gun_expertise / (100 / 3)))) { //gun_expertise contribui com 0.3 na accuracy
        return false;
    }
    else {
        return true;
    }
}

function dmgUpdate() {
    if (weaponFound == "baseball_bat") {
        baseball_bat.damage = 10 + 3 * character.strength;
    }
    else if (weaponFound == "combat_knife") {
        combat_knife.damage = 8 + 2 * character.strength;
    }
    else if (weaponFound == "fists") {
        fists.damage = 10 + character.strength;
    }
}