/**
 * lighting.js - Photorealistic Lighting Module
 * Налаштування освітлення та обробка тіней
 */

const LightingSystem = {
    /**
     * Створення освітлення для сцени
     */
    setup(scene) {
        // 1. Навколишнє світло (щоб не було занадто чорних тіней)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        // 2. Головне сонце (Directional Light)
        const sun = new THREE.DirectionalLight(0xffffff, 1.0);
        sun.position.set(10, 20, 10);
        sun.castShadow = true;

        // Налаштування якості тіней
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 50;
        
        // Розмір області тіней
        const d = 15;
        sun.shadow.camera.left = -d;
        sun.shadow.camera.right = d;
        sun.shadow.camera.top = d;
        sun.shadow.camera.bottom = -d;

        scene.add(sun);

        // 3. Акцентне підсвічування (Rim Light)
        const fillLight = new THREE.PointLight(0x3b82f6, 0.6, 30);
        fillLight.position.set(-10, 5, -10);
        scene.add(fillLight);

        console.log("[LIGHTING] Shadows and PBR-lights configured.");
    }
};
