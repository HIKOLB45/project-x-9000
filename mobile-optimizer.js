/**
 * mobile-optimizer.js - Performance & Mobile Adaptation
 * Оптимізація рендерингу під смартфони та слабкі ПК
 */

const MobileOptimizer = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

    /**
     * Налаштування графіки залежно від пристрою
     */
    applySettings(renderer, scene) {
        if (this.isMobile) {
            console.log("[OPTIMIZER] Mobile device detected. Lowering GPU load...");
            
            // 1. Зменшення роздільної здатності тіней
            renderer.shadowMap.enabled = false; // Вимикаємо тіні на мобільних для швидкості
            renderer.setPixelRatio(1); // Фіксований піксель
            
            // 2. Спрощення матеріалів
            scene.traverse(obj => {
                if (obj.isMesh) {
                    obj.material.metalness = 0.5; // Спрощений метал
                    obj.material.roughness = 0.5;
                }
            });

            // 3. Адаптація інтерфейсу
            document.getElementById('sidebar').style.width = "100%";
        } else {
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
        }
    },

    /**
     * Енергозбереження (зупинка рендеру, коли користувач не крутить модель)
     */
    autoSleep(controls, animateFunc) {
        let isMoving = false;
        controls.addEventListener('change', () => { isMoving = true; });
        
        // Логіка для зменшення FPS при простої...
    }
};

// Запуск при ініціалізації 3D
setTimeout(() => {
    if (CanopyApp.engine.renderer) {
        MobileOptimizer.applySettings(CanopyApp.engine.renderer, CanopyApp.engine.scene);
    }
}, 500);
