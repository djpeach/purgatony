import 'phaser';

export default class Clue extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, frame, rotation) {
    super(scene, x * 4, (y - 14) * 4, 'mainTileSheet', frame);
    this.scene = scene;
    this.setOrigin(0, 1/8);
    this.setScale(4);
    scene.physics.world.enableBody(this, 1);
    scene.physics.world.enable(this);
    this.body.setSize(this.width*2, this.height*2);
    this.setRotation(rotation);
    this.scene.add.existing(this);
  }
}