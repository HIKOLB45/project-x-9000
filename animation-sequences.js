/**
 * animation-sequences.js - Motion Graphics & Explode View
 * Складні анімаційні послідовності для демонстрації
 */

const AnimationCore = {
    /**
     * Ефект "Вибух-схема" (розкидання деталей у просторі)
     */
    explodeView() {
        const scene = CanopyApp.engine.scene;
        Utils.notify("Режим детального перегляду", "info");

        scene.traverse(obj => {
            if (obj.isMesh && obj.userData.layer) {
                const targetY = obj.userData.layer === 'roof' ? 5 : 2;
                const targetZ = obj.userData.layer === 'pillars' ? 2 : 0;

                gsap.to(obj.position, {
                    y: `+=${targetY}`,
                    z: `+=${targetZ}`,
                    duration: 1.2,
                    ease: "expo.out"
                });
            }
        });
    },

    /**
     * Анімація "Будівництво" (Build-up animation)
     */
    playBuildSequence() {
        const scene = CanopyApp.engine.scene;
        // 1. Всі об'єкти в scale 0
        scene.traverse(obj => { if(obj.isMesh) obj.scale.set(0,0,0); });

        // 2. Послідовна поява
        const tl = gsap.timeline();
        
        tl.to("[LAYER=pillars]", { scale: 1, stagger: 0.2, duration: 0.5 })
          .to("[LAYER=framework]", { scale: 1, stagger: 0.1, duration: 0.5 })
          .to("[LAYER=roof]", { scale: 1, duration: 0.8, ease: "bounce.out" });
          
        console.log("[ANIM] Build sequence started");
    }
};
