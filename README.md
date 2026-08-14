# Ready Party One
*A D&D Initiative Tracker*

## Overview and Objectives

Ready Party One is a web app for tracking Dungeons & Dragons combat initiative. It has a DM View managing players, monsters, HP, AC, and turn order, and a separate player view meant to be shown to players on a TV/Monitor during a D&D session.

The goals of the project were to:

- Build a clean, responsive layout using HTML, CSS Grid, Flexbox, and media queries
- Track initiative, HP, and AC for both players and monsters, and move through turns and rounds
- Pull monster stat blocks from the D&D 5e SRD API or add custom ones
- Persist combat state in localStorage so it stays after a refresh
- Keep certain information hidden from players like exact monster HP and AC

## Pages

**index.html** is the DM View. This is where players and monsters get added, HP is healed or damaged, initiative order is tracked, and turns and rounds move forward and back (in case you move forward on accident).

**player-view.html** is the Player View. It reads the same combat data from localStorage and displays a simplified version meant for the players to see AC, HP and an arrow marking whose turn it is on a TV/Monitor during D&D sessions names,

## Setup

This is a site with no build step and no npm install required.

To run it locally:
- Open the project folder in a code editor
- Open index.html with Live Server extension in VS Code, then open the Player View from the link in the header


## Data Sources and API Integration

Monster data comes from the [D&D 5e SRD API](https://www.dnd5eapi.co) a free public API with no key or authentication required.

When a monster or NPC is picked from the search results, its name, AC, and HP are used to fill in the Add Player or Add Monster form.

## AI Usage

AI assistance was used as a learning, debugging (& sanity) tool for certain parts of the project, which are labeled as `//AI Helped`. It's my goal to go back over these parts and redo them as I learn more about these concepts. Code suggested by AI was reviewed, tested, and revised before being kept.
