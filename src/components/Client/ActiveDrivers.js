import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Websocket from '../../websocket/Websocket';

// const ROOT_URL = 'http:/localhost:3000';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function ActiveDrivers() {
  const classes = useStyles();
  const [activeDrivers, setActiveDrivers] = useState([]);

  const handleBroadcast = ({ type, user }) => {
    switch (type) {
      case 'login':
        setActiveDrivers((prev) => [...prev, user]);
        break;
      case 'logout':
        setActiveDrivers((prev) => prev.filter(({ id }) => id !== user.id));
        break;
      default:
        console.log('what a f*ck');
    }
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/drivers/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((drivers) => setActiveDrivers(drivers));
  }, []);

  return (
    <>
      <Websocket
        callback={handleBroadcast}
      />
      <List className={classes.root}>
        {activeDrivers.map(({ id, first_name: firstName }) => (
          <ListItem alignItems="flex-start" key={id}>
            <ListItemAvatar>
              <p>{firstName.slice(0, 1)}</p>
            </ListItemAvatar>
            <ListItemText
              primary={firstName}
              secondary={(
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    ID:
                    {id}
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </>
              )}
            />
          </ListItem>

        ))}
      </List>
    </>
  );
}
