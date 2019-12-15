import 'phaser';
import Character from "./Character";

export default class Player extends Character {
  constructor(scene, x, y, spritesheet) {
    super(scene, x, y, spritesheet, 1);
    this.holdingFrame = 1;
  }

  update(dt, cursors) {
    let speed = 0;
    let angle = 0;
    let vel = 25;
    if (cursors.up.isDown) {
      this.holdingFrame = 5;
      this.anims.play('up', true, this.holdingFrame);
      speed = vel * dt;
      if (cursors.left.isDown) {
        angle = 225
      } else if (!cursors.right.isDown) {
        angle = 270
      } else {
        angle = 315
      }
    } else if (cursors.down.isDown) {
      this.holdingFrame = 1;
      this.anims.play('down', true, this.holdingFrame);
      speed = vel * dt;
      if (cursors.right.isDown) {
        angle = 45;
      } else if (!cursors.left.isDown) {
        angle = 90;
      } else {
        angle = 135;
      }
    } else if (cursors.left.isDown) {
      this.holdingFrame = 13;
      this.anims.play('left', true, this.holdingFrame);
      speed = vel * dt;
      angle = 180;
    } else if (cursors.right.isDown) {
      this.holdingFrame = 9;
      this.anims.play('right', true, this.holdingFrame);
      speed = vel * dt;
      angle = 0;
    } else {
      this.anims.stop();
      this.setTexture('tony', this.holdingFrame);
    }
    const x = speed * Math.cos(angle * Math.PI / 180);
    const y = speed * Math.sin(angle * Math.PI / 180);
    this.setVelocity(x, y);
  }
}
