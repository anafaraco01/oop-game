import ActionItem from "./ActionItem.js";
import CanvasUtil from '../../CanvasUtil.js';
export default class PowerUp extends ActionItem {
    constructor(startX, startY) {
        super(startX, startY);
        this.image = CanvasUtil.loadNewImage('./assets/graphics/actionItems/Powerup.png');
        const random = Math.random();
        if (random <= 0.33) {
            this.posX = startX / 2 - 50;
        }
        else if (random <= 0.66) {
            this.posX = (startX / 2) - 450;
        }
        else {
            this.posX = (startX / 2) + 350;
        }
        this.posY = startY - 500;
    }
}
//# sourceMappingURL=PowerUp.js.map