import React, { useState } from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {
  Grid,
  Paper,
  Button,
  Typography,
  Box,
  CssBaseline,
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  useMediaQuery,
} from '@material-ui/core';
//import jwt_decode from 'jwt-decode';
import globalStyles from './comps/globalStyling.module.css';
import DefaultButton from './comps/defButton';
import Copyright from './copyright.jsx';
import MoreButton from './comps/moreButton';
import PageTitle from './comps/pgTitle';
import SmallClearButton from './comps/smlClearButton';
import { isFirstDayOfMonth } from 'date-fns/esm';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 12,
    [theme.breakpoints.up('md')]: {
      fontSize: 20,
    },
  },
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  container: {
    margin: theme.spacing(12, 0),
    display: 'flex',
    position: 'relative',
    padding: theme.spacing(0),
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },

  flavorImage: {
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 700,
    padding: theme.spacing(4, 0),
  },
  flavorContents: {
    width: '700px',
    '@media (max-width: 700px)': {
      width: '100%',
    },
    backgroundColor: fade('#ffffff', 0.5),
    margin: 'auto',
    boxShadow: '0 3px 9px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(4, 2),
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
  },
  healersButton: {
    backgroundColor: '#cefa3e',
    color: '#343434',
    '&:hover': {
      backgroundColor: '#faeb3e',
    },
    padding: theme.spacing(1, 8),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '48px',
    width: '100%',
  },
  centerVertical: {
    position: 'relative',
  },
  healerImage: {
    borderRadius: '50%',
    marginRight: theme.spacing(2),
    width: '64px',
    minWidth: '64px',
    height: '64px',
  },
}));

const TagSet = (props) => {
  const classes = useStyles();

  return (
    <Box className={`${classes.Box} ${globalStyles.tagContainer}`}>
      <Tag tagName="Loss" />
      <Tag tagName="Anger" />
    </Box>
  );
};

const Tag = (props) => {
  const classes = useStyles();

  return (
    <Paper className={`${classes.Box} ${globalStyles.tagItem}`}>
      <Box className={`${classes.Box} ${globalStyles.centerItems}`}>
        <Typography variant="caption">{props.tagName}</Typography>
      </Box>
    </Paper>
  );
};

/** 
 This is the home page. It holds the description of the site, some tasteful images to spice it up a bit,
 and a list of all the healers who have made accounts.
 Ideally I'd like to randomize the order of the healers on this page so it's not the first few who signed up every time.
 But that will only be necessary once there are a lot more signed up.
 alternately, use some more sophisticated way of searching for healers, like a search function or something.
 This way works as a showcase though.
 Maybe there could be a more detailed paragraph describing the site here too.
*/

function SignUp2() {
  const classes = useStyles();
  const [healers, setHealers] = useState([]);

  const LIMIT_MOBILE = 4;
  const LIMIT_WEB = 100;

  const isMobile = useMediaQuery('500');
  const inititalLimit = isMobile ? LIMIT_MOBILE : LIMIT_WEB;

  const [limit, setLimit] = useState(inititalLimit);
  const showMoreDocuments = () => {
    setLimit(limit + 4);
  };
  function Healer({
    // this doohickey holds healer data. This is the object we plop the data into.
    healerName,
    healerDesc,
    userid,
    healerImage,
    healerBrand,
  }) {
    const limit = 60;
    var healerDescriptionToShow = healerDesc;
    if (healerDesc == null) {
      healerDescriptionToShow =
        'Check the profile for more information about this healer.';
    } else if (healerDesc.length > limit) {
      healerDescriptionToShow = healerDesc.substring(0, limit) + '...';
    }

    if (healerBrand == null) {
      healerBrand = 'Brand Name';
    }

    return (
      <Grid item xs={10} sm={12}>
        <Card className={`${classes.Card} ${globalStyles.cardPaper}`}>
          <CardActionArea>
            <CardContent>
              <Box textAlign="center" marginTop="8px">
                <Typography variant="h6" component="p">
                  Name: {healerName}
                </Typography>
                {/*<TagSet />*/}
              </Box>
              <Box textAlign="center" marginTop="8px">
                <Typography variant="body2" color="textSecondary" component="p">
                  Brand: {healerBrand}
                </Typography>
                {/*<TagSet />*/}
              </Box>
              <Box textAlign="center" marginTop="8px">
                <Typography variant="body2" color="textSecondary" component="p">
                  User ID: {userid}
                </Typography>
                {/*<TagSet />*/}
              </Box>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <SmallClearButton
              href={'/healers/' + userid}
              contents="Learn More"
            />
            <SmallClearButton href={'/account-search'} contents="Delete User" />
          </CardActions>
        </Card>
      </Grid>
    );
  }

  let testHealer = [];

  const Search = () => {
    return (
      <form action="/account-search" method="get">
        <label htmlFor="header-search">
          <span className="visually-hidden">
            Search Users By Name or User ID:
          </span>
        </label>
        <input
          type="text"
          id="header-search"
          placeholder="Empty Search to Clear"
          name="input"
        />
        <br></br>
        <br></br>
        <button type="submit">Search</button>
      </form>
    );
  };

  const App = () => {
    return <Search />;
  };

  const { search } = window.location;
  const query = new URLSearchParams(search).get('input');
  {
    if (query == '' || query == null) {
      for (var i = 0; i < healers.length; i++) {
        if (healers[i].firstName.includes('')) {
          testHealer[i] = {
            firstName: healers[i].firstName,
            lastName: healers[i].lastName,
            description: healers[i].description,
            id: healers[i].id,
          };
        }
      }
    } else {
      var query1 = query.toLowerCase();
      for (var i = 0; i < healers.length; i++) {
        if (
          healers[i].firstName.toLowerCase().includes(query1) ||
          healers[i].lastName.toLowerCase().includes(query1) ||
          healers[i].id == query1
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

  return (
    <div style={{ textAlign: 'center' }}>
      <CssBaseline />
      {/* WANT TO SIGN UP SECTION */}
      {/* healers info */}
      <Paper className={`${classes.Paper} ${globalStyles.defPgContainer}`}>
        <PageTitle contents="Search Accounts" />
        <Search></Search>
        <br></br>
        {/* <Container className={classes.container}> */}
        <Grid container spacing={3}>
          {/* MAPPING             */}
          {testHealer.slice(0, limit).map((testHealer, i) => (
            <Healer
              healerName={testHealer.firstName + ' ' + testHealer.lastName}
              healerDesc={testHealer.description}
              key={testHealer + i}
              userid={testHealer.id}
              healerImage={testHealer.photo}
            />
          ))}
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <Paper className={`${classes.Paper} ${globalStyles.cardPaper}`}>
                  <MoreButton onClick={showMoreDocuments} />
                </Paper>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Copyright />
    </div>
  );
}
export default SignUp2;
