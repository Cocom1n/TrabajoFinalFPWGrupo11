class Level3 extends Phaser.Scene{
    constructor(){
        super("level3");
        this.score = 0;
        this.scoreText = "";
        this.remainingTime = null;
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
        this.load.image('lana','./img/level3/Lana.png');
        this.load.image('ground-lvl3','./img/level2/platform2-lvl2.png');
        this.load.image('platform1-lvl3','./img/level2/platform1-lvl2.png');
        this.load.spritesheet('dude-lvl3','./img/level2/dude.png', { frameWidth: 32, frameHeight: 48});
    }

    create() {
        this.add.image(400, 300, 'backgroundlvl3');
        this.platformsl3 = this.physics.add.staticGroup();
        this.platformsl3.create(400, 565, 'ground-lvl3'); //piso
        this.platformsl3.create(220, 280, 'platform1-lvl3');
        this.platformsl3.create(125, 380, 'platform1-lvl3');
        this.platformsl3.create(400, 180, 'platform1-lvl3');
        this.platformsl3.create(this.canvas.width-220, 280, 'platform1-lvl3');
        this.platformsl3.create(this.canvas.width-125, 380, 'platform1-lvl3');
        
        //Jefe
        this.boss = this.physics.add.sprite(400, 60, 'boss');
        this.physics.add.collider(this.boss, this.platformsl3);

        //creacion del player
        this.player = this.physics.add.sprite(150, 460, 'dude-lvl3');
        //rebote y evitar que el player se salga del mundo
        //this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.add.overlap(this.boss, this.player, this.onOverlapBoss, null, this);

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

        // Pelotas
        this.ballRight = this.physics.add.group();
        this.ballRightManager = {
            cooldown: 500,
            nextTimeShoot: 0,
            max : 8,
            count : 0,
            shooting: false
        };

        this.physics.add.collider(this.ballRight, this.platformsl3);
        this.physics.add.overlap(this.ballRight, this.player, this.onPickUpBalls, null, this);

        this.ballLeft = this.physics.add.group();
        this.ballLeftManager = {
            cooldown: 500,
            nextTimeShoot: 0,
            max : 8,
            count : 0,
            shooting: false
        };

        this.physics.add.collider(this.ballLeft, this.platformsl3);
        this.physics.add.overlap(this.ballLeft, this.player, this.onPickUpBalls, null, this);

        this.ballUp = this.physics.add.group();
        this.ballUpManager = {
            cooldown: 500,
            nextTimeShoot: 0,
            max : 8,
            count : 0,
            shooting: false
        };

        this.physics.add.collider(this.ballUp, this.platformsl3);
        this.physics.add.overlap(this.ballUp, this.player, this.onPickUpBalls, null, this);

        // TIEMPO
        this.remainingTime = this.add.text(50, 50, 'Tiempo: 120', {fontSize: '40px', fill: '#FFF'});
        this.startTime = this.time.now;
        this.endTime = this.startTime+80000;

        // Patrones de pelotas
        this.ataques = [
            {
                direccion: 0,
                timeAttack: this.startTime+1500
            },
            {
                direccion: 1,
                timeAttack: this.startTime+7000
            },
            {
                direccion: 2,
                timeAttack: this.startTime+15000
            },
            {
                direccion: 0,
                timeAttack: this.startTime+25000
            },
            {
                direccion: 1,
                timeAttack: this.startTime+30000
            },
            {
                direccion: 2,
                timeAttack: this.startTime+45000
            },
            {
                direccion: 0,
                timeAttack: this.startTime+52000
            },
            {
                direccion: 2,
                timeAttack: this.startTime+60000
            },
            {
                direccion: 1,
                timeAttack: this.startTime+68000
            },
            {
                direccion: 0,
                timeAttack: this.startTime+75000
            },
        ];

        // Daño acumulado
        this.danoAcumulado = 0;
        this.danoAcumuladoText = this.add.text(50, 550, 'Daño: '+this.danoAcumulado, {fontSize: '40px', fill: '#FFF'});
    
        // Vida jefe
        this.bossLife = 40;
        this.bossLifeText = this.add.text(450, 550, 'Vida Jefe: '+this.bossLife, {fontSize: '40px', fill: '#FFF'});
    }

    update(time) {
        this.remainingTime.setText('Tiempo: ' + Math.trunc((this.endTime-time)/1000));
        this.danoAcumuladoText.setText('Daño: '+this.danoAcumulado);
        this.bossLifeText.setText('Vida Jefe: '+this.bossLife);


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

        if (this.ataques && this.ataques.length != 0 && this.ataques[0].timeAttack < time)
        {
            switch (this.ataques[0].direccion)
            {
                case 0:
                    this.ballUpManager.shooting = true;
                break;
                case 1:
                    this.ballLeftManager.shooting = true;
                break;
                default:
                    this.ballRightManager.shooting = true;
            }
            this.ataques.shift();
        }

        this.checkSpawnBalls(this.ballUp, this.ballUpManager, time,0);
        this.checkSpawnBalls(this.ballLeft, this.ballLeftManager, time,1);
        this.checkSpawnBalls(this.ballRight, this.ballRightManager, time,2);
        this.checkBallsLife(this.ballUp);
        this.checkBallsLife(this.ballLeft);
        this.checkBallsLife(this.ballRight);

        // Condiciones de victoria/derrota
        if (this.bossLife <= 0)
        {
            let addScore = 10*Math.trunc((this.endTime-time)/1000);
            this.scene.start('win',{puntos: this.score + addScore});
        }
        if (this.endTime-time < 0)
        {
            this.scene.start('Perdiste',{puntos: this.score});
        }
    }

    checkSpawnBalls(balls, ballsManager= {cooldown: 500,nextTimeShoot: 0,max : 8,count : 0,shooting: true}, time, direccion)
    {
        if (ballsManager.count < ballsManager.max && ballsManager.shooting)
        {
            if (ballsManager.nextTimeShoot < time)
            {
                let lana;
                if (direccion == 0)
                {
                    lana = balls.create(Phaser.Math.Between(50, this.canvas.width-50), -10, 'lana');
                    if (Phaser.Math.Between(-1, 1) <= 0)
                    {
                        lana.setVelocityX(-80);
                    }
                    else
                    {
                        lana.setVelocityX(80);
                    } 
                }
                else
                {
                    if (direccion == 1)
                    {
                        lana = balls.create(0, this.player.y-Phaser.Math.Between(75, 85), 'lana');
                        lana.setVelocityX(200);
                    }
                    else
                    {
                        lana = balls.create(this.canvas.width, this.player.y-Phaser.Math.Between(75, 85), 'lana');
                        lana.setVelocityX(-200);
                    }
                }
                
                lana.setBounce(1);
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

    checkBallsLife(balls)
    {
        balls.children.iterate((children)=>{
            if(children && (children.x > this.canvas.width || children.x < 0))
            {
                children.destroy();
            }
        });
    }

    onPickUpBalls(player, ball)
    {
        if (ball)
        {
            ball.destroy();
            this.danoAcumulado++;
        }
    }

    onOverlapBoss(player, boss)
    {
        this.bossLife -= this.danoAcumulado;
        this.danoAcumulado = 0;
        console.log("aaa\n");
    }
}
export default Level3;