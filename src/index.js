import 'phaser';
import GameScene from './scenes/Game';
import BootScene from './scenes/Boot';

const config = {
  type: Phaser.AUTO,
  parent: 'purgatony',
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },
};

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
window.addEventListener('resize', (event) => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
