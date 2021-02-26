import React from 'react';
import ReactDOM from'react-dom';
import Form from '../components/LoginPage_Components/Form';
import {IllustrationContainer} from '../components/LoginPage_Components/Illustration';
import '../styles/Login.css';
export const Login=()=>{
    return(
        <div className="LoginPage">
            <Form/>
            <IllustrationContainer/>
        </div>
    )
}