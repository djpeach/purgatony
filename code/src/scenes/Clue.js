import 'phaser';

export default class ClueScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init(data) {
    this.gameScene = this.scene.get('Game');
    this.clue = data.clue;
  }

  preload() {
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      b_1: Phaser.Input.Keyboard.KeyCodes.Q,
      b_2: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
  }

  setupUiElements() {
    this.box = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, window.innerWidth * 0.8, window.innerHeight * 0.8, 0xD9CAA9);
    this.add.text(this.box.getTopLeft().x + 16, this.box.getTopLeft().y + 16, this.clue.prompt, { fontSize: '32px', color: '#000' });
    this.add.text(this.box.getBottomRight().x - 150, this.box.getBottomRight().y - 24, "'E' to select", { fontSize: '16px', color: '#000' });
    this.add.text(this.box.getBottomRight().x - 150, this.box.getBottomRight().y - 40, "'Q' to dismiss", { fontSize: '16px', color: '#000' });
    this.add.text(this.box.getTopLeft().x + 16, this.box.getTopLeft().y + 16, this.clue.prompt, { fontSize: '32px', color: '#000' });
    this.resultText = this.add.text(this.box.getTopLeft().x + 16, this.box.getBottomLeft().y - 30, '', { fontSize: '28px', color: '#000' });
    this.clue.options.forEach((option, i) => {
      option.selected = false;
      option.text = this.add.text(this.box.getTopLeft().x + 48, this.box.getTopLeft().y + 75 + (12 + 24) * i, option.prompt, { fontSize: '24px', color: '#000' })
    });
    this.clue.options[0].selected = true;
  }

  setupEvents() {
    this.cursors.down.on('down', () => {
      for (const [i, option] of this.clue.options.entries()) {
          if (option.selected) {
            option.selected = false;
            this.clue.options[i === this.clue.options.length - 1 ? 0 : i + 1].selected = true;
            break
          }
      }
    });

    this.cursors.up.on('down', () => {
      for (const [i, option] of this.clue.options.entries()) {
        if (option.selected) {
          option.selected = false;
          this.clue.options[i === 0 ? this.clue.options.length - 1 : i - 1].selected = true;
          break
        }
      }
    });

    this.cursors.b_2.on('down', () => {
      for (const [i, option] of this.clue.options.entries()) {
        if (option.selected) {
          this.resultText.setText(this.clue.results[i].prompt);
          break;
        }
      }
    });
  }

  update(time, delta) {
    if (this.cursors.b_1.isDown) {
      this.cursors.down.removeAllListeners('down');
      this.cursors.up.removeAllListeners('down');
      this.scene.resume('Game');
      this.scene.stop('Clue');
    }
    this.clue.options.forEach((option) => {
      if (option.selected) {
        option.text.setColor('#fff');
        option.text.setBackgroundColor('#000');
      } else {
        option.text.setColor('#000');
        option.text.setBackgroundColor('#D9CAA9');
      }
    })
  }
};
