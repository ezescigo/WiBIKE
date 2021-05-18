import { mocks, mockImages } from '../stores/mock/index';
import camelize from 'camelize';

export const storesRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[ location ];
    if (!mock) {
      reject('not found')
    }
    resolve(mock);
  })
};

export const storesTransform = ({ results = [] }) => {
  const mappedResults = results.map((store) => {
    store.photos = store.photos.map((p) => {
      return mockImages[ Math.ceil(Math.random() * (mockImages.length - 1)) ]
    });
    return {
      ...store,
      address: store.vicinity,
      isOpenNow: store.opening_hours && store.opening_hours.open_now,
      isClosedTemporarily: store.business_status === 'CLOSED_TEMPORARILY',
    };
  });
  // newResult.someExtraProperty = 'new'
  return camelize(mappedResults);
};