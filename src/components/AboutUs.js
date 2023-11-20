import Integantes from '../data/Integantes.json'
import "./AboutUs.css"

function AboutUs() {

    return(
        <div>
            <section className='AboutUsCards'>
                {Integantes.map ((Alumno) => (
                    <div className="Card" key= {Alumno.code}>
                        <img className='imagenA' src={Alumno.img} alt={Alumno.name}/>
                        <h2>{Alumno.name}</h2>
                        <a href={Alumno.link}>Repositorios</a>
                        <p>{Alumno.lu}</p>
                    </div>

                    
                ))}
            </section>
        </div>
    )
}
export default AboutUs;