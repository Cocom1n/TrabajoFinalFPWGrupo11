import Integantes from '../data/Integantes.json'
import "./AboutUs.css"

function AboutUs() {

    return(
        <div>
            <section >
                {Integantes.map ((Alumno) => (
                    <div className="Card" key= {Alumno.code}>
                        <h2>{Alumno.name}</h2>
                        <img src={Alumno.img} alt={Alumno.name}/>
                        <a href={Alumno.link}>Repositorios</a>
                        <p>{Alumno.lu}</p>
                    </div>

                    
                ))}
            </section>
        </div>
    )
}
export default AboutUs;