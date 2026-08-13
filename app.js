
const combatants = JSON.parse(localStorage.getItem("combatants")) || [];

const addPlayer = document.getElementById("add-player-button");
const addMonster =  document.getElementById("add-monster-button");


//Add monsters to combtant array and covert array to json for local storage
addMonster.addEventListener('click', function(event) {
            // Stops site from refreshing the page
            event.preventDefault();

            //All the stuff I need to add from form
            const formData = new FormData(addMonster.form);
            const monsterName = formData.get('monster-name');
            const monsterInit = formData.get('monster-init-num');
            const monsterAC = formData.get('monster-ac');
            const monsterCurrentHP = formData.get('monster-current-hp');
            const monsterMaxHP = formData.get('monster-max-hp');

            const customMonster = {
                name: monsterName,
                init: monsterInit,
                ac: monsterAC,
                currentHP: monsterCurrentHP,
                maxHP: monsterMaxHP
};

            combatants.push(customMonster);

            localStorage.setItem("combatants", JSON.stringify(combatants));

        });

//Add players to combtant array and covert array to json for local storage
addPlayer.addEventListener('click', function(event) {
            // Stops site from refreshing the page
            event.preventDefault();

            //All the stuff I need to add from form
            const formData = new FormData(addPlayer.form);
            const playerName = formData.get('player-name');
            const playerInit = formData.get('player-init-num');
            const playerAC = formData.get('player-ac');
            const playerCurrentHP = formData.get('player-current-hp');
            const playerMaxHP = formData.get('player-max-hp');

            const customPlayer = {
                name: playerName,
                init: playerInit,
                ac: playerAC,
                currentHP: playerCurrentHP,
                maxHP: playerMaxHP
};

            console.log(combatants)

            combatants.push(customPlayer);

            localStorage.setItem("combatants", JSON.stringify(combatants));

        });

//Now to get Monsters and Players to display in the DM View and Player View

//DM View Templates
const monsterTemplateDM = document.querySelector(".monster-card-template");
const playerTemplateDM = document.querySelector(".player-card-template");

const monsterDMCard = monsterTemplateDM.cloneNode(true);
const playerDMCard = playerTemplateDM.cloneNode(true);


//Remove Hidden CSS
monsterDMCard.classList.remove("hidden");
playerDMCard.classList.remove("hidden");

monsterDMCard.querySelector(".monster-name").textContent = customMonster.name;




//Player View Templates
const monsterTemplatePlayer = document.querySelector(".monster-box-template");
const playerTemplatePlayer = document.querySelector(".player-box-template");


const monsterPlayerBox = monsterTemplatePlayer.cloneNode(true);
const playerPlayerBox = playerTemplatePlayer.cloneNode(true);

//Remove Hidden CSS
monsterPlayerBox.classList.remove("hidden");
playerPlayerBox.classList.remove("hidden");



const listCombatant = document.createElement("");



// combatants.sort(function (a, b) {
//     return b.initiative - a.initiative;
// });

//Converting a Monster's HP number to a Description
// let monsterMaxHP = customMonsters.monsterMaxHP;
// let monsterCurrentHP = customMonsters.monsterCurrentHP;
// let monsterDescription = "";

// function  ConvertMonsterHP (monsterCurrentHP, monsterMaxHP) {
//     if (monsterMaxHP == monsterCurrentHP) {
//         return monsterDescription = "Uninjured";
//     } else if (monsterCurrentHP >= monsterMaxHP * 0.75 
//         && monsterCurrentHP > monsterMaxHP * 0.50) {
//         return monsterDescription = "Barely Injured";
//     } else if (monsterCurrentHP >= monsterMaxHP * 0.50 
//         && monsterCurrentHP > monsterMaxHP * 0.25) {
//         return monsterDescription = "Injured";
//     } else if (monsterCurrentHP >= monsterMaxHP * 0.25 
//         && monsterCurrentHP > monsterMaxHP * 0.01) {
//         return monsterDescription = "Badly Injured";
//     } else if (monsterCurrentHP >= monsterMaxHP * 0.01) {
//         return monsterDescription = "Near Death";
//     } else {
//         return monsterDescription = "Dead";
//     }
// }

// function SortInitiative (monsterInitNum, playerInitNum) {
    
// }

// function PlayerOrMonster (player,monster) {
//     if (player) {
//         return 
//     }
// }