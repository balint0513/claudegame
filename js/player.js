/**
 * Player class for the platformer game
 */
class Player {
    /**
     * Create a new player
     * @param {number} x - Initial x position
     * @param {number} y - Initial y position
     */
    constructor(x, y) {
        // Position and dimensions
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        
        // Physics properties
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpForce = 12;
        this.gravity = 0.3;
        this.isJumping = false;
        this.isGrounded = false;
        
        // Input state
        this.keys = {
            left: false,
            right: false,
            up: false
        };
        
        // Sprite
        this.sprite = spriteManager.loadSprite('player', {
            imageSrc: 'assets/player.svg',
            frameWidth: 32,
            frameHeight: 32,
            framesPerRow: 1,
            totalFrames: 1,
            animationSpeed: 10
        });
        
        // Set up input handlers
        this.setupInput();
    }
    
    /**
     * Set up keyboard input handlers
     */
    setupInput() {
        // Keydown event
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowLeft':
                case 'a':
                    this.keys.left = true;
                    break;
                case 'ArrowRight':
                case 'd':
                    this.keys.right = true;
                    break;
                case 'ArrowUp':
                case 'w':
                case ' ':
                    this.keys.up = true;
                    break;
            }
        });
        
        // Keyup event
        document.addEventListener('keyup', (event) => {
            switch(event.key) {
                case 'ArrowLeft':
                case 'a':
                    this.keys.left = false;
                    break;
                case 'ArrowRight':
                case 'd':
                    this.keys.right = false;
                    break;
                case 'ArrowUp':
                case 'w':
                case ' ':
                    this.keys.up = false;
                    break;
            }
        });
    }
    
    /**
     * Update player state
     * @param {number} deltaTime - Time since last update in milliseconds
     * @param {Array} platforms - Array of platforms to check for collisions
     */
    update(deltaTime, platforms) {
        // Handle horizontal movement
        if (this.keys.left) {
            this.velocityX = -this.speed;
        } else if (this.keys.right) {
            this.velocityX = this.speed;
        } else {
            this.velocityX = 0;
        }
        
        // Apply gravity
        this.velocityY += this.gravity;
        
        // Handle jumping
        if (this.keys.up && this.isGrounded) {
            this.velocityY = -this.jumpForce;
            this.isGrounded = false;
            this.isJumping = true;
        }
        
        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Check for platform collisions
        this.checkPlatformCollisions(platforms);
        
        // Update sprite
        this.sprite.update();
    }
    
    /**
     * Check for collisions with platforms
     * @param {Array} platforms - Array of platforms to check for collisions
     */
    checkPlatformCollisions(platforms) {
        // Reset grounded state
        this.isGrounded = false;
        
        for (const platform of platforms) {
            // Create player hitbox
            const playerHitbox = {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            };
            
            // Create platform hitbox
            const platformHitbox = {
                x: platform.x,
                y: platform.y,
                width: platform.width,
                height: platform.height
            };
            
            // Check for collision
            if (Utils.checkCollision(playerHitbox, platformHitbox)) {
                // Calculate collision sides
                const bottomCollision = this.y + this.height - platform.y;
                const topCollision = platform.y + platform.height - this.y;
                const leftCollision = this.x + this.width - platform.x;
                const rightCollision = platform.x + platform.width - this.x;
                
                // Find the smallest collision
                const minCollision = Math.min(bottomCollision, topCollision, leftCollision, rightCollision);
                
                // Resolve collision based on the smallest overlap
                if (minCollision === bottomCollision && this.velocityY >= 0) {
                    // Bottom collision (player landing on platform)
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.isGrounded = true;
                    this.isJumping = false;
                } else if (minCollision === topCollision && this.velocityY <= 0) {
                    // Top collision (player hitting platform from below)
                    this.y = platform.y + platform.height;
                    this.velocityY = 0;
                } else if (minCollision === leftCollision && this.velocityX > 0) {
                    // Left collision (player hitting platform from left)
                    this.x = platform.x - this.width;
                    this.velocityX = 0;
                } else if (minCollision === rightCollision && this.velocityX < 0) {
                    // Right collision (player hitting platform from right)
                    this.x = platform.x + platform.width;
                    this.velocityX = 0;
                }
            }
        }
    }
    
    /**
     * Render the player
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    render(ctx) {
        // Draw player sprite
        this.sprite.draw(ctx, this.x, this.y, this.width, this.height);
    }
}