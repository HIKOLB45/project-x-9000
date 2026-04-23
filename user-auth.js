/**
 * user-auth.js - Security & User Session Manager
 * Керування профілями користувачів та правами доступу
 */

const AuthSystem = {
    currentUser: null,
    
    /**
     * Ініціалізація сесії (перевірка LocalStorage або Cookies)
     */
    async initSession() {
        const savedUser = localStorage.getItem('canopy_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIAfterLogin();
        }
        console.log("[AUTH] Session check complete.");
    },

    /**
     * Симуляція входу в систему
     */
    login(email, password) {
        // У версії Enterprise тут буде запит до Firebase або іншого Backend
        this.currentUser = {
            name: "Mykyta Melnichenko",
            role: "ADMIN",
            lastProject: "Canopy_5x5_Metal"
        };
        
        localStorage.setItem('canopy_user', JSON.stringify(this.currentUser));
        this.updateUIAfterLogin();
        Utils.notify(`Вітаємо, ${this.currentUser.name}!`, "success");
    },

    updateUIAfterLogin() {
        const loginBtn = document.querySelector('.btn-order'); // Тимчасово
        if (loginBtn) loginBtn.innerText = "ОБЛІКОВИЙ ЗАПИС";
        console.log(`[AUTH] User role: ${this.currentUser.role}`);
    },

    logout() {
        localStorage.removeItem('canopy_user');
        window.location.reload();
    }
};

AuthSystem.initSession();
