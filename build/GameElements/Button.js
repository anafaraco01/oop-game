import CanvasUtil from '../CanvasUtil.js';
import Drawable from './Drawable.js';
export default class Button extends Drawable {
    buttonDescription;
    constructor(imageUrl, buttonDescription, posX, posY) {
        super();
        this.buttonDescription = buttonDescription;
        this.image = CanvasUtil.loadNewImage(imageUrl);
        this.posX = posX;
        this.posY = posY;
    }
    getButtonDescription() {
        return this.buttonDescription;
    }
    update(elapsed, speed) {
    }
}
//# sourceMappingURL=Button.js.map