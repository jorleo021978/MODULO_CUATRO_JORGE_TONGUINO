import '../App.css'
import image from '../assets/perro.jpg'

const Card = (props) => {
    return (
        <div className='card_container'>
            <img width="250px" src={props.image}/>
            <h2 className='justificar-linea'>{props.title}</h2>
            <p className='justificar-linea'>{props.detail}</p>
        </div>
    )
}

export default Card;