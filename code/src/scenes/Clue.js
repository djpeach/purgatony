import 'phaser';

export default class ClueScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init() {
    this.gameScene = this.scene.get('Game');
    this.scene.setVisible(false, 'Clue');
    this.scene.pause('Clue');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.setupUiElements();
  }

  setupUiElements() {
    this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, window.innerWidth * 0.8, window.innerHeight * 0.8, 0xff0000);
  }

  update(time, delta) {
  }
};
