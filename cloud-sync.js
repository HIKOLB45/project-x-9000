/**
 * cloud-sync.js - Project Synchronization Module
 * Автоматичне збереження та відновлення проектів з хмари
 */

const CloudSync = {
    /**
     * Автозбереження кожні 30 секунд
     */
    startAutosave() {
        setInterval(() => {
            this.saveToCloud();
        }, 30000);
    },

    /**
     * Збереження поточного стану проекту
     */
    saveToCloud() {
        const projectData = {
            state: CanopyApp.state,
            timestamp: Date.now(),
            version: "3.0"
        };

        // Запис у LocalStorage (як прототип хмари)
        localStorage.setItem('current_project', JSON.stringify(projectData));
        
        // Візуальний індикатор у статус-барі
        const statusEl = document.getElementById('stats-render');
        if (statusEl) {
            const originalText = statusEl.innerText;
            statusEl.innerText = "☁️ СИНХРОНІЗАЦІЯ...";
            setTimeout(() => statusEl.innerText = originalText, 2000);
        }
    },

    /**
     * Відновлення останньої роботи
     */
    restoreLastProject() {
        const data = localStorage.getItem('current_project');
        if (data) {
            const parsed = JSON.parse(data);
            Object.assign(CanopyApp.state, parsed.state);
            UIEvents.refreshSystem();
            Utils.notify("Останній проект відновлено", "info");
        }
    }
};

CloudSync.startAutosave();
