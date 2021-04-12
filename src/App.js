import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import axios from 'axios';

function App() {

  const [userData, setUserData] = useState({ results: [] })

  useEffect(() => {
      const fetchData = async () => {
          const results = await axios(
              'https://randomuser.me/api/?results=10'
          )
          setUserData(results.data);
      };

      fetchData();
  },[]);

  return (
    <div>
      <Router>
        <Route exact path="/" render={() => (<Home {...userData}/>)}/>
        <Route path="/profile" render={() => (<Profile {...userData}/>)}/>
      </Router>
    </div>
  );
}

export default App;
