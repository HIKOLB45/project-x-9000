/**
 * script.js - Enterprise System Controller
 * Ініціалізація та керування SPA
 */

const CanopyApp = {
    // Центральне сховище даних (State)
    state: {
        width: 5.0,
        length: 5.0,
        height: 2.5,
        region: 3, // Сніговий район
        materials: []
    },

    // 3D Модулі
    engine: {
        scene: null,
        camera: null,
        renderer: null,
        canopyGroup: null
    },

    /**
     * Початкове завантаження
     */
    async init() {
        console.log("%c[SYSTEM] Starting Enterprise Engine...", "color: #3b82f6; font-weight: bold");
        
        try {
            this.setup3D();
            this.buildUI();
            
            // Симулюємо важке завантаження для солідності
            setTimeout(() => {
                this.removePreloader();
            }, 2000);

        } catch (e) {
            console.error("Critical boot failure:", e);
        }
    },

    setup3D() {
        const container = document.getElementById('viewport');
        this.engine.scene = new THREE.Scene();
        this.engine.scene.background = new THREE.Color(0x010204);

        this.engine.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.engine.camera.position.set(8, 6, 10);

        this.engine.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.engine.renderer.setSize(container.clientWidth, container.clientHeight);
        this.engine.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.engine.renderer.domElement);

        // Базове світло
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.engine.scene.add(ambient);

        const point = new THREE.PointLight(0x3b82f6, 1);
        point.position.set(10, 10, 10);
        this.engine.scene.add(point);

        this.animate();
    },

    buildUI() {
        const inputContainer = document.getElementById('dynamic-inputs');
        const fields = [
            { label: 'Ширина (м)', val: 5.0 },
            { label: 'Довжина (м)', val: 5.0 },
            { label: 'Висота (м)', val: 2.5 }
        ];

        inputContainer.innerHTML = fields.map(f => `
            <div class="control-item">
                <label class="text-[9px] font-bold text-slate-500 uppercase block mb-2">${f.label}</label>
                <input type="number" class="input-field" value="${f.val}" step="0.1">
            </div>
        `).join('');
    },

    removePreloader() {
        const loader = document.getElementById('preloader');
        const app = document.getElementById('app');
        
        gsap.to(loader, { opacity: 0, duration: 0.8, onComplete: () => {
            loader.style.display = 'none';
            app.style.opacity = '1';
        }});
    },

    animate() {
        requestAnimationFrame(() => this.animate());
        this.engine.renderer.render(this.engine.scene, this.engine.camera);
    }
};

window.onload = () => CanopyApp.init();
