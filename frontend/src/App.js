// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from './components/AllSpots/index'
import SpotDetail from "./components/SpotDetails";
// import { getSpotDetails } from "./store/spots";
import CreateSpotForm from "./components/CreateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // const spotDetails = useSelector(state => state.spotDetails)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            Home Page
            <SpotsBrowser></SpotsBrowser>
          </Route>
          <Route path={'/spots/:spotId'}>
            <SpotDetail />
          </Route>
          <Route path={'/spots'}>
            <CreateSpotForm/>
          </Route>
        </Switch>
      )}
      
    </>
  );
}

export default App;