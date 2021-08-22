import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
 
export const LogContext = createContext({});

export function LogContextProvider({ children }) {
  const [logs, setLog] = useState([]);

  useEffect( () => {

    async function teste(){
      
      const resposta = await axios.get('http://localhost:3333/logs');
         //console.log(resposta.data);
        setLog(resposta.data);
   }
   teste();

  }, []);


 console.log("Log Context . JS");
 console.log(logs);
  return (
    <LogContext.Provider value={ logs }>
      {children}
    </LogContext.Provider>
  )
}

