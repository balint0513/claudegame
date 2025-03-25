/**
 * Main entry point for the game
 */

// Wait for DOM to load before initializing the game
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the game
    const game = new Game();
    game.init();
    
    // Start the game loop
    game.start();
});