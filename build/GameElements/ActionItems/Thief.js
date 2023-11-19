import ActionItem from './ActionItem.js';
import CanvasUtil from '../../CanvasUtil.js';
export default class Thief extends ActionItem {
    constructor(startX, startY) {
        super(startX, startY);
        this.image = CanvasUtil.loadNewImage('./assets/graphics/actionItems/thieve.png');
        const random = Math.random();
        if (random <= 0.33) {
            this.posX = startX / 2 - 40;
        }
        else if (random <= 0.66) {
            this.posX = (startX / 2) - 400 - 40;
        }
        else {
            this.posX = (startX / 2) + 400 - 40;
        }
        this.posY = startY - 500;
    }
}
//# sourceMappingURL=Thief.js.map