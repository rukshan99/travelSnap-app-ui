import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from './users/pages/Users';
import SignIn from './users/pages/SignIn';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/newPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = useCallback(() => {
    setIsSignedIn(true);
  }, []);
  const signOut = useCallback(() => {
    setIsSignedIn(false);
  }, []);

  return ( 
    <AuthContext.Provider vlaue={{isSignedIn: isSignedIn, signIn: signIn, signOut: signOut}}>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/auth">
              <SignIn />
            </Route>
            <Route path="/:userId/places">
              <UserPlaces />
            </Route>
            <Route path="/places/new" exact>
              <NewPlace />
            </Route>
            <Route path="/places/:placeId" exact>
              <UpdatePlace />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
