import 'phaser';

export default class ClueScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init() {
    this.gameScene = this.scene.get('Game');
  }

  preload() {
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    })
  }

  create() {
    this.setupUiElements();
  }

  setupUiElements() {
    this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, window.innerWidth * 0.8, window.innerHeight * 0.8, 0xff0000);
  }

  update(time, delta) {
    if (this.cursors.down.isDown) {
      this.scene.resume('Game');
      this.scene.stop('Clue');
    }
  }
};
