/**
 * components.js - Micro-Detailing Module
 * Створення дрібних елементів: кріплення, заглушки, зварні вузли
 */

const ComponentFactory = {
    /**
     * Створення покрівельного саморіза (Hex Head Screw)
     */
    createScrew(mat) {
        const screw = new THREE.Group();
        
        // Головка саморіза (шестигранник)
        const headGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.005, 6);
        const head = new THREE.Mesh(headGeo, mat);
        
        // Шайба з EPDM-резиною
        const washerGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.002, 16);
        const washerMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
        const washer = new THREE.Mesh(washerGeo, washerMat);
        washer.position.y = -0.003;

        screw.add(head, washer);
        return screw;
    },

    /**
     * Пластикова заглушка для профільної труби (Internal Plug)
     */
    createPlug(sizeW, sizeH) {
        const plugGeo = new THREE.BoxGeometry(sizeW, 0.01, sizeH);
        const plugMat = new THREE.MeshStandardMaterial({ 
            color: 0x050505, 
            roughness: 1, 
            metalness: 0 
        });
        return new THREE.Mesh(plugGeo, plugMat);
    },

    /**
     * Автоматичне розміщення саморізів по площі даху
     */
    distributeScrews(group, width, length, startY) {
        const screwMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, metalness: 1 });
        const stepX = 0.5; // крок 50см
        const stepZ = 0.6;

        for (let x = -width/2; x <= width/2; x += stepX) {
            for (let z = -length/2; z <= length/2; z += stepZ) {
                const s = this.createScrew(screwMat);
                s.position.set(x, startY + 0.02, z);
                // Нахил саморіза разом з дахом
                s.rotation.x = 0.08; 
                group.add(s);
            }
        }
        console.log(`[COMPONENTS] Generated screws for ${width}x${length} surface`);
    }
};
