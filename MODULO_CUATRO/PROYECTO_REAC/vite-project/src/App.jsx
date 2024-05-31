import './App.css'
import Card from './components/Title';
import Image from './components/Image';
import Unknown from './assets/Unknown.jpg';
import Detail from './components/Detail/Detail';



function App() {

  return (
    <div className='container'>      
        <div className='text'>
        <Image url={Unknown}/>
        <Card titulo='Es un titulo..'/>
        <Detail genre='Accion' status='ok'/>
        </div>
    </div>    
  );
}

export default App;