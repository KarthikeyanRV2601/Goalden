import React from 'react';

export const Task =({TaskTitle})=>{
    var status;
    const StatusHandler=(e)=>{
        status=e.target.value;
        console.log(status);
    }
    return(
        <div className="Task">
                <img className="DeleteIcon" src="../media/icons/remove.svg"/>
                <a href="calendar.html"><img className="OpenIcon" src="../media/icons/visibility.svg"/></a>
                <div className="TaskContent">
                    {TaskTitle}
                </div>
                <select className="StatusButton" onChange={StatusHandler}>
                    <option>Done</option>
                    <option>Failed</option>
                </select>
        </div>
    )
}