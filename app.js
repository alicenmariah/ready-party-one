const playerTemplate = document.querySelector("#player-card-template");
const monsterTemplate = document.querySelector("#monster-card-template");

const playerContainer = document.querySelector("#player-card");
const monsterContainer = document.querySelector("#monster-card");

let playerTokenSrc = "";
let monsterTokenSrc = "";

const playerFileInput = document.getElementById("player-image");
const monsterFileInput = document.getElementById("monster-image");

playerFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        playerTokenSrc = reader.result;
    };
    reader.readAsDataURL(file);
});

document.querySelector("#add-player-button").addEventListener("click", function () {
    const card = playerTemplate.cloneNode(true);

    card.removeAttribute("id");
    card.classList.remove("hidden");

    card.querySelector("p:nth-of-type(1)").textContent =
        `# ${document.querySelector("#player-init-num").value}`;

    card.querySelector("p:nth-of-type(2)").textContent =
        `Player Name: ${document.querySelector("#player-name").value}`;

    card.querySelector("p:nth-of-type(3)").textContent =
        `AC: ${document.querySelector("#player-ac").value}`;

    card.querySelector("p:nth-of-type(4)").textContent =
        `Current HP: ${document.querySelector("#player-current-hp").value}`;

    card.querySelector("p:nth-of-type(5)").textContent =
        `Max HP: ${document.querySelector("#player-max-hp").value}`;

    const token = card.querySelector(".token-image");
    token.src = playerTokenSrc || "";
    token.alt = "Player token";

    playerContainer.appendChild(card);
});

monsterFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        monsterTokenSrc = reader.result;
    };
    reader.readAsDataURL(file);
});

document.querySelector("#add-monster-button").addEventListener("click", function () {
    const card = monsterTemplate.cloneNode(true);

    card.removeAttribute("id");
    card.classList.remove("hidden");

    card.querySelectorAll("p")[0].textContent =
        `Monster Name: ${document.querySelector("#monster-name").value}`;

    card.querySelectorAll("p")[1].textContent =
        `# ${document.querySelector("#monster-init-num").value}`;

    card.querySelectorAll("p")[2].textContent =
        `AC: ${document.querySelector("#monster-ac").value}`;

    card.querySelectorAll("p")[3].textContent =
        `Current HP: ${document.querySelector("#monster-current-hp").value}`;

    card.querySelectorAll("p")[4].textContent =
        `Max HP: ${document.querySelector("#monster-max-hp").value}`;

    const token = card.querySelector(".token-image");
    token.src = monsterTokenSrc || "";
    token.alt = "Monster token";

    monsterContainer.appendChild(card);
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

function PlayerOrMonster (player,monster) {
    if (player) {
        return 
    }
}