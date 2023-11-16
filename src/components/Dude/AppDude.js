import Phaser from 'phaser'
import { useState, useEffect } from 'react'
import menu from "./escenas/menu.js"
import Escena1 from "./escenas/escenas1.js"
import level2 from "./escenas/level2.js"
import perdiste from "./escenas/perdiste.js"
import win from "./escenas/win.js"

function AppDude()
{
    const [listo, setListo] = useState(false);
    const Escenas = [menu, Escena1, level2, perdiste, win];
    const createEscena = Scene => new Scene();
    const initEscena = () => Escenas.map(createEscena);

    useEffect( () => {
        let config ={
            type: Phaser.CANVAS,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                parent: "thegame",
                width: 800,
                height: 600
            },
        
                    physics:{
                        default:'arcade',
                        arcade: { gravity:{y:300} }
                    },
        
            //aqui agregar sus escenas
            scene: initEscena()
        
        };
        let game = new Phaser.Game(config);
        game.events.on("LISTO", setListo);

        return () => {
            setListo(false);
            game.destroy(true);
        }
    }, [listo]);
}
export default AppDude;