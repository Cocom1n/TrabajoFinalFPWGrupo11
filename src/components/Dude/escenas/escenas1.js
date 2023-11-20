 class Level1 extends Phaser.Scene{ 

    constructor(){
       super("level1");
       this.platforms = null;
    }

    preload()   {
        this.load.image('sky','./img/sky.png');
        this.load.image('ground','./img/platform.png');
        this.load.image('star','./img/star.png');
        this.load.image('bomb','./img/bomb.png'); 
        this.load.spritesheet('dude','./img/dude.png',{frameWidth:32,frameHeight:48});   
    }

    create(){
        this.puntajeText="";
        this.puntaje=0;
        this.collectedStars = 0;
        this.scoreMult = 1;

        this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(100, 350, 'ground');
        this.platforms.create(700, 460, 'ground');
        this.platforms.create(700, 490, 'ground');
        this.platforms.create(700, 520, 'ground');
        this.platforms.create(-40, 150, 'ground');
        this.platforms.create(900, 300, 'ground');
        
       
        this.player = this.physics.add.sprite(100,100,'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
            
        //movimiento del dude
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.platforms);

        // estrellas
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 6, 
            setXY: { x: 200, y: 0, stepX: 70 } 
        });

        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.7, 1));
            });

        this.physics.add.collider(this.stars, this.platforms);

        //Choque estrellas y jugador
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        //puntaje
        this.puntajeText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });


        //creacion de bombas
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);

    }
        
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

        if (this.player.body.touching.down)
            this.scoreMult = 1
    }

    //Colisión jugador y estrellas
    collectStar(player, star) {
        star.disableBody(true, true);
        this.puntaje += 10 * this.scoreMult;
        this.collectedStars++;
        this.scoreMult *= 2;
        this.puntajeText.setText('Score: ' + this.puntaje);
        
        if (this.collectedStars >= 20) {
            this.scene.start('level2', {puntaje: this.puntaje});
        }  
        
        //bombas
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) :Phaser.Math.Between(0, 400);
        let bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }
    
    //metodo para q se gane :y

    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        let puntajeAPasar = this.puntaje;
        this.puntaje = 0;
        this.scene.start('Perdiste', {puntaje: puntajeAPasar});  
    }
}
export default Level1 