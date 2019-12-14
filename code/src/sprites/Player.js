import 'phaser';
import Character from "./Character";

export default class Player extends Character {
  constructor(scene, x, y, spritesheet) {
    super(scene, x, y, spritesheet, 0);
  }

  update(dt, cursors) {
    let speed = 0;
    let angle = 0;
    let vel = 25;
    if (cursors.up.isDown) {
      speed = vel * dt;
      if (cursors.left.isDown) {
        angle = 225
      } else if (!cursors.right.isDown) {
        angle = 270
      } else {
        angle = 315
      }
    } else if (cursors.down.isDown) {
      speed = vel * dt;
      if (cursors.right.isDown) {
        angle = 45;
      } else if (!cursors.left.isDown) {
        angle = 90;
      } else {
        angle = 135;
      }
    } else if (cursors.left.isDown) {
      speed = vel * dt;
      angle = 180;
    } else if (cursors.right.isDown) {
      speed = vel * dt;
      angle = 0;
    }
    const x = speed * Math.cos(angle * Math.PI / 180);
    const y = speed * Math.sin(angle * Math.PI / 180);
    this.setVelocity(x, y);
  }
}
