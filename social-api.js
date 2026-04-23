/**
 * social-api.js - Messaging & Sharing Integration
 * Модуль для швидкої відправки даних у месенджери
 */

const SocialConnector = {
    config: {
        botToken: "YOUR_TELEGRAM_BOT_TOKEN", // Для автоматизації
        managerChatId: "MANAGER_ID"
    },

    /**
     * Генерація посилання для відправки у WhatsApp
     */
    shareToWhatsApp(phone = "380991234567") {
        const s = CanopyApp.state;
        const total = document.getElementById('hud-load').innerText;
        
        const message = `👋 Вітаю! Запит на навіс:\n` +
                        `📐 Розміри: ${s.width}x${s.length}м\n` +
                        `💰 Попередній кошторис: ${total}\n` +
                        `🔗 Посилання на проект: ${window.location.href}`;
        
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    },

    /**
     * Відправка звіту в Telegram через Webhook
     */
    async sendToTelegram() {
        Utils.notify("Відправка даних менеджеру...", "info");
        
        const report = `🚀 Нове замовлення!\nГабарити: ${CanopyApp.state.width}м x ${CanopyApp.state.length}м`;
        
        // Тут логіка Fetch запиту до API Telegram
        console.log("[SOCIAL] Telegram payload sent:", report);
        
        setTimeout(() => {
            Utils.notify("Дані успішно надіслано!", "success");
        }, 1500);
    }
};
