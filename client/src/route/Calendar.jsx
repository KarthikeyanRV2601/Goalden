import React from 'react';
import ReactDOM from'react-dom';
import {Calendar} from '../components/Calendar_Components/Calendar';
import {Information} from '../components/Calendar_Components/Information';
import {Uploader} from '../components/Calendar_Components/Uploader';
import '../styles/calendar.css';

export const CalendarPage=()=>{
    return(
        <div className="Calendar">
            <Calendar/>
            <Information/>
            <Uploader/>
        </div>
    )
}