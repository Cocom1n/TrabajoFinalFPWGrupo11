class win extends Phaser.Scene {
    constructor() {
      super({ key: 'win' });
    }


preload() {
    this.load.image('fondowin', '../img/fondowin.png');
    this.load.image('boton', '../img/boton.png');
}

create(){
  // use el mismo boton para volver a jugar
  this.add.image(400,300,'fondowin');

this.botonvolver = this.add.image(400,400,'boton1').setInteractive();
      this.botonvolver.on('pointerdown', () =>{
        console.log("hola");
        //cambiar el nombre de la escena a la que tiene q cambiar owo
        this.scene.start('menu');
      });
    }
 
}
export default win;