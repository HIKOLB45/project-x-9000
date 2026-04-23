/**
 * ui-events.js - Interface Interaction Controller
 * Керування подіями користувача та синхронізація модулів
 */

const UIEvents = {
    /**
     * Ініціалізація всіх слухачів подій
     */
    init() {
        this.setupRangeListeners();
        this.setupNavigation();
        this.setupActionButtons();
        console.log("%c[UI] Event Listeners Active", "color: #fbbf24");
    },

    /**
     * Відстеження змін у параметрах конструкції
     */
    setupRangeListeners() {
        const inputs = document.querySelectorAll('.input-field');
        
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                const label = e.target.previousElementSibling.innerText;

                // Оновлення State додатка
                if (label.includes('Ширина')) CanopyApp.state.width = value;
                if (label.includes('Довжина')) CanopyApp.state.length = value;
                if (label.includes('Висота')) CanopyApp.state.height = value;

                // Запуск ланцюгової реакції оновлення
                this.refreshSystem();
            });
        });
    },

    /**
     * Повне оновлення системи при зміні вводу
     */
    refreshSystem() {
        // 1. Перерахунок фізики та кошторису
        const results = PhysicsCalc.calculateAll(CanopyApp.state);
        
        // 2. Перебудова 3D моделі
        CanopyBuilder.generate(CanopyApp.engine.scene, CanopyApp.state);
        
        // 3. Логування для дебагу
        console.log(`[UPDATE] New geometry: ${CanopyApp.state.width}x${CanopyApp.state.length}`);
    },

    /**
     * Керування вкладками навігації
     */
    setupNavigation() {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const page = link.getAttribute('data-page');
                Utils.notify(`Перехід до розділу: ${page.toUpperCase()}`);
            });
        });
    },

    /**
     * Кнопки швидких дій (Експорт, Очищення)
     */
    setupActionButtons() {
        const exportBtn = document.querySelector('button'); // Перша кнопка в хедері
        if (exportBtn) {
            exportBtn.onclick = () => DataExporter.generateTextReport();
        }
    }
};

// Запуск модуля після завантаження основного скрипта
setTimeout(() => UIEvents.init(), 100);
