import React from 'react';
import ReactDOM from'react-dom';
import {CalendarComp} from '../components/Calendar_Components/Calendar';
import '../styles/calendar.css';
import {NavBar} from '../components/NavBar';

export const CalendarPage=(props)=>{

    console.log(props.match.params.id)
    return(
        <div className="CalendarPage">
            <NavBar/>
            <CalendarComp tid={props.match.params.id}/>
            
        </div>
    )
}