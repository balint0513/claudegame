/**
 * Platform class for the platformer game
 */
class Platform {
    /**
     * Create a new platform
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} width - Platform width
     * @param {number} height - Platform height
     */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        // Load platform sprite
        this.sprite = spriteManager.loadSprite('platform', {
            imageSrc: 'assets/platform.svg',
            frameWidth: 200,
            frameHeight: 40,
            framesPerRow: 1,
            totalFrames: 1,
            animationSpeed: 0
        });
    }
    
    /**
     * Render the platform
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    render(ctx) {
        // Draw platform sprite
        this.sprite.draw(ctx, this.x, this.y, this.width, this.height);
    }
}