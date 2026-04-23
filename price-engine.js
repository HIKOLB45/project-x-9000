/**
 * price-engine.js - Commercial & Cost Estimation Module
 * Розрахунок повної вартості проекту з урахуванням робіт та логістики
 */

const PriceEngine = {
    settings: {
        weldingRate: 250, // грн за 1 м.п. зварного шва
        paintingRate: 180, // грн за м2 (робота + матеріал)
        installationMarkup: 0.25, // +25% від вартості металу на монтаж
        profitMargin: 0.30, // 30% чистий прибуток
        deliveryBase: 1200 // Базова доставка
    },

    /**
     * Повний фінансовий розрахунок
     */
    calculateFullEstimate(bom, state) {
        let metalCost = 0;
        let area = state.width * state.length;

        // 1. Розрахунок вартості сировини (на основі BOM з specification.js)
        bom.forEach(item => {
            const material = MaterialsDB.getSpecs('pillars', 'p5050'); // спрощено
            if (material) {
                metalCost += item.len * item.qty * material.price;
            }
        });

        // 2. Вартість покрівельного покриття
        const roofCost = area * 315; // Профнастил ПС-20

        // 3. Вартість робіт
        const workCost = (metalCost * this.settings.installationMarkup) + (area * this.settings.paintingRate);

        // 4. Фінальна сума з маржою
        const subTotal = metalCost + roofCost + workCost + this.settings.deliveryBase;
        const finalTotal = subTotal * (1 + this.settings.profitMargin);

        this.updateFinancialUI(finalTotal, metalCost, roofCost);
        return {
            total: Math.round(finalTotal),
            metal: Math.round(metalCost),
            roof: Math.round(roofCost),
            work: Math.round(workCost)
        };
    },

    /**
     * Оновлення фінансових показників на екрані
     */
    updateFinancialUI(total, metal, roof) {
        console.log(`%c[FINANCE] Total Quote: ${total} UAH`, "color: #2ecc71; font-weight: bold");
        Utils.notify(`Кошторис оновлено: ${Math.round(total)} грн`, 'success');
        
        // Можна вивести в окремий віджет HUD
        const financialWidget = document.getElementById('hud-load'); // Перевикористовуємо контейнер
        if (financialWidget) {
            financialWidget.innerHTML = `${Math.round(total)} <span class="text-xs text-slate-400">UAH</span>`;
        }
    }
};
