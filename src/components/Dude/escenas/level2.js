class Level2 extends Phaser.Scene{
    constructor(){
        super("level2");
        this.platformsl2 = null;
        this.score = 0;
        this.scoreText = "";
    }

    init(data)
    {
        if (data.puntaje < 0)
            this.score = 0
        else
            this.score = data.puntaje;
    }

    preload(){
        this.load.image('backgroundlvl2','../img/level2/background-lvl2.png');
        this.load.image('platform1-lvl2','../img/level2/platform1-lvl2.png');
        this.load.image('platform2-lvl2','../img/level2/platform2-lvl2.png');
        this.load.image('apple','../img/level2/apple.png');
        this.load.image('bomb2','../img/level2/bomb.png');
        this.load.spritesheet('dude-lvl2','../img/level2/dude.png', { frameWidth: 32, frameHeight: 48});
        //this.load.audio('playerJump2', '../sonido/level2/jump.mp3');
        //this.load.audio('explosion2', '../sonido/level2/explosion.mp3');
    }

    create(){
        this.collectedStars = 0;

        //creacion del escenario
        this.add.image(400, 300, 'backgroundlvl2');
        this.platformsl2 = this.physics.add.staticGroup();
        this.platformsl2.create(400, 565, 'platform2-lvl2'); //piso
        this.platformsl2.create(220, 220, 'platform1-lvl2');
        this.platformsl2.create(125, 400, 'platform1-lvl2');
        this.platformsl2.create(100, 120, 'platform1-lvl2');
        this.platformsl2.create(650, 220, 'platform1-lvl2');
        this.platformsl2.create(700, 450, 'platform1-lvl2');
        this.platformsl2.create(450, 300, 'platform1-lvl2');

        //sonidos
        //this.playerJump = this.sound.add('playerJump2');
        //this.explosionBomb = this.sound.add('explosion2');

        //creacion del player
        this.player = this.physics.add.sprite(150, 460, 'dude-lvl2');
        //rebote y evitar que el player se salga del mundo
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        //creacion de las animaciones del player
        //animacion para izquierda
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude-lvl2', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })
        //animacion cuando no se presiona ninguna tecla
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude-lvl2', frame: 4}],
            frameRate: 20
        })
        //animacion para derecha
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude-lvl2', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        })
        //añadiendo colision entre el player y las plataformas
        this.physics.add.collider(this.player, this.platformsl2);
        //creando teclas para mover al player
        this.cursors = this.input.keyboard.createCursorKeys();
        //creando manzanas
        this.apples = this.physics.add.group({
            key: 'apple',
            repeat: 10,
            setXY: { x: 30, y: 20, stepX:80}
        });
        //segunda fila de manzanas, es redundante, pero no sabía como porner otra fila
        this.apples2 = this.physics.add.group({
            key: 'apple',
            repeat: 5,
            setXY: { x: 30, y: 350, stepX:100}
        });
        //rebote para las manzanas, ambas filas
        this.apples.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.apples2.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        //habilita las colisiones entre las manzanas con las plataformas, ambas filas
        this.physics.add.collider(this.apples, this.platformsl2);
        this.physics.add.collider(this.apples2, this.platformsl2);

        //choque entre las manzanas y el player, ambas filas
        this.physics.add.overlap(this.player, this.apples, this.collectApple, null, this);
        this.physics.add.overlap(this.player, this.apples2, this.collectApple2, null, this);

        //para controlar el puntaje
        this.scoreText = this.add.text(250, 50, 'Score: '+this.score, {fontSize: '40px', fill: '#FFF'});

        //para agregar bombas
        this.bombslv2 = this.physics.add.group();
        this.physics.add.collider(this.bombslv2, this.platformsl2);
        this.physics.add.collider(this.player, this.bombslv2, this.hitBomb, null, this);
    }

    update(){
        //movimiento del player de izquierda a derecha.
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        //salto del player
        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-330);
            //this.playerJump.play();
        }
    }
    //colision entre el player y las manzanas, ambas filas
    collectApple(player, apples) {
        //si el player pasa por encima de una manzana, la desactiva y la elimina, suma 10 puntos por manzana
        apples.disableBody(true, true);
        this.score +=10;
        this.collectedStars++;
        this.scoreText.setText('Score:' + this.score);
        //crea una bomba en la ubicacion contraria al player cuando recoge manzanas, 1 bomba por cada manzana
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        let bomb = this.bombslv2.create(x, 15, 'bomb2');
        bomb.setBounce(1); //rebote de la bomba
        bomb.setCollideWorldBounds(true); //evita que la bomba se salga de la pantalla, chocando con los bordes del mundo
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 50); //velocidad de la bomba
        if (this.collectedStars >= 10) {
            this.scene.start('level3', {puntaje: this.score});
        }
    }
    collectApple2(player, apples2) { //lo mismo que arriba, solo que esto es para la segunda fila de manzanas que aparece abajo
        apples2.disableBody(true, true);
        this.score +=10;
        this.collectedStars++;
        this.scoreText.setText('Score:' + this.score);
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        let bomb = this.bombslv2.create(x, 15, 'bomb2');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-100, 100), 40);
        if (this.collectedStars >= 10) {
            this.scene.start('level3', {puntaje: this.score});
        }
    }
    //funcion para que las bombas afecten al player, si choca con una, el jugador que suspendido,
    //aqui se carga la pantalla de derrota o algo así
    hitBomb(player, bombslv2){
        //this.explosionBomb.play();
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.start('Perdiste', {puntaje: this.score});
    }
}

export default Level2;