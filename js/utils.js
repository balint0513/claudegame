/**
 * Utility functions for the platformer game
 */

const Utils = {
    /**
     * Check collision between two rectangles
     * @param {Object} rect1 - First rectangle {x, y, width, height}
     * @param {Object} rect2 - Second rectangle {x, y, width, height}
     * @returns {boolean} - True if collision detected
     */
    checkCollision: function(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    },
    
    /**
     * Load an image from a URL
     * @param {string} src - Image source URL
     * @returns {Promise} - Promise that resolves with the loaded image
     */
    loadImage: function(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    },
    
    /**
     * Generate a random number between min and max (inclusive)
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} - Random number
     */
    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};