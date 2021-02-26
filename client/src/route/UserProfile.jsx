import React from 'react';
import ReactDOM from'react-dom';
// import {Feed} from '../components/Feeds_Components/Feed';
import {NavBar} from '../components/NavBar';
import {ProfileContainer} from '../components/UserProfile_Components/ProfileContainer';
import '../styles/UserProfile.css';

export const UserProfile=()=>{

    var UserFeeds=[]


    return(
        <div className="UserProfilePage">   
            <NavBar/>
            <ProfileContainer/>
            <div className="Feeds">
                {/* <Feed/> */}
            </div> 
        </div>
    )
}


            


