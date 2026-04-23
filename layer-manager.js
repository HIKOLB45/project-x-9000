/**
 * layer-manager.js - Scene Layer & Visibility Control
 * Керування видимістю окремих груп об'єктів
 */

const LayerManager = {
    layers: {
        roof: true,
        framework: true,
        pillars: true,
        helpers: true
    },

    /**
     * Перемикач видимості шару
     */
    toggleLayer(layerName) {
        if (this.layers[layerName] === undefined) return;

        this.layers[layerName] = !this.layers[layerName];
        const scene = CanopyApp.engine.scene;

        scene.traverse(obj => {
            // Шукаємо об'єкти за метаданими, які ми додали в builder.js
            if (obj.userData.layer === layerName) {
                obj.visible = this.layers[layerName];
            }
        });

        Utils.notify(`Шар ${layerName}: ${this.layers[layerName] ? 'ВИДИМИЙ' : 'ПРИХОВАНИЙ'}`);
        
        // Додаємо прозорість для ефекту рентгену
        if (!this.layers[layerName]) {
            this.applyXRayEffect(layerName);
        }
    },

    applyXRayEffect(layerName) {
        console.log(`[LAYERS] X-Ray mode for ${layerName} activated`);
        // Логіка зміни opacity матеріалів...
    }
};
