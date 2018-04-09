function combat() {   
    while (z_health > 0 && character.health > 0 && attack == true) {
        z_health -= window[weaponFound].damage;
        character.health -= z_damage;
        
        window.alert("You dealed " + window[weaponFound].damage + " points to the zombie's health (" + z_health + " left), and it dealed " + z_damage + " to yours (" + character.health + " left).");
            
        if (z_health > 0 && character.health > 0) {
            attack = window.confirm("Would you like to keep attacking?");
        }
        else if (z_health <= 0 && character.health <= 0) {
            window.alert("What a perfect scene! You both attack each other at the same time, and die at the same moment... pity you coudn't see it!");
        }
        else if (z_health <= 0) {
            window.alert("You killed the zombie!");
        }
        else if (character.health <= 0) {
            window.alert("You died!");
        }
    }
}