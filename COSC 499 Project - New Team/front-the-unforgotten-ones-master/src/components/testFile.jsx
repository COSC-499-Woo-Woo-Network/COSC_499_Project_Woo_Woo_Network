import React, { useState, Suspense } from 'react';
import Geocoder from 'react-native-geocoding';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { CssBaseline } from '@material-ui/core';
import DefaultButton from './comps/defButton';

Geocoder.init('AIzaSyBLoF_U9lWDY7E6ED1tVXUEQgLv2ydvWI0');

const containerStyle = {
  width: '500px',
  height: '500px',
};

const center = {
  lat: 41.824,
  lng: -71.412,
};

function sleep(s) {
  var currentTime = new Date().getTime();
  while (currentTime + s >= new Date().getTime()) {}
}

function getInfo() {
  const [test, setTest] = useState([]);
  var markers = {};
  var size = 0;
  React.useEffect(() => {
    // Fetches the array of healers to show on screen.
    (async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_DOMAIN + '/healers/location'
        );

        if (!response.ok)
          throw Error(response.status + ': ' + response.statusText); // error checking, is the data okay?
        const data = await response.json(); // transform the data from string into JSON format.
        console.log(data.length);
        data.slice(0, data.length).map((i) =>
          Geocoder.from(i.Location.city)
            .then((json) => {
              var result = json.results;
              var fname = i.firstName;
              var lname = i.lastName;
              var uid = i.account.id;
              var lat = result[0].geometry.location.lat;
              var long = result[0].geometry.location.lng;

              var marker = {
                id: uid,
                firstName: fname,
                lastName: lname,
                latitude: lat,
                longitude: long,
              };
              markers[fname] = marker;
              size = Object.keys(markers).length;
              console.log(size);
              if (size > data.length - 1) {
                setTest(() => markers);
              }
            })
            .catch((error) => console.warn(error))
        );
      } catch (Error) {
        console.log(Error);
      }
    })();
  }, []);
  return test;
}

const Maps = () => {
  const [selectedHealer, setSelectedHealer] = useState(null);
  var b = [];
  var a = getInfo();
  if (Object.keys(a).length != 0) {
    for (var i = 0; i < Object.keys(a).length; i++) {
      b[i] = a[Object.keys(a)[i]];
    }
    return (
      <>
        <LoadScript googleMapsApiKey="AIzaSyBLoF_U9lWDY7E6ED1tVXUEQgLv2ydvWI0"></LoadScript>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
          {console.log(b)}
          {b.map((i) => (
            <Marker
              key={i.id}
              position={{ lat: i.latitude, lng: i.longitude }}
              onClick={() => {
                setSelectedHealer(i);
              }}
            />
          ))}
          {selectedHealer && (
            <InfoWindow
              position={{
                lat: selectedHealer.latitude,
                lng: selectedHealer.longitude,
              }}
              onCloseClick={() => {
                setSelectedHealer(null);
              }}
            >
              <div>
                <DefaultButton
                  href={'/healers/' + selectedHealer.id}
                  contents={
                    selectedHealer.firstName + ' ' + selectedHealer.lastName
                  }
                />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

const App = () => {
  return <Maps />;
};

function testFile() {
  const [location, setLocation] = useState([]);

  return (
    <div>
      <CssBaseline />
      <Maps></Maps>
    </div>
  );
}
export default testFile;
