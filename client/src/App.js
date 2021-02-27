import React, { useEffect } from 'react';
import ReactDOM from'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {UserProfile} from './route/UserProfile';
import {AddTask} from './route/AddTask';
import {CalendarPage} from './route/Calendar';
import {Tasks} from './route/Tasks';
import {Friends} from './route/Friends';
import Feeds from './route/Feeds';
import {Login} from './route/Login';

import setAuthToken from './utils/setAuthToken';

import { loadUser } from './actions/auth';
// import { LOGOUT } from './actions/types';
//Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {

    useEffect(() => {
        // check for token in LS
        store.dispatch(loadUser());
    
        // log user out from all tabs if they log out in one tab
        // window.addEventListener('storage', () => {
        //   if (!localStorage.token) store.dispatch({ type: LOGOUT });
        // });
      }, []);

    return(
        <>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        {/* <Route exact path="/register" component={register}/> */}
                        <Route exact path = "/new_task" component = {AddTask} />
                        <Route exact path = "/calendar/:id" component = {CalendarPage} />
                        <Route exact path = "/feeds" component = {Feeds} />
                        <Route exact path = "/user_profile" component = {UserProfile} />
                        <Route exact path = "/friends" component = {Friends} />
                        <Route exact path = "/tasks" component = {Tasks} />
                    </Switch>
                </Router>
            </Provider>  
        </>
    )
}
export default App;