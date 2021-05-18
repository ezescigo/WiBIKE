import React, { useContext, useState, useEffect, useRef } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { ActivityIndicator, Colors, Button } from 'react-native-paper';

import styled from 'styled-components/native';
import MapView from 'react-native-maps';

import { Search } from '../components/search.component';

import { LocationContext } from '../../../services/location/location.context';
import { StoresContext } from '../../../services/stores/stores.context';

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = () => {
  const mapRef = useRef();
  const [ errorMsg, setErrorMsg ] = useState(null);
  const { stores = [] } = useContext(StoresContext);
  const { isLoading, loc, requestPermissions } = useContext(LocationContext);

  const [ latDelta, setLatDelta ] = useState(0);
  // const { lat, lng, viewport } = location;

  useEffect(() => {
    requestPermissions()
  }, []);

  useEffect(() => {
    console.log('effect loc', loc)
  }, [ loc ]);

  // useEffect(() => {
  //   const northeastLat = viewport.northeast.lat;
  //   const southwestLat = viewport.southwest.lat;

  //   setLatDelta(northeastLat - southwestLat);
  // }, [ location, viewport ]);

  console.log('location from context', loc);

  // useEffect(() => {
  //   const region = getRegionForCoordinates(
  //     userLocation.coords.latitude,
  //     userLocation.coords.longitude,
  //     userLocation.coords.accuracy
  //   );
  //   console.log('region', region);
  //   setLatDelta(region.latitudeDelta);
  // }, [ userLocation ]);

  return (
    <>
      <Search />
      {isLoading && <ActivityIndicator animating={ true } color={ Colors.blue300 } /> }
      {loc &&
        <>
          <Map
            ref={ map => mapRef.current = map }
            region={ {
              latitude: loc.lat,
              longitude: loc.lng,
              latitudeDelta: loc.latitudeDelta,
              longitudeDelta: 0.01,
            } }
            showsUserLocation
          >
          </Map>
          <Button onPress={ () => map.animateToRegion() }></Button>
        </>
      }
    </>
  )
};

//
// Also don't forget to include permissions in AndroidManifest.xml
// <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />