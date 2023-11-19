import Drawable from './Drawable.js';
import CanvasUtil from '../CanvasUtil.js';
export default class Player extends Drawable {
    images = [];
    posXinitial;
    posYinitial;
    acceleration;
    timeToGoBackToTheGround;
    constructor(maxX, maxY) {
        super();
        this.images.push(CanvasUtil.loadNewImage('./assets/graphics/ball/player.png'));
        this.images.push(CanvasUtil.loadNewImage('./assets/graphics/ball/playerSlide.png'));
        this.images.push(CanvasUtil.loadNewImage('./assets/graphics/ball/playerJump.png'));
        this.image = this.images[0];
        this.acceleration = 2;
        this.timeToGoBackToTheGround = 2300;
        this.posXinitial = maxX / 2 - 60;
        this.posX = maxX / 2 - 60;
        this.posYinitial = maxY - 150;
        this.posY = maxY - 150;
    }
    getPosXinitial() {
        return this.posXinitial;
    }
    getPosYinitial() {
        return this.posYinitial;
    }
    move(elapsed, code, moveTo) {
        if (code === 1) {
            if (this.getPosX() >= moveTo) {
                this.posX -= elapsed * this.acceleration;
                return true;
            }
            this.posX = moveTo;
            return false;
        }
        if (code === 2) {
            if (this.getPosX() <= moveTo) {
                this.posX += elapsed * this.acceleration;
                return true;
            }
            this.posX = moveTo;
            return false;
        }
        return false;
    }
    jump() {
        this.image = this.images[2];
        this.timeToGoBackToTheGround = 2300;
    }
    slide() {
        if (this.posY !== this.posYinitial) {
            this.posY = this.posYinitial;
        }
        this.image = this.images[1];
        this.timeToGoBackToTheGround = 2300;
    }
    collideWithActionItem(actionItem) {
        if (actionItem.getPosX() + actionItem.getWidth() > this.posX
            && actionItem.getPosX() < this.posX + this.image.width
            && actionItem.getPosY() + actionItem.getHeight() > this.posY
            && actionItem.getPosY() < this.posY + this.image.height)
            return true;
        return false;
    }
    update(elapsed) {
        if (this.image === this.images[2] || this.image === this.images[1]) {
            this.timeToGoBackToTheGround -= Number(elapsed);
            this.posY = this.posYinitial - 20;
            if (this.timeToGoBackToTheGround <= 0) {
                this.image = this.images[0];
                this.timeToGoBackToTheGround = 2300;
                this.posY = this.posYinitial;
            }
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=Player.js.map