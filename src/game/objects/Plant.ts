import Phaser from "phaser";

class Plant extends Phaser.GameObjects.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
    super(scene, x, y, texture);
  }
}


class Cactus extends Plant {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'Cactus');
    this.anims.create({
                        key: 'walk',
                        frames: this.anims.generateFrameNames('Cactus', { start: 0, end: 10 }),
                        frameRate: 12,
                        repeat: -1
                      });
  }

}

class PlantFactory {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createCactus(x: number, y: number) {
    let plant = new Cactus(this.scene, x, y);
    plant.play('walk');
    this.scene.add.existing(plant);
    this.scene.physics.add.existing(plant);
    return plant;
  }

}


export {
  Plant, PlantFactory
}
