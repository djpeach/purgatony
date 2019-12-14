import 'phaser';

export default class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritesheet, frame) {
    super(scene, x, y, spritesheet, frame);
    this.scene = scene;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.setScale(1.5);
    this.setCollideWorldBounds(true);
  }

  update(dt, cursors) {
  }
}
