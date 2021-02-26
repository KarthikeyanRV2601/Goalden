import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({Component,...rest}) => (
    <Route {...rest} render={<Component/>}/>
);