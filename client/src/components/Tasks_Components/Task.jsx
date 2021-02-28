import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VisibilityIcon from '../../media/icons/visibility.svg';
import removeIcon from "../../media/icons/remove.svg"

export const Task =(props)=>{
    var status;
    const StatusHandler=(e)=>{
        status=e.target.value;
        console.log(status);
    }
    

    return(
        <div className="Task">
                <img className="DeleteIcon" src={removeIcon}/>
                <a href={`/calendar/${props.task_id}`}><img className="OpenIcon" src={VisibilityIcon}/></a>
                <div className="TaskContent">
                    {props.task_name}
                </div>
                <select className="StatusButton" onChange={StatusHandler}>
                    <option>Ongoing</option>
                    <option>Done</option>
                    <option>Failed</option>
                </select>
        </div>
    )
}