import React from 'react';
import ReactDOM from'react-dom';
import AddIcon from "../media/icons/add.svg";
import NotificationIcon from "../media/icons/notification.svg";
import ProfileIcon from "../media/icons/profile.svg";



export const NavBar=()=>{
    return(
        <header>
            <ul className="Links">
            <a href="/feeds" className="Link">
                Feeds
            </a>
            <a href="friends.html" className="Link">
                Friends
            </a>
            <a href="/tasks" className="Link">
                Tasks
            </a>
        </ul>
            <div className="ProfileLinks">
                <div className="WrapperDiv">
                <a href="/new_task"><img className="AddButtonIcon" src={AddIcon}/></a>
                <a><img className="NotificationIcon" src={NotificationIcon}/></a>
                <a><img className="ProfileIcon" src={ProfileIcon}/></a>
            </div>
            </div>
        </header>
    )
}