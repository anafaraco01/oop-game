import ActionItem from "./ActionItem.js";
import CanvasUtil from '../../CanvasUtil.js';

export default class PowerUp extends ActionItem {
    public constructor(startX: number, startY: number) {
        super(startX, startY);
        this.image = CanvasUtil.loadNewImage('./assets/graphics/miscellaneous/heart.png');
        const random = Math.random();
        if (random <= 0.33) {
            this.posX = startX / 2 - 25;
          } else if (random <= 0.66) {
            this.posX = (startX / 2) - 425;
          } else {
            this.posX = (startX / 2) + 375;
          }
        this.posY = startY - 500;
    }
}