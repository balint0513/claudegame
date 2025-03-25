/**
 * Game class for managing the game state and loop
 */
class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.width = 800;
        this.height = 600;
        this.player = null;
        this.platforms = [];
        this.isRunning = false;
        this.lastTime = 0;
    }
    
    /**
     * Initialize the game
     */
    init() {
        // Get the canvas and context
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        // Set canvas dimensions
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Get the rendering context
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('Could not get canvas context!');
            return;
        }
        
        // Create player
        this.player = new Player(this.width / 2, this.height / 2);
        
        // Create platforms
        this.createPlatforms();
        
        console.log('Game initialized successfully');
    }
    
    /**
     * Create platforms for the game
     */
    createPlatforms() {
        // Create ground platform
        this.platforms.push(new Platform(0, this.height - 40, this.width, 40));
        
        // Create some floating platforms
        this.platforms.push(new Platform(100, 400, 200, 20));
        this.platforms.push(new Platform(400, 300, 200, 20));
        this.platforms.push(new Platform(200, 200, 200, 20));
    }
    
    /**
     * Start the game loop
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
        console.log('Game started');
    }
    
    /**
     * Stop the game loop
     */
    stop() {
        this.isRunning = false;
        console.log('Game stopped');
    }
    
    /**
     * Main game loop
     * @param {number} timestamp - Current timestamp
     */
    gameLoop(timestamp) {
        // Calculate delta time
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        // Update game state
        this.update(deltaTime);
        
        // Render the game
        this.render();
        
        // Continue the loop if game is running
        if (this.isRunning) {
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }
    
    /**
     * Update game state
     * @param {number} deltaTime - Time since last update in milliseconds
     */
    update(deltaTime) {
        // Update player
        this.player.update(deltaTime, this.platforms);
        
        // Update sprites
        spriteManager.updateAll();
    }
    
    /**
     * Render the game
     */
    render() {
        // Clear the canvas
        this.ctx.fillStyle = '#87CEEB'; // Sky blue background
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Render platforms
        for (const platform of this.platforms) {
            platform.render(this.ctx);
        }
        
        // Render player
        this.player.render(this.ctx);
    }
}