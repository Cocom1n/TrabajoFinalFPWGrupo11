class perdiste extends Phaser.Scene {
    constructor() {
        super({ key: 'Perdiste' });
    }

    init(data) {
        if (data.puntaje != undefined)
            this.puntaje = data.puntaje;
        else
            this.puntaje = -1;
    }

    preload() {
        this.load.image('perdiste-img', '../../img/perdiste_image.png');
        this.load.image('btn_repetir', '../../img/btn_repetir.png');
        this.load.image('btn_menu', '../../img/btn_menu.png');
    }

    create() {
        this.add.image(400,150,'perdiste-img');
        let puntuacionTexto = 'Puntuacion: ' + this.puntaje;
        this.end_puntuacion_txt = this.add.text(350, 250, puntuacionTexto, { font: '"Press Start 2P"', color: '#FF7000'});
        this.end_puntuacion_txt.scale = 2;
        this.btn_repetir = this.add.image(200,400,'btn_repetir').setInteractive();
        this.btn_repetir.on('pointerdown', () =>{
            console.log("hola");
            //cambiar el nombre de la escena a la que tiene q cambiar owo
            this.scene.start('Escena1');
        });

        this.btn_menu = this.add.image(600,400,'btn_menu').setInteractive();
        this.btn_menu.on('pointerdown', () =>{
            console.log("hola 2");
            //cambiar el nombre de la escena a la que tiene q cambiar owo
            this.scene.start('menu');
        });
    }
}
export default perdiste;