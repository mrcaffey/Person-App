import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    profileContainer: {
      textAlign: 'center',
      height: '100vh'
    },
    homeLink: {
        textDecoration: 'none'
    },
    profileDiv: {
        position: 'absolute',
        top: '15%',
        left: 0,
        right: 0,
        margin: 'auto'
    },
    profilePageImage: {
        borderRadius: '100px',
        height: '200px'
    },
    profileCard: {
        top: '25%',
        left: 0,
        right: 0,
        margin: 'auto',
        width: '50%'
    },
    profileNameTitle: {
        fontSize: '30px',
        fontWeight: 'bold'
    },
    profileInfoTitle: {
        fontSize: '18px',
        fontWeight: 'bold'
    }
  }));

const Profile = (userData) => {
    const classes = useStyles();

    let history = useHistory();

    const location = useLocation();
    const individualUser = location.state.params;
    
    const [allUsers, setAllUsers] = useState([]);
    const [nextUserProfile, setNextUserProfile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0)
    
    
    const nextUser = () => {
        // find current user in userData arr, then set profile to next user in arr
        setNextUserProfile(true)
        setActiveIndex(activeIndex + 1)
    }

    const prevUser = () => {
        setNextUserProfile(true)
        if (activeIndex === 0){
            setActiveIndex(userData.results.length -1)
        } else {
            setActiveIndex(activeIndex - 1);
        }
        console.log('whats current index', activeIndex)
    }

    const navigateHome = () => {
        history.push('/')
    }

    useEffect(() => {
        setAllUsers(userData);
        console.log('USERDATA', userData)
    })


    return (
        <Container className={classes.profileContainer} smaxWidth="lg">
            <h1><a href="/" className={classes.homeLink}>Home</a></h1>
            <div className={classes.profileDiv}>
                <Card className={classes.profileCard}>
                    <CardContent>
                        {nextUserProfile === true ? 
                            <>
                                <img className={classes.profilePageImage} src={userData.results[activeIndex].picture.large}/>
                                <p className={classes.profileNameTitle}>{userData.results[activeIndex].name.title} {userData.results[activeIndex].name.first} {userData.results[activeIndex].name.last}</p>
                                <p>{userData.results[activeIndex].dob.age} year old {userData.results[activeIndex].gender}</p>
                                <p className={classes.profileInfoTitle}>Address</p>
                                <p>
                                    {userData.results[activeIndex].location.street.number} {userData.results[activeIndex].location.street.name}, {userData.results[activeIndex].location.city}
                                </p>
                                <p>
                                    {userData.results[activeIndex].location.state}, {userData.results[activeIndex].location.country} {userData.results[activeIndex].location.postcode}
                                </p>
                                <p className={classes.profileInfoTitle}>Phone</p>
                                <p>{userData.results[activeIndex].phone}</p>
                                <p>Registered {`${userData.results[activeIndex].registered.age}`} years ago</p>
                            </>
                            :
                            <>
                                <img className={classes.profilePageImage} src={individualUser.picture.large}/>
                                <p className={classes.profileNameTitle}>{individualUser.name.title} {individualUser.name.first} {individualUser.name.last}</p>
                                <p>{individualUser.dob.age} year old {individualUser.gender}</p>
                                <p className={classes.profileInfoTitle}>Address</p>
                                <p>
                                    {individualUser.location.street.number} {individualUser.location.street.name}, {individualUser.location.city}
                                </p>
                                <p>
                                    {individualUser.location.state}, {individualUser.location.country} {individualUser.location.postcode}
                                </p>
                                <p className={classes.profileInfoTitle}>Phone</p>
                                <p>{individualUser.phone}</p>
                                <p>Registered {individualUser.registered.age} years ago</p>
                            </>
                        }
                        <div style={{ paddingBottom: '20px'}}>
                            <Button variant="contained" color="primary" style={{ float: 'left'}} onClick={() => prevUser()}>
                                Previous
                            </Button>
                            <Button variant="contained" color="primary" style={{ float: 'right'}} onClick={() => nextUser()}>
                                Next
                            </Button>
                        </div>
                    </CardContent>    
                </Card>
            </div>
        </Container>
    )
}

export default Profile;
