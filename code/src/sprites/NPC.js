import 'phaser';
import Character from "./Character";

export default class NPC extends Character {
  constructor(scene, x, y, spritesheet) {
    super(scene, x * 4, y * 4, spritesheet, 1);
    this.scene = scene;
    this.spritesheet = spritesheet;
    this.holdingFrame = 1;
    scene.physics.world.enableBody(this, 1);
    scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.scene.time.addEvent({
      callback: this.move,
      delay: 3000,
      callbackScope: this,
      loop: true
    });

    this.scene.anims.create({
      key: `${spritesheet}_up`,
      frames: this.scene.anims.generateFrameNumbers(spritesheet, { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    });
    this.scene.anims.create({
      key: `${spritesheet}_down`,
      frames: this.scene.anims.generateFrameNumbers(spritesheet, { start: 4, end: 7 }),
      frameRate: 4,
      repeat: -1
    });
    this.scene.anims.create({
      key: `${spritesheet}_left`,
      frames: this.scene.anims.generateFrameNumbers(spritesheet, { start: 8, end: 11 }),
      frameRate: 4,
      repeat: -1
    });
    this.scene.anims.create({
      key: `${spritesheet}_right`,
      frames: this.scene.anims.generateFrameNumbers(spritesheet, { start: 12, end: 15 }),
      frameRate: 4,
      repeat: -1
    });
  }

  move () {
    let speed = 200;
    let angles = [0, 45, 90, 135, 180, 225, 270, 315];
    let angle = angles[Math.floor(Math.random() * (angles.length - 1))];
    if ([225, 270, 315].includes(angle)) { // moving up
      this.holdingFrame = 1;
      this.anims.play(`${this.spritesheet}_up`,true, this.holdingFrame);
    } else if ([45, 90, 135].includes(angle)) { // moving down
      this.holdingFrame = 5;
      this.anims.play(`${this.spritesheet}_down`,true, this.holdingFrame);
    } else if (angle === 180) { // left
      this.holdingFrame = 9;
      this.anims.play(`${this.spritesheet}_left`,true, this.holdingFrame);
    } else if (angle === 0) { // right
      this.holdingFrame = 13;
      this.anims.play(`${this.spritesheet}_right`,true, this.holdingFrame);
    }

    const x = speed * Math.cos(angle * Math.PI / 180);
    const y = speed * Math.sin(angle * Math.PI / 180);
    this.setVelocity(x, y);

    this.scene.time.addEvent({
      delay: 1000,
      callback: () => { if (this.active) {
        this.setVelocity(0);
        this.anims.stop();
        this.setTexture(this.spritesheet, this.holdingFrame);
      }}
    })
  }
}
