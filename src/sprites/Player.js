import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'tony', 0);
    this.scene = scene;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.setScale(1.5);
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
    console.log(this.x - this.body.width / 2);
    if (x < 0) {
      if (this.x - this.body.width / 2 > 0) {
        this.setVelocityX(x);
      } else {
        this.x = this.body.width / 2;
        this.setVelocityX(0);
      }
    } else if (x > 0) {
      if (this.x + this.body.width / 2 < 2560) {
        this.setVelocityX(x);
      } else {
        this.x = 2560 - this.body.width / 2;
        this.setVelocityX(0);
      }
    } else if (x === 0) {
      this.setVelocityX(x);
    }
    if (y < 0) {
      if (this.y - this.body.height / 2 > 0) {
        this.setVelocityY(y);
      } else {
        this.y = this.body.height / 2;
        this.setVelocityY(0);
      }
    } else if (y > 0) {
      if (this.y + this.body.height / 2 < 2560) {
        this.setVelocityY(y);
      } else {
        this.y = 2560 - this.body.height / 2;
        this.setVelocityY(0);
      }
    } else if (y === 0) {
      this.setVelocityY(y);
    }
  }
}
