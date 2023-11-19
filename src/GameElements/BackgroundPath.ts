import CanvasUtil from '../CanvasUtil.js';
import Drawable from './Drawable.js';

export default class BackgroundPath extends Drawable {
  /**
   * Constructor for BackgroundPath
   *
   * @param posX initital position X of BackgroundPath
   * @param posY initital position X of BackgroundPath
   * @param backgroundNumber background number which accesses different background
   */
  public constructor(posX: number, posY: number, backgroundNumber: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    if (backgroundNumber === 1) this.image = CanvasUtil.loadNewImage('./assets/graphics/paths/paths.png');
    else if (backgroundNumber === 2) this.image = CanvasUtil.loadNewImage('./assets/graphics/paths/bg_dessert.png');
    else if (backgroundNumber === 3) this.image = CanvasUtil.loadNewImage('./assets/graphics/paths/bg_winter.png');
    else if (backgroundNumber === 4) this.image = CanvasUtil.loadNewImage('./assets/graphics/paths/bg_poland.png');
    else if (backgroundNumber === 5) this.image = CanvasUtil.loadNewImage('./assets/graphics/paths/bg_mexico.png');
  }

  /**
   * Updates BackgroundPath
   *
   * @param elapsed elapsed number
   * @param speed speed of BackgroundPath
   */
  public update(elapsed: number, speed: number): void {
    this.posY += elapsed * speed;
  }
}
