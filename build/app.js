import ProtectYourIdentity from './ProtectYourIdentity.js';
import { GameLoop } from './GameLoop.js';
const game = new ProtectYourIdentity(document.getElementById('game'));
const gameLoop = new GameLoop(game);
window.addEventListener('load', () => {
    gameLoop.start();
});
//# sourceMappingURL=app.js.map