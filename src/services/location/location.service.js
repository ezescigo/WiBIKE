import camelize from 'camelize';
import * as Location from 'expo-location';

import { locations } from './location.mock';

import { getRegionForCoordinates } from './region.utils';

export const locationRequest = (searchTerm) => {
  return new Promise((resolve, reject) => {
    const locationMock = locations[ searchTerm ];
    if (!locationMock) {
      reject("not found");
    }
    resolve(locationMock);
  });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[ 0 ];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};

export const getUserLocation = async () => {
  let uLocation = await Location.getLastKnownPositionAsync({});
  console.log('uLocation', uLocation);
  return uLocation;
};

export const userLocationTransform = (result) => {
  console.log('result in userlocationtransform: ', result);
  const { latitude, longitude, accuracy } = result.coords;
  const { latitudeDelta } = getRegionForCoordinates(latitude, longitude, accuracy);

  return { lat: latitude, lng: longitude, accuracy, latitudeDelta };
}