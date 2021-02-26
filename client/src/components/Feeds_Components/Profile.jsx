import React from 'react';
import ReactDOM from'react-dom';



export const Profile=()=>{
    return(
        <div className="Profile">
            <div className="ProfilePic">
                <p>Lingusamy</p>
                <img className="Avatar" src="../media/images/man1.jpg"/>

            </div>
            <div className="Assets">
                <div className="Coins">
                    <p>1928 coins</p>
                </div>
                <div className="Level">
                    <p>GOD</p>
                </div>
            </div>
            <div className="TasksAndRequests">
                
                <div className="Tasks">
                    Recent tasks
                </div>
                <div className="Requests">
                    Recent requests
                </div>
            </div>
        </div>
    )
}