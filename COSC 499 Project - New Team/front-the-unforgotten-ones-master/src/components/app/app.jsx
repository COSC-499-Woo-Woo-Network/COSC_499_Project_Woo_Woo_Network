import React, { useState } from 'react';
import './app.css';
import { useHistory } from 'react-router-dom';
import AuthSite from '../site-authorize';
import NoAuthSite from '../site-unauthorize';
import jwt_decode from 'jwt-decode';

/**  This is the base of it all. It holds on to who the user is (sorta, session storage does most of it)
     it has both the unauthorized and authorized sites in it (aka logged in and logged out versions)
     and it goes inside of index.jsx
 */

function App() {
  var [user, setUser] = useState(sessionStorage.getItem('token'));
  const [testuid, setuid] = useState([]);
  const history = useHistory(); // for moving you around the site.
  function fullLogout() {
    setUser(null); // removes the user saved in this hook.
    sessionStorage.removeItem('token'); // gets rid of your login token.
    history.push('/'); // brings you back to the home page.
  }

  if (user == null) {
    return <NoAuthSite />;
  } else if (user === undefined) {
    return <NoAuthSite />;
  } else if (user != null) {
    var a = jwt_decode(user);
    var data = {
      uid: a.user_id,
    };
    //grabbing userID
    (async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_DOMAIN + '/users/test/' + a.email
        );
        console.log(response);
        if (!response.ok)
          throw Error(response.status + ': ' + response.statusText);
        const data = await response.json();
        setuid(() => data.uid);
      } catch (Error) {
        console.log(Error);
      }
    })();
    //if new user, update userID to be consistent with firebase
    console.log(jwt_decode(user));
    console.log(testuid);
    if (testuid == 'temporary_test_uid') {
      console.log('here');
      const aToken = sessionStorage.getItem('token');
      (async () => {
        try {
          const response = await fetch(
            process.env.REACT_APP_API_DOMAIN + '/users/uid',
            {
              method: 'PATCH',
              mode: 'cors',
              headers: {
                Authorization: 'Bearer ' + aToken,
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify(data),
            }
          );
          console.log(response);
          //maybe I should make it test to see if the account actually gets made but... no time!
        } catch (error) {
          console.log('Fetch API error - PATCH' + error);
        }
      })();
    }
    if (jwt_decode(user).email_verified) {
      return <AuthSite logout={fullLogout} user={user} />; // This one renders if we have anything in the user hook.
    } else {
      return (
        <NoAuthSite
          text={'Please verify your email address before you can login.'}
        />
      );
    }
    // Maybe that's good enough? Feels like it should check if it's valid
  } else {
    console.log('A bad coder has broken this site');
  }
}
export default App;
