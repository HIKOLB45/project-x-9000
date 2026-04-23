/**
 * history.js - State History & Undo/Redo Engine
 * Система керування станами додатка
 */

const HistoryManager = {
    undoStack: [],
    redoStack: [],
    limit: 50, // Пам'ятати останні 50 кроків

    /**
     * Збереження поточного стану перед зміною
     */
    saveState(state) {
        // Клонуємо стан, щоб уникнути посилань
        const stateCopy = JSON.parse(JSON.stringify(state));
        this.undoStack.push(stateCopy);
        
        if (this.undoStack.length > this.limit) {
            this.undoStack.shift();
        }
        
        // Очищаємо Redo при новій дії
        this.redoStack = [];
        console.log(`[HISTORY] State saved. Stack size: ${this.undoStack.length}`);
    },

    /**
     * Скасування останньої дії (Ctrl+Z)
     */
    undo() {
        if (this.undoStack.length <= 1) {
            Utils.notify("Далі скасовувати нікуди", "warning");
            return null;
        }

        const currentState = JSON.parse(JSON.stringify(CanopyApp.state));
        this.redoStack.push(currentState);
        
        const previousState = this.undoStack.pop();
        this.applyState(previousState);
        return previousState;
    },

    /**
     * Застосування стану до додатка
     */
    applyState(state) {
        Object.assign(CanopyApp.state, state);
        // Синхронізація UI та 3D
        UIEvents.refreshSystem();
        Utils.notify("Дію скасовано", "info");
    }
};

// Слухач гарячих клавіш
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.code === 'KeyZ') HistoryManager.undo();
});
