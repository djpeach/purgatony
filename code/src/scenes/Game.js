import 'phaser';
import Player from '../sprites/Player'
import Clue from "../sprites/Clue";
import NPC from "../sprites/NPC";

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  init (data) {
    this.cluesInfo = data.clues;
    this.chatsInfo = data.chats;
    this.scene.launch('Hints');
  }

  preload () {
    this.scale.on('resize', this.resize, this);
    this.cursors = this.input.keyboard.addKeys(
      {
        up:Phaser.Input.Keyboard.KeyCodes.W,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D,
        b_1: Phaser.Input.Keyboard.KeyCodes.Q,
      }
    );
    this.map = this.createMap();
    this.clues = this.createClues();
    this.clients = this.createClients();
    this.player = this.createPlayer();
    this.addCollisions();

    this.cameras.main.startFollow(this.player);
  }

  create () {
    this.scene.get('Game').events.on('resume', () => {
      this.events.emit('updateText', "WASD to move around");
      this.input.keyboard.resetKeys();
      this.player.frozen = false;
    })
  }

  update(time, dt) {
    this.player.update(dt, this.cursors);
  }

  createMap() {
    let map = this.make.tilemap({key: 'level1'});
    this.physics.world.setBounds(0, 0, 2560, 2560);
    this.tiles = map.addTilesetImage('mainTileSheet');
    this.floorLayer = map.createStaticLayer('Floor', this.tiles, 0, 0);
    this.walkwayLayer = map.createStaticLayer('Walkways', this.tiles, 0, 0);
    this.wallsLayer = map.createStaticLayer('Walls', this.tiles, 0, 0);
    this.furnishingsLayer = map.createStaticLayer('Furnishings', this.tiles, 0, 0);
    this.decorationsLayer1 = map.createStaticLayer('Decorations 1', this.tiles, 0, 0);
    this.decorationsLayer2 = map.createStaticLayer('Decorations 2', this.tiles, 0, 0);
    this.floorLayer.setScale(4);
    this.walkwayLayer.setScale(4);
    this.wallsLayer.setScale(4);
    this.furnishingsLayer.setScale(4);
    this.decorationsLayer1.setScale(4);
    this.decorationsLayer2.setScale(4);
    this.wallsLayer.setCollisionByExclusion([-1]);

    return map
  }

  createPlayer() {
    let player;
    this.map.findObject('Player', (obj) => {
      if (obj.type === 'SpawnPoint') {
        player = new Player(this, obj.x * 4, obj.y * 4, 'tony');
      }
    });

    return player;
  }

  createClues() {
    let objectLayer = this.map.getObjectLayer('Clues');
    let clues = this.add.group();
    objectLayer.objects.forEach((clue) => {
      let clueSprite = new Clue(this, clue.x, clue.y, clue.gid - 1, clue);
      clues.add(clueSprite);
    });

    return clues
  }

  createClients() {
    let clientSpawnLayer = this.map.getObjectLayer('ClientSpawns');
    let clients = this.add.group();
    clientSpawnLayer.objects.forEach((clientSpawn) => {
      let clientSprite = new NPC(this, clientSpawn.x, clientSpawn.y, clientSpawn.name);
      clientSprite.clientName = clientSpawn.name;
      clients.add(clientSprite);
    });

    return clients;
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.wallsLayer);
    this.physics.add.collider(this.wallsLayer, this.clients);
    this.physics.add.overlap(this.player, this.clues, this.inspectClue, null, this);
    this.physics.add.overlap(this.player, this.clients, this.talkToClient, null, this);
  }

  inspectClue(player, clue) {
    this.events.emit('updateText', "'Q' to inspect");
    if (this.cursors.b_1.isDown) {
      this.scene.run('Clue', {clue: {...this.cluesInfo[`level1Clues`][clue.client][clue.clueId], ...clue}});
      this.scene.bringToTop('Clue');
      this.scene.pause('Game');
      this.player.freeze();
    }
  }

  talkToClient(player, client) {
    this.events.emit('updateText', `'Q' to talk to ${client.clientName}`);
    if (this.cursors.b_1.isDown) {
      this.scene.run('Chat', {chat: {...this.chatsInfo[`level1Chats`][client.clientName]}});
      this.scene.bringToTop('Chat');
      this.scene.pause('Game');
      this.player.freeze();
    }
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
