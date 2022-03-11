import './App.css';
import axios from "axios"
import { useState, useEffect } from "react";


function App() {
  
  const [data, setData] = useState({});
  const [temp, setTemp] = useState(0);
  const [isF, setIsF] = useState(true);

  const success = pos =>{
    console.log(pos.coords)
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    console.log(latitude + "sdjnskjd");
    console.log(longitude);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c69f80b60b9acd96b7f5c7cc46c5dda8`).then((res) => 
    {
      setData(res.data);
      setTemp(res.data.main.temp);

    
    });
  
    
  };
  
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    }, []);

  

 console.log(data);
  
  const convertTemp = () => {
    if (isF) {
      setTemp((temp-32)*(5/9));
      setIsF(false);
    } else {
      setTemp((temp * 9/5)+32);
      setIsF(true);
    }
  };

  

  return (
    <div className="App" >
      <div className='Contenido'>
        <h1>Weather app</h1>
        <div className='lugar'>
          <h3>{data.sys?.country}</h3>
          <p>{data.name}</p>
        </div>
        
        <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="Weather Icon" className='imagen'/>
        <p id='abajo'>Temperature: {temp.toFixed(1)}  {isF ? "Fahrenheit" : "Celsius"}</p>
        <p>{data.weather?.[0].description}</p>
        <p>Humidity: {data.main?.humidity}%</p>
        <button onClick={convertTemp}>Fahrenheit/Celsius</button>

      </div>

     
      
    </div>
  );
}

export default App;
/*Desarrolla una aplicación que muestre datos del clima, obteniendo de la API los siguientes datos: país,
 ciudad, icono que describa el clima, la temperatura en grados centígrados, y un botón que cambie la temperatura a
  grados Fahrenheit. Adicionalmente, puedes colocar información extra que venga en la API.*/ 