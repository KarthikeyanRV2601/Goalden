import React from 'react';
import ReactDOM from'react-dom';
import {App} from './App';
import {UserProfile} from './route/UserProfile';
import {AddTask} from './route/AddTask';
import {CalendarPage} from './route/Calendar';
import {Tasks} from './route/Tasks';
import {Friends} from './route/Friends';
import {Feeds} from './route/Feeds';
import {Route} from 'react-router';
import {BrowserRouter as Router } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render((
    <Provider store={store}>

        <Router>
                <Route exact path="/" component={App}/>
                <Route exact path = "/add-task" component = {AddTask} />
                <Route exact path = "/calendar-page" component = {CalendarPage} />
                <Route exact path = "/feeds" component = {Feeds} />
                <Route exact path = "/user-profile" component = {UserProfile} />
                <Route exact path = "/friends" component = {Friends} />
                <Route exact path = "/tasks" component = {Tasks} />
        </Router>
    </Provider>    
 ),document.querySelector('#root'));
