import React, { useState } from 'react';
import Geocoder from 'react-native-geocoding';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { CssBaseline } from '@material-ui/core';
import DefaultButton from './comps/defButton';

//TO RUN THIS PAGE, YOU WILL LIKELY NEED TO INSTALL THE FOLLOWING NPM PACKAGES:
// npm install --save react-native-geocoding (need to geocode the location to lat/long coordinates for the map to work)
// npm i -S @react-google-maps/api

Geocoder.init('AIzaSyBLoF_U9lWDY7E6ED1tVXUEQgLv2ydvWI0');

const containerStyle = {
  width: '700px',
  height: '500px',
};

const center = {
  lat: 41.824,
  lng: -62.412,
};

//This function returns a list of healers with their id, and coordinates for the markers
function getInfo() {
  const [test, setTest] = useState([]);
  var markers = {};
  var size = 0;
  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_DOMAIN + '/healers/location'
        );

        if (!response.ok)
          throw Error(response.status + ': ' + response.statusText);
        const data = await response.json();
        console.log(data);
        data.slice(0, data.length).map((i) =>
          Geocoder.from(i.Location.postalCode)
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
              //console.log(size);
              //Depending on your seed data, you may need to play around with the if statement
              if (size > 52) {
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
  const [selectedHealer, setSelectedHealer] = useState(null); //This is used to track which marker has been clicked
  var b = []; //This variable will hold the data to be iterated over
  var a = getInfo();
  if (Object.keys(a).length != 0) {
    for (var i = 0; i < Object.keys(a).length; i++) {
      b[i] = a[Object.keys(a)[i]];
    }
    return (
      <>
        <LoadScript googleMapsApiKey="AIzaSyBLoF_U9lWDY7E6ED1tVXUEQgLv2ydvWI0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
          >
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
        </LoadScript>
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

const App = () => {
  return <Maps />;
};

function map() {
  return (
    <div>
      <CssBaseline />
      <Maps></Maps>
      <DefaultButton href="/home" contents="Back to Home" />
    </div>
  );
}
export default map;
