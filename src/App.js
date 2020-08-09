import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';
import PropTypes from 'prop-types';

function App() {
  //state del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });  

  const [consultar, guardarConsultar]= useState(false);

  const [resultado, guardarResultado] = useState({});

  const [error, guardarError] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(()=>{

    const consultarApi = async () => {
      if(consultar){
        const appId = '1ebd343f7bc023b0b5cb0eb220c223ee'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
      
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        //detecta si hubo resultados correctos en la busqueda
        if(resultado.cod === "404"){
          guardarError(true);
        }else{
          guardarError(false);
        }
      
      }
    }
    consultarApi()
    // eslint-disable-next-line
  }, [consultar]);

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados"/>
  }else{
    componente = <Clima
                    resultado={resultado}
                  />
  }

  return (
    <Fragment>

      <Header
        titulo="Clima React App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="Row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
                {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired
}

export default App;
