/**
 * camera-system.js - Advanced Viewport Navigation
 * Інтелектуальне керування камерою та ефекти перегляду
 */

const CameraSystem = {
    controls: null,

    /**
     * Налаштування OrbitControls (з обмеженнями)
     */
    init(camera, renderer) {
        // Ми використовуємо вбудований у Three.js OrbitControls через глобальний скрипт
        this.controls = new THREE.OrbitControls(camera, renderer.domElement);
        
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        
        // Обмеження, щоб не заглядати під землю
        this.controls.minDistance = 3;
        this.controls.maxDistance = 25;
        this.controls.maxPolarAngle = Math.PI / 2; 

        console.log("[CAMERA] Navigation constraints applied.");
    },

    /**
     * Плавне фокусування на об'єкті (Zoom-to-Fit)
     */
    focusOn(target) {
        gsap.to(this.controls.target, {
            x: target.x,
            y: target.y,
            z: target.z,
            duration: 1.5,
            ease: "power3.inOut"
        });
    },

    /**
     * Режим "Презентація" - автоматичне обертання
     */
    toggleAutoRotate(state) {
        this.controls.autoRotate = state;
        this.controls.autoRotateSpeed = 1.0;
        Utils.notify(`Режим презентації: ${state ? 'Увімкнено' : 'Вимкнено'}`);
    },

    update() {
        if (this.controls) this.controls.update();
    }
};
