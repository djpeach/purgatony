import 'phaser';
import GameScene from './scenes/Game';
import BootScene from './scenes/Boot';
import ClueScene from './scenes/Clue';
import HintsScene from './scenes/Hints';
import ChatScene from './scenes/ClientChat';

const config = {
  type: Phaser.AUTO,
  parent: 'purgatony',
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
};

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Clue', ClueScene);
    this.scene.add('Hints', HintsScene);
    this.scene.add('Chat', ChatScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
window.addEventListener('resize', (event) => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
