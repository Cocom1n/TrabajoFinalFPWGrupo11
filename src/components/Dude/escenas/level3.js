class Level3 extends Phaser.Scene{
    constructor(){
        super("level3");
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

    preload() {
        this.canvas = this.sys.game.canvas;

        this.load.image('backgroundlvl3','./img/level2/background-lvl2.png');
        this.load.image('boss','./img/level3/boss.png');
        this.load.image('misil','./img/level3/misil.png');
        this.load.image('ground-lvl3','./img/level2/platform2-lvl2.png');
        this.load.image('platform1-lvl3','./img/level2/platform1-lvl2.png');
        this.load.spritesheet('dude-lvl3','./img/level2/dude.png', { frameWidth: 32, frameHeight: 48});
    }

    create() {
        this.add.image(400, 300, 'backgroundlvl3');
        this.platformsl3 = this.physics.add.staticGroup();
        this.platformsl3.create(400, 565, 'ground-lvl3'); //piso
        this.platformsl3.create(220, 240, 'platform1-lvl3');
        this.platformsl3.create(125, 400, 'platform1-lvl3');
        this.platformsl3.create(this.canvas.width-220, 240, 'platform1-lvl3');
        this.platformsl3.create(this.canvas.width-125, 400, 'platform1-lvl3');
        this.add.image(400, 100, 'boss');

        //creacion del player
        this.player = this.physics.add.sprite(150, 460, 'dude-lvl3');
        //rebote y evitar que el player se salga del mundo
        //this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        //creacion de las animaciones del player
        //animacion para izquierda
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude-lvl3', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })
        //animacion cuando no se presiona ninguna tecla
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude-lvl3', frame: 4}],
            frameRate: 20
        })
        //animacion para derecha
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude-lvl3', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        })

        //añadiendo colision entre el player y las plataformas
        this.physics.add.collider(this.player, this.platformsl3);
        //creando teclas para mover al player
        this.cursors = this.input.keyboard.createCursorKeys();

        // Misiles
        this.ballRight = this.physics.add.group();
        this.ballRightManager = {
            cooldown: 500,
            nextTimeShoot: 0,
            max : 8,
            count : 0,
            shooting: true
        };

        this.physics.add.collider(this.ballRight, this.platformsl3);

        this.ballLeft = this.physics.add.group();
        this.ballLeftManager = {
            cooldown: 500,
            nextTimeShoot: 0,
            max : 8,
            count : 0,
            shooting: true
        };

        this.physics.add.collider(this.ballLeft, this.platformsl3);

        this.ballUp = this.physics.add.group();
        this.ballUpManager = {
            cooldown: 500,
            nextTimeShoot: 0,
            max : 8,
            count : 0,
            shooting: true
        };

        this.physics.add.collider(this.ballUp, this.platformsl3);
    }

    update(time) {
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

        this.checkSpawnBalls(this.ballUp, this.ballUpManager, time,0);
        this.checkSpawnBalls(this.ballLeft, this.ballLeftManager, time,1);
        this.checkSpawnBalls(this.ballRight, this.ballRightManager, time,2);
    }

    checkSpawnBalls(balls, ballsManager= {cooldown: 500,nextTimeShoot: 0,max : 8,count : 0,shooting: true}, time, direccion)
    {
        if (ballsManager.count < ballsManager.max && ballsManager.shooting)
        {
            if (ballsManager.nextTimeShoot < time)
            {
                let misil;
                if (direccion == 0)
                {
                    misil = balls.create(Phaser.Math.Between(50, this.canvas.width-50), -10, 'misil');
                    if (Phaser.Math.Between(-1, 1) <= 0)
                    {
                        misil.setVelocityX(-80);
                    }
                    else
                    {
                        misil.setVelocityX(80);
                    } 
                }
                else
                {
                    if (direccion == 1)
                    {
                        misil = balls.create(Phaser.Math.Between(-150, -50), this.player.y-80, 'misil');
                        misil.setVelocityX(200);
                    }
                    else
                    {
                        misil = balls.create(Phaser.Math.Between(850, 950), this.player.y-80, 'misil');
                        misil.setVelocityX(-200);
                    }
                }
                
                misil.setBounce(1);
                ballsManager.nextTimeShoot = time + ballsManager.cooldown;
                ballsManager.count++;

                if (ballsManager.count == ballsManager.max)
                {
                    ballsManager.shooting = false;
                    ballsManager.count = 0;
                }
            }
        }
    }

    checkBallsLife(balls, direction)
    {
        // 0 = Desde arriba
        // 1 = Desde izq
        // 2 = Desde der
        if (direction == 1)
        {
            balls.children.iterate((children)=>{
                if(children && children.x > this.canvas.width+50)
                {
                    children.destroy();

                }
            });
        }
        if (direction == 2)
        {
            balls.children.iterate((children)=>{
                if(children && children.x < -50)
                {
                    children.destroy();

                }
            });
        }
    }
}
export default Level3;