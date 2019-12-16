import 'phaser';
import Character from "./Character";

export default class Player extends Character {
  constructor(scene, x, y, spritesheet) {
    super(scene, x, y, spritesheet, 1);
    this.scene = scene;
    console.log(this.scene.cache.json.entries.level1Clues);
    this.holdingFrame = 1;

    this.scene.anims.create({
      key: 'tony_up',
      frames: this.scene.anims.generateFrameNumbers('tony', { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'tony_down',
      frames: this.scene.anims.generateFrameNumbers('tony', { start: 4, end: 7 }),
      frameRate: 7,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'tony_left',
      frames: this.scene.anims.generateFrameNumbers('tony', { start: 8, end: 11 }),
      frameRate: 7,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'tony_right',
      frames: this.scene.anims.generateFrameNumbers('tony', { start: 12, end: 15 }),
      frameRate: 7,
      repeat: -1
    });
  }

  update(dt, cursors) {
    let speed = 0;
    let angle = 0;
    let potSpeed = 400;
    if (cursors.up.isDown) {
      this.holdingFrame = 1;
      this.anims.play('tony_up', true, this.holdingFrame);
      speed = potSpeed;
      if (cursors.left.isDown) {
        angle = 225
      } else if (!cursors.right.isDown) {
        angle = 270
      } else {
        angle = 315
      }
    } else if (cursors.down.isDown) {
      this.holdingFrame = 5;
      this.anims.play('tony_down', true, this.holdingFrame);
      speed = potSpeed;
      if (cursors.right.isDown) {
        angle = 45;
      } else if (!cursors.left.isDown) {
        angle = 90;
      } else {
        angle = 135;
      }
    } else if (cursors.left.isDown) {
      this.holdingFrame = 9;
      this.anims.play('tony_left', true, this.holdingFrame);
      speed = potSpeed;
      angle = 180;
    } else if (cursors.right.isDown) {
      this.holdingFrame = 13;
      this.anims.play('tony_right', true, this.holdingFrame);
      speed = potSpeed;
      angle = 0;
    } else {
      this.anims.stop();
      this.setTexture('tony', this.holdingFrame);
    }
    const x = speed * Math.cos(angle * Math.PI / 180);
    const y = speed * Math.sin(angle * Math.PI / 180);
    this.setVelocity(x, y);
  }

  inspectClue(player, clue) {
    // console.log(this.cache);
    // console.log(this.scene.cache.json.get('level1Clues'));
    // let clueJson = this.scene.cache.json.get(`level1Clues`);
    // console.log(clueJson[clue.client][clue.clueId].prompt);
  }
}
