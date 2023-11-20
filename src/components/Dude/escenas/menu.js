class menu extends Phaser.Scene {
    constructor() {
      super({ key: 'menu' });
    }
  
    preload() {
      this.load.image('fondo-cielo', './img/fondo-cielo.png');
      this.load.image('boton1', './img/boton.png');
      this.load.audio('musica-menu','./sonido/musica-menu.mp3');
      this.load.spritesheet('dude-baile', './img/sprite-menu.png', { frameWidth: 32, frameHeight: 48 });

    }
  
    create() {
      this.add.image(400,300,'fondo-cielo');

      // añade la musica para el menu
      this.sonido = this.sound.add('musica-menu');
      const soundconfig = {
        volume: 1,
        loop: true,
      }

      if(this.sound.locked){
        this.sonido.play(soundconfig)
      } else {
        this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
          this.sonido.play(soundconfig)
        })
      }

      //crea una animacion de dude sin fisicas, solo baila.
      this.player= this.add.sprite(425,332,'dude-baile');

      this.anims.create({
        key: 'bailar',
        frames: this.anims.generateFrameNumbers('dude-baile', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
        });
        this.player.anims.play('bailar', true);



      //crea el boton para pasar a la pantalla de juego
      this.botoninicio = this.add.image(400,400,'boton1').setInteractive();
      this.botoninicio.on('pointerdown', () =>{
        console.log("hola");
        this.sonido.stop();

        //cambiar el nombre de la escena a la que tiene q cambiar owo
        this.scene.start('level1');
      });

    }
  
    //update() {
    //    }
  
}
export default menu;