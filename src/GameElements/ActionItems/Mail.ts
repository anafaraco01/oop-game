import ActionItem from './ActionItem.js';
import CanvasUtil from '../../CanvasUtil.js';

export default class Mail extends ActionItem {
  /**
   * A mail constructor
   *
   * @param startX start position X of a mail
   * @param startY start position Y of a mail
   */
  public constructor(startX: number, startY: number) {
    super(startX, startY);
    this.image = CanvasUtil.loadNewImage('./assets/graphics/actionItems/mail.png');
    const random = Math.random();
    if (random <= 0.33) {
      this.posX = startX / 2 - 48;
    } else if (random <= 0.66) {
      this.posX = (startX / 2) - 400 - 48;
    } else {
      this.posX = (startX / 2) + 400 - 48;
    }
    this.posY = startY - 500;
  }
}
