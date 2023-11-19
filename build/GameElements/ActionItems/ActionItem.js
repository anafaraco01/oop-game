import Drawable from '../Drawable.js';
export default class ActionItem extends Drawable {
    constructor(startX, startY) {
        super();
    }
    update(elapsed, speed) {
        this.posY += elapsed * speed;
    }
}
//# sourceMappingURL=ActionItem.js.map