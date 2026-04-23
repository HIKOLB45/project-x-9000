/**
 * specification.js - Cutting List & Bill of Materials (BOM)
 * Генерація точних таблиць розкрою металу
 */

const SpecificationEngine = {
    /**
     * Розрахунок таблиці розрізки
     */
    generateCuttingList(state) {
        const kerf = 0.003; // 3мм товщина круга болгарки
        const list = [];

        // 1. Стовпи (передні та задні)
        list.push({ label: "Стовп передній (50х50)", len: state.height, qty: 3 });
        list.push({ label: "Стовп задній (50х50)", len: state.height - 0.5, qty: 3 });

        // 2. Ферми (горизонтальні частини)
        const trussLength = Math.sqrt(Math.pow(state.length, 2) + Math.pow(0.5, 2));
        const trussCount = Math.ceil(state.width / 0.8) + 1;
        list.push({ label: "Пояс ферми верхній (60x40)", len: trussLength.toFixed(3), qty: trussCount });

        // 3. З'єднувальні прогони
        list.push({ label: "Прогон поздовжній (40x20)", len: state.width, qty: 5 });

        this.renderTable(list);
        return list;
    },

    /**
     * Візуалізація таблиці в інтерфейсі (Сайдбар або Модалка)
     */
    renderTable(items) {
        let html = `
            <div class="mt-6 p-4 bg-black/40 rounded-lg border border-white/5 font-mono text-[10px]">
                <div class="grid grid-cols-3 border-b border-white/10 pb-2 mb-2 text-blue-500 font-black">
                    <span>ДЕТАЛЬ</span>
                    <span>ДОВЖИНА</span>
                    <span>К-СТЬ</span>
                </div>
        `;

        items.forEach(i => {
            html += `
                <div class="grid grid-cols-3 py-1 border-b border-white/5 text-slate-400">
                    <span>${i.label}</span>
                    <span class="text-white font-bold">${i.len}м</span>
                    <span>${i.qty} шт</span>
                </div>
            `;
        });

        html += `</div>`;
        
        // Додаємо таблицю в кінець сайдбару
        const container = document.getElementById('sidebar');
        const oldTable = document.getElementById('spec-table');
        if (oldTable) oldTable.remove();
        
        const div = document.createElement('div');
        div.id = 'spec-table';
        div.innerHTML = html;
        container.appendChild(div);
    }
};
