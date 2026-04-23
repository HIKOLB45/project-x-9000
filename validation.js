/**
 * validation.js - Structural Integrity & Safety Verifier
 * Перевірка конструкції на відповідність інженерним нормам
 */

const StructuralValidator = {
    limits: {
        maxSpan: 6.0, // Максимальний проліт без додаткових опор
        minPillarThickness: 2.0, // Мінімальна стінка труби для стовпів
        criticalDeflection: 0.02 // 2% від довжини
    },

    /**
     * Комплексна перевірка проекту
     */
    validateProject(state) {
        const issues = [];

        // 1. Перевірка прольоту балки
        if (state.width > this.limits.maxSpan) {
            issues.push({ 
                level: 'error', 
                msg: `Ширина ${state.width}м перевищує ліміт для балки 80х40. Додайте опору!` 
            });
        }

        // 2. Перевірка нахилу (водовідведення)
        const tilt = Math.atan2(0.5, state.length) * (180 / Math.PI);
        if (tilt < 5) {
            issues.push({ 
                level: 'warning', 
                msg: "Занадто малий нахил даху (менше 5°). Можливий застій води." 
            });
        }

        // 3. Візуалізація помилок
        this.displayIssues(issues);
        return issues.length === 0;
    },

    displayIssues(issues) {
        issues.forEach(issue => {
            Utils.notify(issue.msg, issue.level);
            // Підсвічування проблемних вузлів у 3D (червоним)
            if (issue.level === 'error') {
                CanopyApp.engine.scene.background.setHex(0x1a0505);
            }
        });

        if (issues.length === 0) {
            CanopyApp.engine.scene.background.setHex(0x010204);
        }
    }
};
