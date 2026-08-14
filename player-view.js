
function getCombatants() {
    return JSON.parse(localStorage.getItem("combatants")) || [];
}

//Converting a Monster's HP number to a Description
function ConvertMonsterHP (monsterCurrentHP, monsterMaxHP) {
    if (monsterMaxHP == monsterCurrentHP) {
        return "Uninjured";
    } else if (monsterCurrentHP >= monsterMaxHP * 0.75
        && monsterCurrentHP > monsterMaxHP * 0.50) {
        return "Barely Injured";
    } else if (monsterCurrentHP >= monsterMaxHP * 0.50
        && monsterCurrentHP > monsterMaxHP * 0.25) {
        return "Injured";
    } else if (monsterCurrentHP >= monsterMaxHP * 0.25
        && monsterCurrentHP > monsterMaxHP * 0.01) {
        return "Badly Injured";
    } else if (monsterCurrentHP >= monsterMaxHP * 0.01) {
        return "Near Death";
    } else {
        return "Dead";
    }
}

//Player View Boxes
function renderPlayerView () {
    const combatants = getCombatants();
    const currentTurnIndex = Number(localStorage.getItem("currentTurnIndex")) || 0;
    const currentRound = Number(localStorage.getItem("currentRound")) || 1;

    const displayHiddenMessage = document.querySelector(".no-combatants-message");
    const displayCurrentRound = document.querySelector(".current-round-player-view");
    displayCurrentRound.textContent = `Round ${currentRound}`;

    const combatList = document.querySelector(".player-view-combat-list");

    combatList.innerHTML = "";

    const playerTemplatePlayer = document.querySelector(".player-box-template");
    const monsterTemplatePlayer = document.querySelector(".monster-box-template");

    let currentTurnCard = null;

    combatants.forEach(function (combatant, index) {
        let card;

        if (combatant.type === "player") {

            //Clones Player View Player Template
            card = playerTemplatePlayer.cloneNode(true);

            //Remove Hidden CSS
            card.classList.remove("hidden");

            //Player View Player Name
            card.querySelector("h1").textContent = combatant.name;

            //Player View Player Armour Class
            card.querySelector(".ac-card-num").textContent = combatant.ac;

            //Player View Player Current/Max HP
            card.querySelector(".major-stats h2").textContent = `${combatant.currentHP}/${combatant.maxHP}`;

            //Player View Player HP Meter
            const playerMeter = card.querySelector("meter");
            playerMeter.max = combatant.maxHP;
            playerMeter.value = combatant.currentHP;
            playerMeter.low = combatant.maxHP * 0.25;
            playerMeter.high = combatant.maxHP * 0.5;
            playerMeter.optimum = combatant.maxHP;

        } else if (combatant.type === "monster") {
            //Clones Monster Player Template
            card = monsterTemplatePlayer.cloneNode(true);

            //Remove Hidden CSS
            card.classList.remove("hidden");

            //Player View Monster Name
            card.querySelector("h1").textContent = combatant.name;

            card.querySelector(".ac-card-num").textContent = combatant.acRevealed ? combatant.ac : "?";

            //Player View Monster HP Description
            card.querySelector(".major-stats h2").textContent =
                ConvertMonsterHP(combatant.currentHP, combatant.maxHP);
        }

        if (index === currentTurnIndex) {
            card.classList.add("current-turn");
            currentTurnCard = card;
        }

        combatList.appendChild(card);
    });

    //if no combatants then display the hidden "No Combatants" message
    if (combatants.length === 0) {
        displayHiddenMessage.classList.remove("hidden");
    } else {
        displayHiddenMessage.classList.add("hidden");
    }

    //!! AI Helped, hard time getting the Arrow to Current Player, and be responsive
    const arrow = document.querySelector(".current-turn-arrow");

    if (!currentTurnCard) {
        arrow.classList.add("hidden");
        return;
    }

    arrow.classList.remove("hidden");

    const section = document.querySelector(".player-view-section");
    const sectionBox = section.getBoundingClientRect();
    const cardBox = currentTurnCard.getBoundingClientRect();

    arrow.style.left = `${cardBox.left - sectionBox.left + cardBox.width / 2 - arrow.offsetWidth / 2}px`;
    arrow.style.top = `${cardBox.top - sectionBox.top - arrow.offsetHeight}px`;
}
// !! AI Helped, had issues linking DM and Player views and sizing Player View
renderPlayerView();

window.addEventListener("storage", function (event) {
    if (event.key === "combatants" || event.key === "currentTurnIndex" || event.key === "currentRound") {
        renderPlayerView();
    }
});

window.addEventListener("resize", function () {
    renderPlayerView();
});


