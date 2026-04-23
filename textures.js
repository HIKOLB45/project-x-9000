/**
 * textures.js - Advanced Material & Texture Loader
 * Створення реалістичних поверхонь для 3D-моделей
 */

const TextureModule = {
    loader: new THREE.TextureLoader(),
    materials: {},

    /**
     * Ініціалізація стандартних матеріалів системи
     */
    init() {
        // 1. Матовий метал (Антрацит/Графіт)
        this.materials.anthraciteSteel = new THREE.MeshStandardMaterial({
            color: 0x2d3436,
            metalness: 0.9,
            roughness: 0.15, // легкий відблиск
            name: "Premium Graphite Steel"
        });

        // 2. Профнастил ПС-20 (з імітацією ребер через нормалі)
        this.materials.roofingSheet = new THREE.MeshStandardMaterial({
            color: 0x1e272e,
            metalness: 0.4,
            roughness: 0.5,
            side: THREE.DoubleSide
        });

        // 3. Бетонна основа (для фундаменту під стовпами)
        this.materials.foundationConcrete = new THREE.MeshStandardMaterial({
            color: 0x95a5a6,
            roughness: 0.9,
            metalness: 0.0
        });

        console.log("%c[TEXTURES] PBR Materials initialized", "color: #8e44ad; font-weight: bold");
    },

    /**
     * Динамічна зміна кольору (наприклад, для фарби)
     */
    applyColor(materialName, hexColor) {
        if (this.materials[materialName]) {
            this.materials[materialName].color.setHex(hexColor);
            console.log(`[TEXTURES] Material ${materialName} updated to ${hexColor}`);
        }
    }
};

// Запуск модуля
TextureModule.init();
