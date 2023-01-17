// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from './components/AllSpots/index'
import SpotDetail from "./components/SpotDetails";
// import { getSpotDetails } from "./store/spots";
import CreateSpotForm from "./components/CreateSpotForm";
import UpdateSpotFormPage from "./components/UpdateSpot";
import CreateReviewForm from "./components/CreateReviewForm";
import GetCurrentUser from "./components/GetCurrentUser";
import Footer from "./components/Footer/Footer";

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
            <SpotsBrowser/>
            <Footer/>
          </Route>
          <Route exact path={'/spots/new'}>
            <CreateSpotForm />
          </Route>
          <Route exact path={'/spots/update/:spotId'}>
            <UpdateSpotFormPage />
          </Route>
          <Route exact path={'/spots/:spotId'}>
            <SpotDetail />
          </Route>
          <Route path={'/spots/:spotId/new-review'}>
            <CreateReviewForm/>
          </Route>
          <Route path={'/users/my-account/'}>
            <GetCurrentUser/>
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;