import 'phaser';
import Player from '../sprites/Player'

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.scale.on('resize', this.resize, this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.createMap();
    this.createPlayer();

    this.cameras.main.startFollow(this.player);
  }

  create () {
  }

  update() {
    this.player.update(this.cursors);
  }

  createMap() {
    this.map = this.make.tilemap({key: 'level1'});
    this.tiles = this.map.addTilesetImage('mainTileSheet');
    this.backgroundLayer = this.map.createStaticLayer('Floor', this.tiles, 0, 0);
    this.walkwayLayer = this.map.createStaticLayer('Walkways', this.tiles, 0, 0);
    this.furnishingsLayer = this.map.createStaticLayer('Furnishings', this.tiles, 0, 0);
    this.backgroundLayer.setScale(4);
    this.walkwayLayer.setScale(4);
    this.furnishingsLayer.setScale(4);
  }

  createPlayer() {
    this.player = new Player(this, 0, 0);
  }

  resize (gameSize, baseSize, displaySize, resolution) {
    let width = gameSize.width;
    let height = gameSize.height;
    if (width === undefined) {
      width = this.sys.game.config.width;
    }
    if (height === undefined) {
      height = this.sys.game.config.height;
    }
    this.cameras.resize(width, height);
  }
};
