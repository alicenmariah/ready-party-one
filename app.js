
const combatants = JSON.parse(localStorage.getItem("combatants")) || [];

const addPlayer = document.getElementById("add-player-button");

const addMonster =  document.getElementById("add-monster-button");

const combatListDM = document.querySelector(".dm-combat-list");

const savedCombatList = localStorage.getItem("combatListDM");


const playerForm = document.getElementById("add-player-form");

const monsterForm = document.getElementById("add-monster-form");



//AI Helped, not entirely certain how innerhtml works
//if there is a saved combat list the combat list is unhidden
  if (savedCombatList) {
      combatListDM.innerHTML = savedCombatList;
      combatListDM.classList.remove("hidden");
  }


let currentTurnIndex = 0;
let currentRound = 1;

//if no combatants then display the hidden message
function noCombatants () {
    const displayHiddenMessage = document.querySelector(".no-combatants-message");
    const roundBox = document.querySelector(".round-box");
    const resetBox = document.querySelector(".reset-dm-view-list-box");

    if (combatants.length === 0) {
        displayHiddenMessage.classList.remove("hidden");
        combatListDM.classList.add("hidden");
        roundBox.classList.add("hidden");
        resetBox.classList.add("hidden");

    } else {
        displayHiddenMessage.classList.add("hidden");
        combatListDM.classList.remove("hidden");
        roundBox.classList.remove("hidden");
        resetBox.classList.remove("hidden");
    }

    updateCurrentCombatantDisplay();
}

noCombatants();


//Shows whose turn it is inbetween buttons
function updateCurrentCombatantDisplay () {
    const displayCurrentCombatant = document.getElementById("display-current-combatant-dm-view");
    const displayCurrentRound = document.getElementById("display-current-round");
    const cards = combatListDM.querySelectorAll(".player-card-template, .monster-card-template");

    //Hightlight the current Combatant
    cards.forEach(function (card) {
        card.classList.remove("current-turn");
    });

    //AI Helped, wasnt sure how to do this
    if (combatants.length === 0) {
        displayCurrentCombatant.textContent = "";
        displayCurrentRound.textContent = "";
        return;
    }

    //Keep in range in case someone was added or removed
    if (currentTurnIndex >= combatants.length) {
        currentTurnIndex = 0;
    }

    const currentCombatant = combatants[currentTurnIndex];
    displayCurrentCombatant.textContent = `${currentCombatant.name}'s turn`;
    displayCurrentRound.textContent = `Round ${currentRound}`;

    localStorage.setItem("currentTurnIndex", currentTurnIndex);
    localStorage.setItem("currentRound", currentRound);

    //AI Helped, had a major bug with current turns
    cards.forEach(function (card) {
        if (card.dataset.id === currentCombatant.id) {
            card.classList.add("current-turn");
        }
    });
}

//Moves to the next combatant
document.getElementById("next-combatant").addEventListener("click", function () {
    if (combatants.length === 0) return;

    //Wrapping back to the first combatant starts a new round
    if (currentTurnIndex === combatants.length - 1) {
        currentRound++;
    }

    currentTurnIndex = (currentTurnIndex + 1) % combatants.length;
    updateCurrentCombatantDisplay();
});

//Moves to the previous combatant
document.getElementById("previous-combatant").addEventListener("click", function () {
    if (combatants.length === 0) return;

    //If it goes past the first combatant it undoes a round
    if (currentTurnIndex === 0 && currentRound > 1) {
        currentRound--;
    }

    currentTurnIndex = (currentTurnIndex - 1 + combatants.length) % combatants.length;
    updateCurrentCombatantDisplay();
});


//Sorts combatants by initiative then saves to local storage
function sortCombatListDM () {
    combatants.sort(function (a, b) {
        return Number(b.init) - Number(a.init);
    });

    const cards = Array.from(combatListDM.querySelectorAll(".player-card-template, .monster-card-template"));

    cards.sort(function (cardA, cardB) {
        const initA = Number(cardA.querySelector(".player-init, .monster-init").textContent);
        const initB = Number(cardB.querySelector(".player-init, .monster-init").textContent);
        return initB - initA;
    });

    cards.forEach(function (card) {
        combatListDM.appendChild(card);
    });

    localStorage.setItem("combatants", JSON.stringify(combatants));
    //AI Helped, not sure how to use Inner HTML
    localStorage.setItem("combatListDM", combatListDM.innerHTML);

    updateCurrentCombatantDisplay();
}


//Add monsters to the DM View Combat List, and save to local storage
addMonster.addEventListener('click', function(event) {
            // Stops site from refreshing the page
            event.preventDefault();

            //Don't add the monster unless all required fields are filled in
            if (!monsterForm.checkValidity()) {
                monsterForm.reportValidity();
                return;
            }

            //All the stuff I need to add from form
            const formData = new FormData(addMonster.form);
            const monsterName = formData.get('monster-name');
            const monsterInit = formData.get('monster-init-num');
            const monsterAC = formData.get('monster-ac');
            const monsterCurrentHP = formData.get('monster-current-hp');
            const monsterMaxHP = formData.get('monster-max-hp');

            const customMonster = {
                id: crypto.randomUUID(),
                type: 'monster',
                name: monsterName,
                init: monsterInit,
                ac: monsterAC,
                currentHP: monsterCurrentHP,
                maxHP: monsterMaxHP
};


            combatants.push(customMonster);

            noCombatants();

        //DM View Template
        const monsterTemplateDM = document.querySelector(".monster-card-template");

        //Clones DM Monster Template
        const monsterDMCard = monsterTemplateDM.cloneNode(true);
        monsterDMCard.dataset.id = customMonster.id;

        //DM View Monster Names
        monsterDMCard.querySelector(".monster-name").textContent = customMonster.name;

        //DM View Monster Initiative
        monsterDMCard.querySelector(".monster-init").textContent = customMonster.init;

        //DM View Monster Armour Class
        monsterDMCard.querySelector(".monster-ac").textContent = customMonster.ac;

        //DM View Monster Current HP
        monsterDMCard.querySelector(".monster-current-hp").textContent = `${customMonster.currentHP} / `;

        //DM View Monster Max HP
        monsterDMCard.querySelector(".monster-max-hp").textContent = customMonster.maxHP;

        combatListDM.classList.remove("hidden");

         //Remove Hidden CSS
        monsterDMCard.classList.remove("hidden");

        combatListDM.appendChild(monsterDMCard);

        sortCombatListDM();

        });



//Add players to the DM View Combat List, and save to local storage
addPlayer.addEventListener('click', function(event) {
            // Stops site from refreshing the page
            event.preventDefault();

            //Don't add the player unless all required fields are filled in
            if (!playerForm.checkValidity()) {
                playerForm.reportValidity();
                return;
            }

            //All the stuff I need to add from form
            const formData = new FormData(addPlayer.form);
            const playerName = formData.get('player-name');
            const playerInit = formData.get('player-init-num');
            const playerAC = formData.get('player-ac');
            const playerCurrentHP = formData.get('player-current-hp');
            const playerMaxHP = formData.get('player-max-hp');

            const customPlayer = {
                id: crypto.randomUUID(),
                type: 'player',
                name: playerName,
                init: playerInit,
                ac: playerAC,
                currentHP: playerCurrentHP,
                maxHP: playerMaxHP
};

            combatants.push(customPlayer);

            noCombatants();

        //DM View Player Template
        const playerTemplateDM = document.querySelector(".player-card-template");

        //Clone Player Template
        const playerDMCard = playerTemplateDM.cloneNode(true);
        playerDMCard.dataset.id = customPlayer.id;

        //DM View Player Names
        playerDMCard.querySelector(".player-name").textContent = customPlayer.name;

        //DM View Player Initiative
        playerDMCard.querySelector(".player-init").textContent = customPlayer.init;

        //DM View Player Armour Class
        playerDMCard.querySelector(".player-ac").textContent = customPlayer.ac;

        //DM View Player Current HP
        playerDMCard.querySelector(".player-current-hp").textContent = `${customPlayer.currentHP} / `;

        //DM View Player Max HP
        playerDMCard.querySelector(".player-max-hp").textContent = customPlayer.maxHP;

        //Remove Hidden CSS
        playerDMCard.classList.remove("hidden");

        combatListDM.classList.remove("hidden");

        combatListDM.appendChild(playerDMCard);

        sortCombatListDM();

        });



    //Deletes Combatant Cards in DM View
    combatListDM.addEventListener("click", (event) => {
    const deleteTrigger = event.target.closest(".delete");
    if (!deleteTrigger) return;

    const card = deleteTrigger.closest(".player-card-template, .monster-card-template");
    if (!card) return;

    const index = combatants.findIndex(c => c.id === card.dataset.id);
    if (index !== -1) combatants.splice(index, 1);

    card.remove();

    localStorage.setItem("combatants", JSON.stringify(combatants));
     //AI Helped, not sure how to use Inner HTML
    localStorage.setItem("combatListDM", combatListDM.innerHTML);
    noCombatants();
});


//Stops the hp + - inputs from submitting the page on Enter
combatListDM.addEventListener("submit", (event) => {
    event.preventDefault();
});


//AI Helped, had a hard time wrapping my mind around the math logic
// Heals, damages, or maxes a Combatant's current HP in the DM view
combatListDM.addEventListener("click", (event) => {
    const healTrigger = event.target.closest(".heal");
    const damageTrigger = event.target.closest(".damage");
    const maxTrigger = event.target.closest(".heal-max-hp-button");
    if (!healTrigger && !damageTrigger && !maxTrigger) return;

    const card = event.target.closest(".player-card-template, .monster-card-template");
    if (!card) return;

    const combatant = combatants.find(c => c.id === card.dataset.id);
    if (!combatant) return;

    const currentHPSpan = card.querySelector(".player-current-hp, .monster-current-hp");
    const healthInput = card.querySelector(".adjust-player-health, .adjust-monster-health");

    const maxHP = Number(combatant.maxHP) || 0;
    let currentHP = Number(combatant.currentHP) || 0;

    if (maxTrigger) {
        //Max button heals back up to the Combatant's max HP
        currentHP = maxHP;
    } else {
        const amount = Number(healthInput.value) || 0;
        if (amount === 0) return;

        if (healTrigger) {
            currentHP = Math.min(currentHP + amount, maxHP);
        } else if (damageTrigger) {
            currentHP = Math.max(currentHP - amount, 0);
        }
    }

    combatant.currentHP = currentHP;
    currentHPSpan.textContent = `${currentHP} / `;
    healthInput.value = "";

    localStorage.setItem("combatants", JSON.stringify(combatants));
     //AI Helped, not sure how to use Inner HTML
    localStorage.setItem("combatListDM", combatListDM.innerHTML);
});








































