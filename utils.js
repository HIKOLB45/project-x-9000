/**
 * utils.js - System Helper Functions
 * Допоміжні інструменти для роботи з DOM та даними
 */

const Utils = {
    /**
     * Створення красивих сповіщень у правому куті
     */
    notify(text, type = 'info') {
        const colors = {
            info: 'bg-blue-600',
            success: 'bg-green-600',
            warning: 'bg-yellow-600',
            error: 'bg-red-600'
        };

        const notification = document.createElement('div');
        notification.className = `${colors[type]} text-white px-6 py-3 rounded-lg shadow-2xl mb-2 
                                 animate-bounce text-[10px] font-black uppercase tracking-widest z-[2000]`;
        notification.innerText = text;

        // Пошук або створення контейнера для сповіщень
        let container = document.getElementById('notification-center');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-center';
            container.className = 'fixed top-20 right-6 flex flex-col items-end z-[2000]';
            document.body.appendChild(container);
        }

        container.appendChild(notification);

        // Видалення через 4 секунди
        setTimeout(() => {
            gsap.to(notification, { opacity: 0, x: 50, duration: 0.5, onComplete: () => notification.remove() });
        }, 4000);
    },

    /**
     * Конвертація метрів у сантиметри з форматуванням
     */
    formatDim(m) {
        return (m * 100).toFixed(0) + " см";
    },

    /**
     * Валідатор вводу (щоб не побудували навіс 100х100 метрів)
     */
    validateInput(val, min, max) {
        if (val < min) {
            this.notify(`Значення замале! Мінімум: ${min}`, 'warning');
            return min;
        }
        if (val > max) {
            this.notify(`Значення критичне! Максимум: ${max}`, 'error');
            return max;
        }
        return val;
    }
};
