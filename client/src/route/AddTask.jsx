import React from 'react';
import ReactDOM from'react-dom';
import {NavBar} from '../components/NavBar';
import Form from '../components/AddTask_Components/Form';
import '../styles/AddTask.css';

export const AddTask=()=>{
    return(
        <div className="AddTaskPage">
            <NavBar/>
            <Form/>
        </div>
    )
}