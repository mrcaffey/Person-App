import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      border: '1px solid green',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    homePageGridCard: {
      minWidth: '800px'
    },
    homePageProfileImage: {
        display: 'block',
        margin: 'auto',
        borderRadius: '100px',
        width: 'fit-content'
    },
    homePageNameTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    homePageInfoTitle: {
        fontSize: '18px',
        fontWeight: 'bold'
    }
  }));

const Home = (userData) => {
    const classes = useStyles();

    let history = useHistory();

    const setProfileClicked = (user, index) => {
        console.log('whats index', index)
        let selectedUser = user;
        let selectedUserIndex = index;
        history.push({
            pathname: '/profile',
            state: {
                userInfo: selectedUser,
                userIndex: selectedUserIndex
            }
        })
    }

    return (
        <Container maxWidth="lg">
            <h1>Person App</h1>
            <Grid className={classes.homePageGridCard} container spacing={3}>
            {userData.results.map((user, index) => (
                <Grid key={user.id} item xs={4} onClick={() => { setProfileClicked(user, index)}}>
                    <Paper className={classes.paper}>
                        <img className={classes.homePageProfileImage} src={user.picture.large}/>
                        <p className={classes.homePageNameTitle}>{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
                        <p className={classes.homePageInfoTitle}>Phone</p>
                        <p>{user.phone}</p>
                    </Paper>
                </Grid>
            ))}
            </Grid>
        </Container>
    )

}

export default Home;