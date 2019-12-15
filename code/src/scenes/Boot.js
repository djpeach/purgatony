import 'phaser';
import level1 from '../../assets/levels/level1'
import level2 from '../../assets/levels/level2'
import mainTileSheet from '../../assets/tilesheets/mainTileSheet.png'
import tony from '../../assets/characters/tony.png'

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.load.tilemapTiledJSON('level1', level1);
    this.load.tilemapTiledJSON('level2', level2);
    this.load.spritesheet('mainTileSheet', mainTileSheet, { frameWidth: 16, frameHeight: 16, margin: 0, spacing: 1 });
    this.load.spritesheet('tony', tony, { frameWidth: 32, frameHeight: 32, margin: 0, spacing: 0});
  }

  create () {
    this.scene.start('Game');
  }
};
