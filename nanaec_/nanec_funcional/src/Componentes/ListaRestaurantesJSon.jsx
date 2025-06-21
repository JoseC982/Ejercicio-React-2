
import { useState } from "react"
import axios from 'axios';

function LstRestJSon() {

    const [restList, setRestList] = useState([]); //esto es una variable de estado
    const [clientList, setClientList] = useState([]); //esto es una variable de estado

    const showListRst = (e) => {
        axios.get('http://localhost:3001/Restaurantes').then(response => {
            setRestList(response.data)  //obtiene 
            console.log(response);
            console.log(response.data);
        })

    };
    const showListClient = (e) => {
        axios.get('http://localhost:3001/Clientes').then(response => {
            setClientList(response.data)  //obtiene 
            console.log(response);
            console.log(response.data);
        })

    };

    return (
        <div>
            <button onClick={showListRst}>Retornar Restaurantes</button>
            <ul className="App">
                {
                    restList.map((item, idx) => {
                        //devuelve una lista no ordenada por el ul, el key permite al navegador identificar cada elemento de la lista pero no se imprime.
                        return <li key={idx}>
                            {(item.nombre)}</li>
                    })
                }
            </ul>
            <button onClick={showListClient}>Retornar Clientes </button>
            <ul className="App">
                {
                    clientList.map((item, idx) => {
                        //devuelve una lista no ordenada por el ul, el key permite al navegador identificar cada elemento de la lista pero no se imprime.
                        return <li key={idx}>
                            {(item.nombre)}</li>
                    })
                }
            </ul>
        </div>
    );
}

export default LstRestJSon;
