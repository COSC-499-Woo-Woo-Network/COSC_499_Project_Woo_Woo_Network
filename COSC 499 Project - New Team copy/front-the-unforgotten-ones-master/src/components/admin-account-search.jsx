import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
//can change this icon later on to our logo
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik';
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Link,
  CssBaseline,
  Box,
  makeStyles,
} from '@material-ui/core';
import SmallTextField from './comps/smlTextField';
import DefaultButton from './comps/defButton';
import PageTitle from './comps/pgTitle';
import Copyright from './copyright';
import globalStyles from './comps/globalStyling.module.css';

// /** This is the Yup schema for login credentials - it verifies if format is valid for email and password requirements */
const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Please enter an email address'),
  password: yup.string().required('A password is required'),
});

const { search } = window.location;
const query = new URLSearchParams(search).get('userName');

/** This is the theme for the items on this page - nav bar not included - STYLING here! */
const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    alignItems: 'center',
    height: '110vh',
  },
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(4, 3),
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

/** This is the Login Form - only the form */
const LoginForm = (props) => {
  const classes = useStyles();
  const {
    values: { email },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };


  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SmallTextField
            id="email"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            value={email}
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            onChange={change.bind(null, 'email')}
            // onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <DefaultButton
            type="submit"
            fullWidth
            // Button will be disabled if anything is wrong
            disabled={!isValid}
            style={{ margin: '24px 0 24px 0' }}
            contents="Sign In"
          />
        </Grid>
      </Grid>
    </form>
  );
};


{
  if (query == '' || query == null) {
    for (var i = 0; i < healers.length; i++) {
      if (healers[i].firstName.includes('')) {
        testHealer[i] = {
          firstName: healers[i].firstName,
          lastName: healers[i].lastName,
          description: healers[i].description,
          id: healers[i].id,
          location: healers[i].location,
        };
      }
    }
  } else {
    var query1 = query.toLowerCase();
    for (var i = 0; i < healers.length; i++) {
      if (
        healers[i].firstName.toLowerCase().includes(query1) ||
        healers[i].lastName.toLowerCase().includes(query1) ||
        healers[i].email.toLowerCase().includes(query1)
      ) {
        testHealer[i] = {
          firstName: healers[i].firstName,
          lastName: healers[i].lastName,
          description: healers[i].description,
          id: healers[i].id,
        };
      }
    }
  }
}

React.useEffect(() => {
  // Fetches the array of healers to show on screen.
  (async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_DOMAIN + '/healers'
      );
      if (!response.ok)
        throw Error(response.status + ': ' + response.statusText); // error checking, is the data okay?
      const data = await response.json(); // transform the data from string into JSON format.
      setHealers(() => data);
    } catch (Error) {
      console.log(Error);
    }
  })();
}, []);

 