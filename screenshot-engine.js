/**
 * screenshot-engine.js - High-Resolution Render Export
 * Створення зображень проекту для комерційних пропозицій
 */

const ScreenshotEngine = {
    /**
     * Зробити фото 3D сцени
     */
    capture() {
        const { renderer, scene, camera } = CanopyApp.engine;
        
        // 1. Тимчасово ховаємо хелпери (сітку, осі)
        scene.traverse(obj => {
            if (obj instanceof THREE.GridHelper) obj.visible = false;
        });

        // 2. Рендеримо кадр
        renderer.render(scene, camera);
        
        // 3. Конвертуємо в Image Data
        try {
            const dataURL = renderer.domElement.toDataURL('image/png');
            this.saveToDisk(dataURL, `Canopy_Render_${Date.now()}.png`);
            Utils.notify("Знімок збережено!", "success");
        } catch (e) {
            console.error("Render capture failed:", e);
        }

        // 4. Повертаємо сітку назад
        scene.traverse(obj => {
            if (obj instanceof THREE.GridHelper) obj.visible = true;
        });
    },

    saveToDisk(data, name) {
        const link = document.createElement('a');
        link.download = name;
        link.href = data;
        link.click();
    }
};
