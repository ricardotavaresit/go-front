import React, { createContext, useEffect, useMemo, useState } from 'react';
import palette from 'theme/palette';
import api from './../services/api';
import { useLog } from 'hooks/useLog';

const defaultGraphicData = {
  labels: [],
  datasets: [
    {
      label: 'Temperatura',
      backgroundColor: palette.secondary.main,
      data: []
    }
  ],
}


export const CityContext = createContext({});

export function CityContextProvider({ children }) {
  const [citiesId, setCitiesId] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const { addLog } = useLog();


  useEffect(() => {
    if (citiesId.length > 0) {
      const cityValues = citiesId.toString();

      const API_URL = `/weather/${cityValues}`;

      api.get(API_URL, {

      }).then(resposta => {
        setCitiesData(resposta.data);

        resposta.data.map(data => {

          api.post('/logs', {
            cities: data.local
          }).then(response => addLog(response.data))

        })


      })



    }
    else {
      setCitiesData([]);
    }
  }, [citiesId]);

  function addCity(cities) {
    setCitiesId(cities)
  }

  useMemo(() => {

    if (citiesData.length > 0 || !citiesData.length > 0) {

      let citiesLabel = [];
      let citiesValues = [];

      citiesData.map(data => {
        citiesLabel.push(data.local)
        citiesValues.push(Number(data.data.tMax))
      });

      const newGraphicData = {
        labels: citiesLabel,
        datasets: [
          {
            label: 'Temperatura',
            backgroundColor: palette.secondary.main,
            data: citiesValues
          }
        ]
      }

      setGraphicData(newGraphicData);
    } else {
      setGraphicData(defaultGraphicData);
    }
  }, [citiesData]);

  return (
    <CityContext.Provider value={{ citiesId, citiesData, graphicData, addCity }}>
      {children}
    </CityContext.Provider>
  )
}

