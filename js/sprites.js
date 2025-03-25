/**
 * Sprite class for handling game sprites
 */
class Sprite {
    /**
     * Create a new sprite
     * @param {Object} options - Sprite options
     * @param {string} options.imageSrc - Path to sprite image
     * @param {number} options.frameWidth - Width of a single frame
     * @param {number} options.frameHeight - Height of a single frame
     * @param {number} options.framesPerRow - Number of frames per row in the sprite sheet
     * @param {number} options.totalFrames - Total number of frames in the animation
     * @param {number} options.animationSpeed - Animation speed in frames per second
     */
    constructor(options) {
        this.image = null;
        this.imageSrc = options.imageSrc;
        this.frameWidth = options.frameWidth || 32;
        this.frameHeight = options.frameHeight || 32;
        this.framesPerRow = options.framesPerRow || 1;
        this.totalFrames = options.totalFrames || 1;
        this.animationSpeed = options.animationSpeed || 10;
        
        this.currentFrame = 0;
        this.frameCounter = 0;
        this.isLoaded = false;
        
        // Load the sprite image
        this.load();
    }
    
    /**
     * Load the sprite image
     */
    load() {
        Utils.loadImage(this.imageSrc)
            .then(image => {
                this.image = image;
                this.isLoaded = true;
            })
            .catch(error => console.error(error));
    }
    
    /**
     * Update the sprite animation
     */
    update() {
        if (!this.isLoaded || this.totalFrames <= 1) return;
        
        this.frameCounter++;
        if (this.frameCounter >= 60 / this.animationSpeed) {
            this.frameCounter = 0;
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }
    }
    
    /**
     * Draw the sprite on the canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} width - Width to draw
     * @param {number} height - Height to draw
     */
    draw(ctx, x, y, width, height) {
        if (!this.isLoaded) return;
        
        const row = Math.floor(this.currentFrame / this.framesPerRow);
        const col = this.currentFrame % this.framesPerRow;
        
        const sourceX = col * this.frameWidth;
        const sourceY = row * this.frameHeight;
        
        ctx.drawImage(
            this.image,
            sourceX, sourceY,
            this.frameWidth, this.frameHeight,
            x, y,
            width || this.frameWidth, height || this.frameHeight
        );
    }
}

/**
 * SpriteManager class for managing game sprites
 */
class SpriteManager {
    constructor() {
        this.sprites = {};
    }
    
    /**
     * Load a sprite
     * @param {string} id - Sprite identifier
     * @param {Object} options - Sprite options
     * @returns {Sprite} - The loaded sprite
     */
    loadSprite(id, options) {
        const sprite = new Sprite(options);
        this.sprites[id] = sprite;
        return sprite;
    }
    
    /**
     * Get a sprite by id
     * @param {string} id - Sprite identifier
     * @returns {Sprite|null} - The sprite or null if not found
     */
    getSprite(id) {
        return this.sprites[id] || null;
    }
    
    /**
     * Update all sprites
     */
    updateAll() {
        for (const id in this.sprites) {
            this.sprites[id].update();
        }
    }
}

// Create a global sprite manager
const spriteManager = new SpriteManager();