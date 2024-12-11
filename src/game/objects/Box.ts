import Phaser from "phaser";

class Box extends Phaser.GameObjects.Image {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'box');
    this.setScale(0.04);
  }

  onClick() {
    console.log(1);
  }
}

class BoxFactory {

  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create() {
    let box = new Box(this.scene, 100, 20);
    this.scene.add.existing(box);
    box.setInteractive();
    box.on('clicked', this._click, this.scene);
    return box;
  }

  _click(box) {
    box.onClick();
  }
}

export {
  Box, BoxFactory
}
