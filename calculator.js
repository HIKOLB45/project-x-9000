/**
 * calculator.js - Structural Engineering Engine
 * Модуль математичних розрахунків та аналізу міцності
 */

const PhysicsCalc = {
    /**
     * Головний розрахунок конструкції
     * @param {Object} data - дані зі State (App.state)
     */
    calculateAll(data) {
        const area = data.width * data.length;
        const tiltRad = (data.tilt * Math.PI) / 180;
        
        // 1. Розрахунок площі покрівлі (з урахуванням нахилу)
        const roofArea = area / Math.cos(tiltRad);

        // 2. Розрахунок металу (Кількість заснована на фото 436.png)
        const pillarQty = 6;
        const totalPillarLength = (pillarQty / 2) * (data.height + (data.height - 0.5));
        
        const trussQty = Math.ceil(data.width / 0.8) + 1; // крок 80см
        const totalTrussLength = trussQty * data.length;

        // 3. Вага снігового навантаження (ДБН В.1.2-2:2006)
        const snowLoadPerM2 = this.getSnowLoad(data.region);
        const totalSnowWeight = area * snowLoadPerM2;

        // 4. Фінансовий звіт
        const estimate = {
            metalWeight: (totalPillarLength * 3.62) + (totalTrussLength * 3.03),
            roofArea: roofArea.toFixed(2),
            snowLoad: totalSnowWeight.toFixed(0),
            concreteVolume: pillarQty * 0.08 // 0.08м3 на лунку
        };

        this.updateHUD(estimate);
        return estimate;
    },

    /**
     * Отримання норми снігу за районом України
     */
    getSnowLoad(region) {
        const zones = { 1: 80, 2: 120, 3: 160, 4: 180, 5: 220 };
        return zones[region] || 160;
    },

    /**
     * Оновлення інтерфейсу в реальному часі
     */
    updateHUD(est) {
        const hud = document.getElementById('hud-weight');
        if (hud) {
            // Анімація цифр через GSAP
            gsap.to(hud, {
                innerText: est.snowLoad,
                duration: 1,
                snap: { innerText: 1 },
                onUpdate: () => { hud.innerHTML += " <span class='text-xs font-light'>кг</span>"; }
            });
        }
    }
};
