/**
 * materials.js - Enterprise Resource Planning Database
 * База даних металопрокату та комплектуючих
 */

const MaterialsDB = {
    // Профільні труби (ГОСТ/ДСТУ)
    // weight: кг/м.п., price: грн/м.п.
    profiles: {
        pillars: [
            { id: 'p5050', name: '50х50х2.5', weight: 3.62, price: 158.0 },
            { id: 'p6060', name: '60х60х3.0', weight: 5.12, price: 224.0 },
            { id: 'p8080', name: '80х80х3.0', weight: 7.07, price: 310.0 }
        ],
        trusses: [
            { id: 't6040', name: '60х40х2.0', weight: 3.03, price: 135.0 },
            { id: 't4020', name: '40х20х2.0', weight: 1.80, price: 82.0 },
            { id: 't8040', name: '80х40х3.0', weight: 5.25, price: 232.0 }
        ]
    },

    // Покрівельні матеріали (грн/м2)
    roofing: [
        { id: 'ps20_g', name: 'Профнастил ПС-20 Graphite (0.5mm)', price: 315.0, weight: 4.5 },
        { id: 'ps20_z', name: 'Профнастил ПС-20 Zinc (0.45mm)', price: 260.0, weight: 3.9 },
        { id: 'poly_10', name: 'Полікарбонат 10мм (Bronze)', price: 480.0, weight: 1.7 }
    ],

    // Витратні матеріали (фіксована ціна або за одиницю)
    accessories: {
        paint: { name: 'Емаль-ґрунт Hammerite', price: 540, unit: 'л' },
        electrodes: { name: 'Моноліт РЦ 3мм', price: 280, unit: 'уп' },
        screws: { name: 'Саморіз покрівельний', price: 3.5, unit: 'шт' },
        concrete: { name: 'Бетон М250 (мішок)', price: 165, unit: 'шт' }
    },

    /**
     * Отримати повну специфікацію за ID
     */
    getSpecs(category, id) {
        if (this.profiles[category]) {
            return this.profiles[category].find(i => i.id === id);
        }
        return this.roofing.find(i => i.id === id);
    },

    /**
     * Системний лог бази даних
     */
    logStatus() {
        console.log(`%c[DB] Materials Database v3.2: Loaded ${Object.keys(this.profiles).length} profile categories`, "color: #10b981");
    }
};

MaterialsDB.logStatus();
