import React from 'react';
import ReactDOM from'react-dom';
import { Friend } from '../components/Friends_Components/Friend';
import { NavBar } from '../components/NavBar';
import {SearchBar} from '../components/SearchBar';
import {ResultUser} from '../components/Friends_Components/ResultUser';
import '../styles/friends.css';

export const Friends=()=>{

    var FriendsList=[]
    var ResultUsersList=[]

    return(
        <div className="FriendsPage">
            <NavBar/>
            <div className="LeftPanel">
               <div className="Friends">
                    <Friend/>
                </div> 
            </div>
            <div className="RightPanel">
                <SearchBar/>
                <div className="SearchList">
                    <ResultUser/>
                </div>
            </div>
        </div>
        
    )
    
}


            // <div className="Feeds">
            // {UserFeeds.map(Feeditem =>(
            //         <Feed Feeditem={Feeditem}/>
            //         ))}
            // </div> 