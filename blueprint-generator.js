/**
 * blueprint-generator.js - 2D Technical Drawing Engine
 * Генерація технічних планів та фасадів з розмірами
 */

const BlueprintEngine = {
    /**
     * Генерація схематичного виду зверху
     */
    generateTopView(state) {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 800;
        const ctx = canvas.getContext('2d');

        // Налаштування стилю (як на кресленнях)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        const scale = 100; // 1 метр = 100 пікселів
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const w = state.width * scale;
        const l = state.length * scale;

        // Малюємо основний контур
        ctx.strokeRect(centerX - w/2, centerY - l/2, w, l);

        // Малюємо розмірні лінії
        this.drawDimension(ctx, centerX - w/2, centerY + l/2 + 40, centerX + w/2, centerY + l/2 + 40, `${state.width}m`);
        this.drawDimension(ctx, centerX - w/2 - 40, centerY - l/2, centerX - w/2 - 40, centerY + l/2, `${state.length}m`);

        // Додаємо штамп креслення
        ctx.font = 'bold 16px Arial';
        ctx.fillText('ПЛАН ПОКРІВЛІ (ВИД ЗВЕРХУ)', 50, 50);
        ctx.font = '12px Arial';
        ctx.fillText(`Проект: Canopy ERP v3 | Масштаб 1:100`, 50, 75);

        return canvas.toDataURL();
    },

    drawDimension(ctx, x1, y1, x2, y2, text) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Засічки
        ctx.moveTo(x1, y1-5); ctx.lineTo(x1, y1+5);
        ctx.moveTo(x2, y2-5); ctx.lineTo(x2, y2+5);
        ctx.stroke();

        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(text, (x1 + x2) / 2, (y1 + y2) / 2 - 10);
    }
};
