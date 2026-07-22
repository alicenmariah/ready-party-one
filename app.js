// let player = {
//     playerName:"",
//     playerAC:"",
//     playerMaxHP:"",
//     playerCurrentHP:"",
//     playerInitNum:""
// }

// let customMonster = {
//     monsterName:"",
//     monsterAC:"",
//     monsterMaxHP: 0,
//     monsterCurrentHP: 0,
//     monsterInitNum:"",
//     mobYN: true,
//     mobNum:0,
//     mobColor:"",
//     monID:""
// }

//Keep for reference, this won't work I think

let customMonsters = [];
let players = [];

//Adding from the Player Form
const playerForm = document.querySelector("#player-init-item");

playerForm.addEventListener("submit", function (event) {
    event.preventDefault();

const newPlayer = {
    playerName: document.querySelector("#player-name").value,
    playerAC: Number(document.querySelector("#player-ac").value),
    playerMaxHP: Number(document.querySelector("#player-max-hp").value),
    playerCurrentHP: Number(
        document.querySelector("#player-current-hp").value
    ),
    playerInitNum: Number(
        document.querySelector("#player-initiative").value
    )};

    players.push(newPlayer);

    displayInitiative();

    playerForm.reset();
});

//Adding from the Custom Monster Form
const customMonsterForm = document.querySelector("#custom-monster-init-item");

customMonsterForm.addEventListener("submit", function (event) {
    event.preventDefault();


const newCustomMonster = {
    customMonsterName: document.querySelector("#custom-monster-name").value,
    customMonsterAC: Number(document.querySelector("#custom-monster-ac").value),
    customMonsterMaxHP: Number(document.querySelector("#custom-monster-max-hp").value),
    customMonsterCurrentHP: Number(
        document.querySelector("#custom-monster-current-hp").value
    ),
    customInitNum: Number(
        document.querySelector("#custom-monster-initiative").value
    )};

    customMonsters.push(newCustomMonster);

    displayInitiative();

    customMonsterFormForm.reset();
});



//Converting a Monster's HP number to a Description
let monsterMaxHP = customMonsters.monsterMaxHP;
let monsterCurrentHP = customMonsters.monsterCurrentHP;
let monsterDescription = "";

function  ConvertMonsterHP (monsterCurrentHP, monsterMaxHP) {
    if (monsterMaxHP == monsterCurrentHP) {
        return monsterDescription = "Uninjured";
    } else if (monsterCurrentHP >= monsterMaxHP * 0.75 
        && monsterCurrentHP > monsterMaxHP * 0.50) {
        return monsterDescription = "Barely Injured";
    } else if (monsterCurrentHP >= monsterMaxHP * 0.50 
        && monsterCurrentHP > monsterMaxHP * 0.25) {
        return monsterDescription = "Injured";
    } else if (monsterCurrentHP >= monsterMaxHP * 0.25 
        && monsterCurrentHP > monsterMaxHP * 0.01) {
        return monsterDescription = "Badly Injured";
    } else if (monsterCurrentHP >= monsterMaxHP * 0.01) {
        return monsterDescription = "Near Death";
    } else {
        return monsterDescription = "Dead";
    }
}

function SortInitiative (monsterInitNum, playerInitNum) {
    
}