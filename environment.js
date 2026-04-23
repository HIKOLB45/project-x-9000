/**
 * environment.js - World & Scene Atmosphere
 * Створення оточення навколо навісу
 */

const EnvironmentSystem = {
    /**
     * Додавання неба та фонової сітки
     */
    setup(scene) {
        // 1. Створення "Неба" (Skybox спрощено)
        const skyColor = new THREE.Color(0x0a0a0c);
        scene.background = skyColor;

        // 2. Додавання туману для ефекту нескінченності
        scene.fog = new THREE.Fog(0x0a0a0c, 5, 45);

        // 3. Основна інженерна підлога (Ground)
        const gridHelper = new THREE.GridHelper(50, 50, 0x2c3e50, 0x000000);
        gridHelper.position.y = -0.01;
        scene.add(gridHelper);

        // 4. Додавання відбиваючих площин для металу (Reflection Probe спрощено)
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);

        console.log("[ENVIRONMENT] World space configured.");
    },

    /**
     * Ефект "Динамічного сонця" (зміна тіней)
     */
    setSunPosition(scene, angle) {
        const sun = scene.getObjectByProperty('type', 'DirectionalLight');
        if (sun) {
            const x = Math.cos(angle) * 15;
            const z = Math.sin(angle) * 15;
            sun.position.set(x, 20, z);
        }
    }
};
