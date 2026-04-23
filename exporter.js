/**
 * exporter.js - Data Extraction Module
 * Генерація звітів та експорт специфікацій
 */

const DataExporter = {
    /**
     * Створення текстового звіту-кошторису
     */
    generateTextReport() {
        const s = CanopyApp.state;
        const res = PhysicsCalc.calculateAll(s);
        
        const timestamp = new Date().toLocaleString('uk-UA');
        
        const report = `
========================================
    CANOPY ERP - ТЕХНІЧНИЙ ЗВІТ
========================================
Дата створення: ${timestamp}
Об'єкт: Навіс автомобільний 5х5

1. ГЕОМЕТРІЯ:
   - Ширина: ${s.width} м
   - Довжина: ${s.length} м
   - Висота: ${s.height} м
   - Нахил: ${s.tilt}°

2. РОЗРАХУНКОВІ ПОКАЗНИКИ:
   - Площа покрівлі: ${res.roofArea} м²
   - Вага металоконструкції: ~${res.metalWeight.toFixed(1)} кг
   - Снігове навантаження: ${res.snowLoad} кг

3. НЕОБХІДНІ МАТЕРІАЛИ:
   - Стовпи (50х50х2.5): 6 шт
   - Профнастил ПС-20: ${Math.ceil(res.roofArea * 1.1)} м²
   - Бетон для фундаменту: ${res.concreteVolume} м³

----------------------------------------
Melnichenko Engineering Solutions 2026
========================================
        `;

        this.downloadFile(report, `Estimate_${Date.now()}.txt`);
    },

    /**
     * Функція завантаження файлу в браузері
     */
    downloadFile(content, fileName) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = fileName;
        a.click();
        
        window.URL.revokeObjectURL(url);
        console.log(`[EXPORT] File ${fileName} saved successfully.`);
    }
};
