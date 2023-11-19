import CanvasUtil from '../CanvasUtil.js';
import Drawable from './Drawable.js';
export default class BackgroundPath extends Drawable {
    constructor(posX, posY, backgroundNumber) {
        super();
        this.posX = posX;
        this.posY = posY;
        if (backgroundNumber === 1)
            this.image = CanvasUtil.loadNewImage('./assets/graphics/paths/paths.png');
        else if (backgroundNumber === 2)
            this.image = CanvasUtil.loadNewImage('./assets/graphics/paths/bg_dessert.png');
        else if (backgroundNumber === 3)
            this.image = CanvasUtil.loadNewImage('./assets/graphics/paths/bg_winter.png');
        else if (backgroundNumber === 4)
            this.image = CanvasUtil.loadNewImage('./assets/graphics/paths/bg_poland.png');
        else if (backgroundNumber === 5)
            this.image = CanvasUtil.loadNewImage('./assets/graphics/paths/bg_mexico.png');
    }
    update(elapsed, speed) {
        this.posY += elapsed * speed;
    }
}
//# sourceMappingURL=BackgroundPath.js.map