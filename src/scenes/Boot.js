import 'phaser';
import level1 from '../../assets/levels/level1'
import mainTileSheet from '../../assets/tilesheets/mainTileSheet.png'
import testGuy from '../../assets/characters/testGuy.png'

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.load.tilemapTiledJSON('level1', level1);
    this.load.spritesheet('mainTileSheet', mainTileSheet, { frameWidth: 16, frameHeight: 16 });
    this.load.image('testGuy', testGuy);
  }

  create () {
    this.scene.start('Game');
  }
};
