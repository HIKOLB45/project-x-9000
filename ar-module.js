/**
 * ar-module.js - Augmented Reality Bridge
 * Підготовка та запуск перегляду в доповненій реальності
 */

const ARSystem = {
    /**
     * Перевірка підтримки AR пристроєм
     */
    checkSupport() {
        const isARSupported = navigator.xr && navigator.xr.isSessionSupported('immersive-ar');
        console.log(`[AR] Support status: ${isARSupported}`);
        return isARSupported;
    },

    /**
     * Експорт поточної моделі для AR-переглядача Google/Apple
     */
    launchARView() {
        Utils.notify("Підготовка AR-моделі...", "info");
        
        // Для GitHub версії ми використовуємо тег <model-viewer>
        // Цей скрипт динамічно оновлює параметри в model-viewer
        const modelViewer = document.querySelector('model-viewer');
        if (modelViewer) {
            modelViewer.activateAR();
        } else {
            // Якщо ми у власному 3D рушії, генеруємо посилання
            const arUrl = `https://view.canopy.app/ar?w=${CanopyApp.state.width}&l=${CanopyApp.state.length}`;
            window.open(arUrl, '_blank');
        }
    },

    /**
     * Додавання кнопки AR в HUD
     */
    injectARButton() {
        const hud = document.querySelector('.hud-card');
        if (hud) {
            const btn = document.createElement('button');
            btn.className = "mt-4 w-full bg-white text-black py-2 rounded font-bold text-[10px] uppercase tracking-tighter";
            btn.innerText = "ПРИМІРЯТИ У ДВОРІ (AR)";
            btn.onclick = () => this.launchARView();
            hud.appendChild(btn);
        }
    }
};

setTimeout(() => ARSystem.injectARButton(), 1000);
