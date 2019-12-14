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
    this.addCollisions();

    this.cameras.main.startFollow(this.player);
  }

  create () {
  }

  update(time, dt) {
    this.player.update(dt, this.cursors);
  }

  createMap() {
    this.map = this.make.tilemap({key: 'level2'});
    this.physics.world.setBounds(0, 0, 2560, 2560);
    this.tiles = this.map.addTilesetImage('mainTileSheet');
    this.floorLayer = this.map.createStaticLayer('Floor', this.tiles, 0, 0);
    this.walkwayLayer = this.map.createStaticLayer('Walkways', this.tiles, 0, 0);
    this.wallsLayer = this.map.createStaticLayer('Walls', this.tiles, 0, 0);
    this.furnishingsLayer = this.map.createStaticLayer('Furnishings', this.tiles, 0, 0);
    this.decorationsLayer1 = this.map.createStaticLayer('Decorations 1', this.tiles, 0, 0);
    this.decorationsLayer2 = this.map.createStaticLayer('Decorations 2', this.tiles, 0, 0);
    this.floorLayer.setScale(4);
    this.walkwayLayer.setScale(4);
    this.wallsLayer.setScale(4);
    this.furnishingsLayer.setScale(4);
    this.decorationsLayer1.setScale(4);
    this.decorationsLayer2.setScale(4);
    this.wallsLayer.setCollisionByExclusion([-1]);
  }

  createPlayer() {
    this.map.findObject('Player', (obj) => {
      if (obj.type === 'SpawnPoint') {
        this.player = new Player(this, obj.x * 4, obj.y * 4);
      }
    });
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.wallsLayer)
  }

  resize (gameSize, baseSize, displaySize, resolution) {
    console.log('resizing');
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
