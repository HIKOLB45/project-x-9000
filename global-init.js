/**
 * global-init.js - Master Orchestrator
 * Фінальна збірка та запуск усіх підсистем
 */

const AppMaster = {
    modules: [
        'MaterialsDB', 'PhysicsCalc', 'CanopyBuilder', 'UIEvents', 
        'LightingSystem', 'DataExporter', 'TextureModule', 'Utils', 
        'EnvironmentSystem', 'ComponentFactory', 'SpecificationEngine', 
        'CameraSystem', 'PriceEngine', 'StructuralValidator', 'MobileOptimizer'
    ],

    async bootstrap() {
        console.log("%c🚀 STARTING CANOPY ERP ENTERPRISE v3.0", "color: #3b82f6; font-size: 16px; font-weight: bold;");
        
        // 1. Перевірка цілісності модулів
        this.checkIntegrity();

        // 2. Ініціалізація графічного ядра
        CanopyApp.init();

        // 3. Налаштування середовища (Textures + Light + Environment)
        TextureModule.init();
        LightingSystem.setup(CanopyApp.engine.scene);
        EnvironmentSystem.setup(CanopyApp.engine.scene);

        // 4. Запуск систем навігації
        CameraSystem.init(CanopyApp.engine.camera, CanopyApp.engine.renderer);

        // 5. Перша генерація моделі та розрахунків
        UIEvents.refreshSystem();

        // 6. Реєстрація Service Worker для PWA
        this.registerServiceWorker();

        console.log("%c✅ SYSTEM READY", "color: #10b981; font-weight: bold;");
        Utils.notify("Система готова до роботи", "success");
    },

    checkIntegrity() {
        this.modules.forEach(mod => {
            if (window[mod] || typeof window[mod] !== 'undefined') {
                console.log(`[INIT] Module ${mod}: OK`);
            }
        });
    },

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js').catch(err => {
                console.warn("[PWA] ServiceWorker registration failed.");
            });
        }
    }
};

// Запуск при повному завантаженні вікна
window.addEventListener('load', () => AppMaster.bootstrap());
