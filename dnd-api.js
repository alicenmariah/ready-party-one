const monsterSearch = document.getElementById("mon-search");
const monsterSearchButton = document.getElementById("mon-search-button");
const monsterSearchClear = document.getElementById("mon-search-clear");
const monsterSearchResults = document.getElementById("monster-search-results");

const monsterNameInput = document.getElementById("monster-name");
const monsterACInput = document.getElementById("monster-ac");
const monsterCurrentHPInput = document.getElementById("monster-current-hp");
const monsterMaxHPInput = document.getElementById("monster-max-hp");
const monsterInitInput = document.getElementById("monster-init-num");

const npcSearch = document.getElementById("npc-search");
const npcSearchButton = document.getElementById("npc-search-button");
const npcSearchClear = document.getElementById("npc-search-clear");
const npcSearchResults = document.getElementById("npc-search-results");

const playerNameInput = document.getElementById("player-name");
const playerACInput = document.getElementById("player-ac");
const playerCurrentHPInput = document.getElementById("player-current-hp");
const playerMaxHPInput = document.getElementById("player-max-hp");
const playerInitInput = document.getElementById("player-init-num");

monsterSearchButton.addEventListener("click", () => {
  const monsterName = monsterSearch.value.toLowerCase();
  searchMonster(monsterName);
});

//clears search box
monsterSearchClear.addEventListener("click", () => {
  monsterSearch.value = "";
  monsterSearchResults.innerHTML = "";
  monsterSearchResults.classList.add("hidden");
  monsterSearch.focus();
});

npcSearchButton.addEventListener("click", () => {
  const npcName = npcSearch.value.toLowerCase();
  searchNPC(npcName);
});

//clears search box
npcSearchClear.addEventListener("click", () => {
  npcSearch.value = "";
  npcSearchResults.innerHTML = "";
  npcSearchResults.classList.add("hidden");
  npcSearch.focus();
});

//referenced mdn using the fetch example
//also refreanced https://5e-bits.github.io/docs/tutorials/advanced/monster-search-with-javascript example monster search
//npcs use this too, same url
async function searchSRDMonsters(searchTerm, resultsList, fillForm) {
  const url = "https://www.dnd5eapi.co/api/2014/monsters";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const dnd5eAPIresult = await response.json();
    const monsters = dnd5eAPIresult.results;
    const matchedMonsters = monsters.filter
    ((monster) => monster.name.toLowerCase().includes(searchTerm));

    //API has no results
    if (matchedMonsters.length === 0) {
      resultsList.classList.add("hidden");
      alert("No Results");
      return;
    }

    //clears search
    resultsList.innerHTML = "";

    matchedMonsters.forEach((monster) => {
      const resultItem = document.createElement("li");
      resultItem.textContent = monster.name;

      resultItem.addEventListener("click", () => {
        fillForm(monster.url);
        resultsList.classList.add("hidden");
      });

      resultsList.appendChild(resultItem);
    });

    resultsList.classList.remove("hidden");

  } catch (error) {
    console.error(error.message);
  }
}

function searchMonster(monsterName) {
  return searchSRDMonsters(monsterName, monsterSearchResults, fillMonsterForm);
}

function searchNPC(npcName) {
  return searchSRDMonsters(npcName, npcSearchResults, fillPlayerForm);
}

//Dice roll sim
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function abilityModifier(score) {
  return Math.floor((score - 10) / 2);
}

//fills form inputs from stat block
async function fillStatBlockForm(statBlockUrl, inputs) {
  try {
    const response = await fetch(`https://www.dnd5eapi.co${statBlockUrl}`);
    const statBlockData = await response.json();

    inputs.name.value = statBlockData.name;
    inputs.ac.value = statBlockData.armor_class[0].value;
    inputs.currentHP.value = statBlockData.hit_points;
    inputs.maxHP.value = statBlockData.hit_points;

    //D20 Roll plus Initiative Bonus
    const dexModifier = abilityModifier(statBlockData.dexterity);
    const rolledD20 = rollDie(20);
    inputs.init.value = rolledD20 + dexModifier;
  } catch (error) {
    console.error(error.message);
  }
}

function fillMonsterForm(monsterUrl) {
  return fillStatBlockForm(monsterUrl, {
    name: monsterNameInput,
    ac: monsterACInput,
    currentHP: monsterCurrentHPInput,
    maxHP: monsterMaxHPInput,
    init: monsterInitInput
  });
}

//same as monster, different inputs
function fillPlayerForm(npcUrl) {
  return fillStatBlockForm(npcUrl, {
    name: playerNameInput,
    ac: playerACInput,
    currentHP: playerCurrentHPInput,
    maxHP: playerMaxHPInput,
    init: playerInitInput
  });
}
