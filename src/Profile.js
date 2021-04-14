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
        textDecoration: 'none',
        cursor: 'pointer'
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
    },
  }));

const Profile = (userData) => {
    const classes = useStyles();

    let history = useHistory();

    const location = useLocation();
    const individualUserIndex = location.state.userIndex;
    const individualUser = location.state.userInfo;
    
    {/* Set active index in state as index passed in as param from Home */}
    const [activeIndex, setActiveIndex] = useState(individualUserIndex)
    
    const nextUser = () => {
        {/*If highest user index, set activeIndex value to 0*/}
        if (activeIndex === userData.results.length -1){
            setActiveIndex(0)
        } else {
            setActiveIndex(activeIndex + 1)
        }
    }

    const prevUser = () => {
        {/*If first user index and we go back, sets activeIndex to highest user index*/}
        if (activeIndex === 0){
            setActiveIndex(userData.results.length -1)
        } else {
            setActiveIndex(activeIndex - 1);
        }
    }

    const setHomeClicked = () => {
        history.push('/')
    }

    console.log('what is this indivuser', individualUser)
    console.log('what is ACTIVE INDEX VALUE', activeIndex)
    console.log('USERDATA.LENGTH', userData.results.length)

    return (
        <Container className={classes.profileContainer} smaxWidth="lg">
            <h1 className={classes.homeLink} onClick={setHomeClicked}>Home</h1>
            <div className={classes.profileDiv}>
                <Card className={classes.profileCard}>
                    <CardContent>
                        <img 
                            className={classes.profilePageImage} 
                            src={userData.results[activeIndex].picture.large}
                        />
                        <p 
                            className={classes.profileNameTitle}>
                            {userData.results[activeIndex].name.title} {userData.results[activeIndex].name.first} {userData.results[activeIndex].name.last}
                        </p>
                        <p>
                            {userData.results[activeIndex].dob.age} year old {userData.results[activeIndex].gender}
                        </p>
                        <p className={classes.profileInfoTitle}>Address</p>
                        <p>
                            {userData.results[activeIndex].location.street.number} {userData.results[activeIndex].location.street.name}, 
                            {userData.results[activeIndex].location.city}
                        </p>
                        <p>
                            {userData.results[activeIndex].location.state}, {userData.results[activeIndex].location.country} {userData.results[activeIndex].location.postcode}
                        </p>
                        <p className={classes.profileInfoTitle}>Phone</p>
                        <p>{userData.results[activeIndex].phone}</p>
                        <p>Registered {`${userData.results[activeIndex].registered.age}`} years ago</p>

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
