<script setup lang="ts">
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import type { MainMenu } from './game/scenes/MainMenu';
import PhaserGame from './game/PhaserGame.vue';

// The sprite can only be moved in the MainMenu Scene
const canMoveSprite = ref();

//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();
const spritePosition = ref({ x: 0, y: 0 });

const changeScene = () => {

  const scene = toRaw(phaserRef.value.scene) as MainMenu;

  if (scene) {
    //  Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
    console.log(scene);
    scene.changeScene();
  }

}

const moveSprite = () => {

  if (phaserRef.value !== undefined) {

    const scene = toRaw(phaserRef.value.scene) as MainMenu;

    if (scene) {
      // Get the update logo position
      (scene as MainMenu).moveLogo(({ x, y }) => {

        spritePosition.value = { x, y };

      });
    }
  }

}

const addSprite = () => {

  const scene = toRaw(phaserRef.value.scene) as Phaser.Scene;

  if (scene) {
    let action1 = scene.physics.add.sprite(100, 200, 'zb1');
    action1.setScale(2);

    scene.anims.create({
                         key: 'p',
                         frames: scene.anims.generateFrameNames('zb1', { start: 0, end: 11 }),
                         frameRate: 10,
                         repeat: -1

                       });
    action1.anims.play('p', true);
  }

}

// Event emitted from the PhaserGame component
const currentScene = (scene: MainMenu) => {

  canMoveSprite.value = (scene.scene.key !== "MainMenu");

}

</script>

<template>
  <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
  <div>
    <div>
      <button class="button" @click="changeScene">Change Scene</button>
    </div>
    <div>
      <button :disabled="canMoveSprite" class="button" @click="moveSprite">Toggle Movement</button>
    </div>
    <div class="spritePosition">Sprite Position:
      <pre>{{ spritePosition }}</pre>
    </div>
    <div>
      <button class="button" @click="addSprite">Add New Sprite</button>
    </div>
  </div>
</template>
