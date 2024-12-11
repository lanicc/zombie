import Phaser, { GameObjects } from "phaser";

class Zombie extends Phaser.GameObjects.Sprite {
  blood: number;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'zb1');
    this.anims.create({
                        key: 'walk',
                        frames: this.anims.generateFrameNames('zb1', { start: 0, end: 10 }),
                        frameRate: 12,
                        repeat: -1
                      });
    this.blood = 30;
  }

  onHurt(damage: number) {
    this.blood = this.blood - damage;
    if (this.blood < 1) {
      this.destroy();
    }
  }
}

class ZombieFactory {
  scene: Phaser.Scene;
  zombies: GameObjects.Group;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createByLine(line: number) {
    const x = 1400;
    let y: number;
    const lines = [100, 200, 300, 400, 500];
    y = lines[line];
    return this.createByXy(x, y);
  }

  createByXy(x: number, y: number) {
    let zombie = new Zombie(this.scene, x, y);
    zombie.play('walk');
    this.scene.add.existing(zombie);
    this.scene.physics.add.existing(zombie);
    this.zombies.add(zombie);
    return zombie;
  }
}

export {
  Zombie, ZombieFactory
};

