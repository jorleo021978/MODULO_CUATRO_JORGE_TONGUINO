import './App.css'
import Card from './components/CardComponent'
import Gato from './assets/gato.jpg'
import Aula from './assets/student.jpeg'
import { Component, useState } from 'react'
import NuevoComponente from './components/NuevoComponent'

const data = [
  {
    mensaje: 'hola',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7NVhz2Rzu6jZRmQQfYG-Ueu5jhHhFh_CrGw&s',
    descripcion: "vamos"
  },
  {
    mensaje: 'como',
    imagen: 'https://concepto.de/wp-content/uploads/2021/07/caballos-e1626738224231.jpg',
    descripcion: "bien"
  },
  {
    mensaje: 'estas',
    imagen: 'https://www.zotal.com/wp-content/uploads/2019/08/razascaballos.png',
    descripcion: "okey"
  }
]

class Micomponente extends Component{
  constructor(props){
    super(props);
    this.state={
      mensaje: "hola",
      contador: 0
    }
  }

  componentDidMount() {
    console.log('El componente se monto en el DOM')
  }

  componentDidUpdate(){
    console.log('El componente se actualizo');
  }

  componentWillUnmount(){
    console.log('El componente se va a desmotar del DOM');
  }

  render(){
    return <h1>{this.state.mensaje} valor: {this.state.valor}, nombre: {this.props.nombre}</h1>
  }
}



function App() {
  const [saludo, setSaludo] = useState('hola todos')

  return(
    <>      
      <div className='container'>
        {data.map((elm) => (
          <NuevoComponente key={elm.descripcion} descripcion={elm.descripcion} imagen={elm.imagen} mensaje={elm.mensaje}/>
        ))}
      </div>
    </>
  )
}

export default App