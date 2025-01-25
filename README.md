# Fish Evolution Game

This repository contains the code for a simple yet engaging fish evolution game implemented using HTML5 canvas and JavaScript. The game features genetic algorithms, AI-controlled fish, and player interaction with a submarine.

## Features

- **Fish Evolution**: The fish population evolves using genetic algorithms, including selection, crossover, and mutation.
- **Submarine Control**: Players can control a submarine to shoot at fish using keyboard controls.
- **Canvas Rendering**: Fish and submarine graphics are rendered dynamically on the HTML5 canvas.
- **Adaptive Gameplay**: The game adjusts as generations of fish evolve, with a blend of elitism and mutation.

## How to Play

1. **Controls**:
   - `Enter`: Restart the game.
   - `Space`: Shoot bullets from the submarine.
   - `Left Arrow` or `A`: Move the submarine left.
   - `Right Arrow` or `D`: Move the submarine right.
2. The goal is to prevent fish from reaching the submarine zone by shooting them.
3. Fish evolve over generations based on fitness values, adapting to gameplay.

## File Structure

```plaintext
├── css
│   └── main.css          # Styles for the game layout
├── js
│   ├── Fish.js           # Fish class implementing movement and rendering
│   ├── SubmarinePilot.js # Submarine class for player interaction
│   ├── Genetics.js       # Genetic algorithm implementation
│   └── main.js           # Game initialization and loop
├── index.html            # Entry point for the game
```

## Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Open `index.html` in a web browser to start the game.

3. Use the keyboard controls to play.

## Key Classes and Logic

### Fish
- Represents individual fish with properties like position, shape, and fitness.
- Updates position and checks for collisions with the submarine’s bullets.
- Fitness value determines survival and reproduction chances.

### Genetics
- Implements genetic algorithms for fish population evolution.
- Includes selection, crossover, and mutation functions to create new generations.
- Maintains a balance between exploration (mutation) and exploitation (elitism).

### SubmarinePilot
- Represents the player-controlled submarine.
- Handles movement and shooting mechanics.

