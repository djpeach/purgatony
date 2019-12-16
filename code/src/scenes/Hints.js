import 'phaser';

export default class HintsScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init(data) {
  }

  preload() {
  }

  create() {
    this.hintText = this.add.text(16, 16, 'WASD to move around', { fontSize: '24px', color: '#fff' });
    this.scene.get('Game').events.on('updateText', (text) => {
      this.hintText.setText(text);
    })
  }
};
