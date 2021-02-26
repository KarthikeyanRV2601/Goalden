import React from 'react';
import ReactDOM from'react-dom';
import {Feed} from '../components/Feeds_Components/Feed';
import {NavBar} from '../components/NavBar';
import {Profile} from '../components/Feeds_Components/Profile';
import '../styles/feeds.css';
export const Feeds=()=>{
    return(
        <div className="FeedPage">
            <NavBar/>
            <div className="LeftPanel">
                <Profile/>
            </div>
            <div className="MainPanel">
                <div className="Feeds">
                    <Feed/>
                    <Feed/>//feeds goes here
                </div>
            </div>
            <div className="RightPanel">
                
            </div>
            
        </div>
    )
}