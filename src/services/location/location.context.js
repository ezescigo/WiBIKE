import React, { useState, useEffect, createContext } from 'react';
import * as Location from 'expo-location';

import {
  locationRequest,
  locationTransform,
  getUserLocation,
  userLocationTransform
} from './location.service';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [ hasPermission, setHasPermission ] = useState(false);
  const [ userLocation, setUserLocation ] = useState(null);
  const [ keyword, setKeyword ] = useState("");
  const [ loc, setLocation ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  const onRequestPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location denied by user.');
      return;
    };
    setHasPermission(status);
  };

  useEffect(() => {
    console.log('permissions: ', hasPermission);
    if (hasPermission === 'granted') {
      setIsLoading(true);
      getUserLocation()
        .then(userLocationTransform)
        .then((result) => {
          setIsLoading(false);
          setLocation(result);
        })
        .catch((er) => console.log(er))
    };
  }, [ hasPermission ]);

  useEffect(() => {
    if (!keyword.length) {
      return;
    }
    console.log('running keyword effect');
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      }).catch((err) => {
        setIsLoading(false);
        setError(err);
      })
  }, [ keyword ])


  return (
    <LocationContext.Provider
      value={ {
        requestPermissions: onRequestPermissions,
        loc,
        isLoading,
        error,
        search: onSearch,
        keyword,
      } }
    >
      {children }
    </LocationContext.Provider>
  )
};