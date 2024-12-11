import Phaser, { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';
import { Zombie, ZombieFactory } from "../objects/Zombie.ts";
import { BoxFactory } from "../objects/Box.ts";
import { PlantFactory } from "../objects/Plant.ts";
import { Bullet, BulletFactory } from "../objects/Bullet.ts";

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  logoTween: Phaser.Tweens.Tween | null;
  zombieFactory: ZombieFactory;
  boxFactory: BoxFactory;
  plantFactory: PlantFactory;
  bulletFactory: BulletFactory;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  player;
  spacebar;

  constructor() {
    super('MainMenu');
    this.zombieFactory = new ZombieFactory(this);
    this.boxFactory = new BoxFactory(this);
    this.plantFactory = new PlantFactory(this);
    this.bulletFactory = new BulletFactory(this);
  }

  create() {
    this.bulletFactory.bullets = this.add.group();
    this.zombieFactory.zombies = this.add.group();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.background = this.add.image(700, 300, 'background');

    this.boxFactory.create();
    this.zombieFactory.createByLine(0);
    this.zombieFactory.createByLine(0);
    this.zombieFactory.createByLine(3);
    this.zombieFactory.createByLine(4);

    this.player = this.plantFactory.createCactus(290, 400);
    this.player.setInteractive();
    const bulletFactory = this.bulletFactory;
    let bullet = bulletFactory.create(290, 400);

    this.physics.add.existing(bullet);

    this.physics.add.collider(this.bulletFactory.bullets, this.zombieFactory.zombies, function (b: Bullet, z: Zombie) {
      z.onHurt(b.damage);
      b.destroy();
    });
    
    const zombieFactory = this.zombieFactory;
    this.time.addEvent({
                         delay: 4000,
                         loop: true,
                         callback: function () {
                           zombieFactory.createByLine(3);
                           zombieFactory.createByLine(2);
                           zombieFactory.createByLine(1);
                         }
                       });
    EventBus.emit('current-scene-ready', this);
  }


  update(time: number, delta: number) {
    Phaser.Actions.IncX(this.zombieFactory.zombies.children.entries, -1);
    Phaser.Actions.IncX(this.bulletFactory.bullets.children.entries, 12);
    if (this.input.keyboard.checkDown(this.spacebar, 100)) {
      this.bulletFactory.create(this.player.x, this.player.y);
    }
    //  Vertical movement every 150ms
    if (this.input.keyboard.checkDown(this.cursors.up, 150)) {
      if (this.player.y <= 100) {
        return;
      }
      this.player.y -= 100;
    }
    else if (this.input.keyboard.checkDown(this.cursors.down, 150)) {
      if (this.player.y > 400) {
        return;
      }
      this.player.y += 100;
    }
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

    this.scene.start('Game');
  }
}
