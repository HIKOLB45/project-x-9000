/**
 * builder.js - Pro-Level Geometry Generator
 * Генерація 3D-мешів на основі інженерних даних
 */

const CanopyBuilder = {
    /**
     * Побудова всієї конструкції
     */
    generate(scene, state) {
        // Очищення попередньої моделі
        if (scene.getObjectByName("canopy_system")) {
            scene.remove(scene.getObjectByName("canopy_system"));
        }

        const system = new THREE.Group();
        system.name = "canopy_system";

        const metalMat = new THREE.MeshStandardMaterial({ 
            color: 0x334155, 
            metalness: 0.8, 
            roughness: 0.2 
        });

        const roofMat = new THREE.MeshStandardMaterial({ 
            color: 0x1e293b, 
            side: THREE.DoubleSide,
            flatShading: true
        });

        // 1. СТОВПИ (Створюємо 6 опор як на фото 437.png)
        this.addPillars(system, state, metalMat);

        // 2. БАЛКИ ТА КРОКВИ (Ферми)
        this.addFramework(system, state, metalMat);

        // 3. ПОКРІВЛЯ (Профнастил)
        this.addRoof(system, state, roofMat);

        scene.add(system);
    },

    addPillars(group, s, mat) {
        const pillarGeo = new THREE.BoxGeometry(0.06, s.height, 0.06);
        const xOffsets = [-s.width/2, 0, s.width/2];
        const zOffsets = [-s.length/2, s.length/2];

        xOffsets.forEach(x => {
            zOffsets.forEach((z, idx) => {
                const pillar = new THREE.Mesh(pillarGeo, mat);
                // Розраховуємо висоту для нахилу (задні стовпи нижчі)
                const hShift = idx === 1 ? -0.5 : 0;
                pillar.scale.y = (s.height + hShift) / s.height;
                pillar.position.set(x, (s.height + hShift) / 2, z);
                pillar.castShadow = true;
                group.add(pillar);
            });
        });
    },

    addFramework(group, s, mat) {
        // Поздовжні балки 80х40
        const beamGeo = new THREE.BoxGeometry(s.width, 0.08, 0.04);
        const b1 = new THREE.Mesh(beamGeo, mat);
        b1.position.set(0, s.height, -s.length/2);
        group.add(b1);

        const b2 = new THREE.Mesh(beamGeo, mat);
        b2.position.set(0, s.height - 0.5, s.length/2);
        group.add(b2);
    },

    addRoof(group, s, mat) {
        const roofGeo = new THREE.PlaneGeometry(s.width + 0.4, s.length + 0.4);
        const roof = new THREE.Mesh(roofGeo, mat);
        
        const tilt = Math.atan2(0.5, s.length);
        roof.rotation.x = -Math.PI / 2 + tilt;
        roof.position.set(0, s.height - 0.25, 0);
        roof.receiveShadow = true;
        group.add(roof);
    }
};
