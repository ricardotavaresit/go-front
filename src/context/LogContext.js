import moment from 'moment';
import React, { createContext, useEffect, useState } from 'react';
import api from './../services/api';

export const LogContext = createContext({});

export function LogContextProvider({ children }) {
  const [logs, setLog] = useState([]);
  const [loading, setLoading] = useState(true);

  function FormatDate(date) {

    const formattedDate = moment(date).format('DD-MM-YYYY HH:mm:ss');

    return formattedDate
  }


  useEffect(() => {

    async function teste() {

      const resposta = await api.get('/logs');

      const formatedData = resposta.data.map(element => {

        const formattedCreatedAtData = FormatDate(element.createdAt)

        return {
          ...element,
          formattedCreatedAtData
        }

      })

      setLoading(false);
      setLog(formatedData);
    }

    teste();

  }, []);


  function addLog(log) {
    const formattedCreatedAtData = FormatDate(log.createdAt)

    const formattedData = {
      ...log,
      formattedCreatedAtData
    }

    setLog([...logs, formattedData]);
  }

  return (
    <LogContext.Provider value={{ logs, loading, addLog }}>
      {children}
    </LogContext.Provider>
  )
}

