import 'phaser';
import Player from '../sprites/Player'
import Clue from "../sprites/Clue";

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.scale.on('resize', this.resize, this);
    this.cursors = this.input.keyboard.addKeys(
      {
        up:Phaser.Input.Keyboard.KeyCodes.W,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D
      }
    );
    this.createMap();
    this.createClues();
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
    this.map = this.make.tilemap({key: 'level1'});
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
        this.player = new Player(this, obj.x * 4, obj.y * 4, 'tony');
      }
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('tony', { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('tony', { start: 4, end: 7 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('tony', { start: 8, end: 11 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('tony', { start: 12, end: 15 }),
      frameRate: 7,
      repeat: -1
    });
  }

  createClues() {
    let objectLayer = this.map.getObjectLayer('Clues');
    let clues = this.add.group();
    objectLayer.objects.forEach((clue) => {
      console.log(clue);
      let clueSprite = new Clue(this, clue.x, clue.y, clue.gid - 1, clue.rotation * Math.PI / 180);
      console.log(clueSprite);
    });

    return clues
  }

  addCollisions() {
    // this.physics.add.collider(this.player, this.wallsLayer)
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
