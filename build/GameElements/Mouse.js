import CanvasUtil from '../CanvasUtil.js';
import Drawable from './Drawable.js';
export default class Mouse extends Drawable {
    constructor() {
        super();
        this.image = CanvasUtil.loadNewImage('./assets/graphics/miscellaneous/mouse.png');
    }
    processInput(mouseListener) {
        this.posX = mouseListener.getMousePosition().x + mouseListener.getMousePosition().x * ((window.outerWidth - 10) / window.innerWidth) * 100 / 350;
        this.posY = mouseListener.getMousePosition().y + mouseListener.getMousePosition().y * ((window.outerWidth - 10) / window.innerWidth) * 100 / 250;
    }
    collidesWithButton(button) {
        if (this.posX > button.getPosX() && this.posX < button.getPosX() + button.getWidth()
            && this.posY > button.getPosY() && this.posY < button.getPosY() + button.getHeight())
            return true;
        return false;
    }
    update(elapsed, speed) {
    }
}
//# sourceMappingURL=Mouse.js.map