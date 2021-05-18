import React, { useState, useEffect, createContext, useMemo, useContext } from 'react';
import { LocationContext } from '../location/location.context';

import { storesRequest, storesTransform } from '../stores/stores.service';

export const StoresContext = createContext();

export const StoresContextProvider = ({ children }) => {
  const [ stores, setStores ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const { loc } = useContext(LocationContext);

  const retrieveStores = (loc) => {
    setIsLoading(true);
    setStores([]);

    setTimeout(() => {
      storesRequest(loc)
        .then(storesTransform)
        .then((results) => {
          setIsLoading(false);
          setStores(results);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        })
    }, 2000);
  };

  useEffect(() => {
    if (loc) {
      const locationString = `${loc.lat},${loc.lng}`;
      retrieveStores(locationString);
    }

  }, [ loc ]);

  return (
    <StoresContext.Provider
      value={ {
        stores,
        isLoading,
        error,
      } }>
      {children }
    </StoresContext.Provider>
  )
}