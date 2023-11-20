class win extends Phaser.Scene {
    constructor() {
      super({ key: 'win' });
      this.score = 0;
    }

    init(data)
    {
    if (data.puntos < 0)
      this.score = 0
    else
      this.score = data.puntos;
    }


    preload() {
      this.load.image('fondowin', './img/fondowin.png');
      this.load.image('boton', './img/boton.png');
    }

    create(){
    // use el mismo boton para volver a jugar
    this.add.image(400,300,'fondowin');
    let puntuacionTexto = 'Puntuacion: ' + this.score;
    this.end_puntuacion_txt = this.add.text(350, 250, puntuacionTexto, { font: '"Press Start 2P"', color: '#FF7000'});
    this.end_puntuacion_txt.scale = 2;
    this.botonvolver = this.add.image(400,400,'boton1').setInteractive();
        this.botonvolver.on('pointerdown', () =>{
          console.log("hola");
          //cambiar el nombre de la escena a la que tiene q cambiar owo
          this.scene.start('menu');
        });
      }

    }
export default win;