import Phaser, { GameObjects } from "phaser";

class Bullet extends Phaser.GameObjects.Sprite {
  damage: number;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
    super(scene, x, y, texture);
    this.anims.create({
                        key: 'walk',
                        frames: this.anims.generateFrameNames('bullet', { start: 0, end: 1 }),
                        frameRate: 12,
                        repeat: -1
                      });
    this.damage = 10;
  }

}

class BulletFactory {
  scene: Phaser.Scene;
  bullets: GameObjects.Group;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create(x: number, y: number) {
    let bullet = new Bullet(this.scene, x, y);
    bullet.play('walk');
    this.scene.add.existing(bullet);
    this.scene.physics.add.existing(bullet);
    this.bullets.add(bullet);
    return bullet;
  }

}


export {
  Bullet, BulletFactory
}
