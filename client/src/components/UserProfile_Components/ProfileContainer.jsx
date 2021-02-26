import React from 'react';
import ReactDOM from'react-dom';
import man from '../../media/images/man1.jpg'


export const ProfileContainer=()=>{
    return(
        <div className="ProfileContainer">
            <div className="ProfilePic">
                <img src={man}/>
            </div>
            <div className="ProfileDetails">
                <div id="Coins" className="Asset">
                    <div className="Label">
                        Coins
                    </div>
                    <div className="Value">
                        1289
                    </div>
                </div>
                <div id="Rank" className="Asset">
                    <div className="Label">
                        Rank
                    </div>
                    <div className="Value">
                        GOD
                    </div>
                </div>
                <div id="Streaks" className="Asset">
                    <div className="Label">
                        Longest streak
                    </div>
                    <div className="Value">
                        198 days &#128293
                    </div>
                </div>
                <div id="TasksCompleted" className="Asset">
                    <div className="Label">
                        Tasks completed
                    </div>
                    <div className="Value">
                        99
                    </div>
                </div>
                <div id="TasksFailed" className="Asset">
                    <div className="Label">
                        Tasks Failed
                    </div>
                    <div className="Value">
                        7
                    </div>
                </div>
        </div>  
        </div>
    )
}