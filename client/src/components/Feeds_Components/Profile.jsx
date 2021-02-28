import React from 'react';
import ReactDOM from'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Profile=({ user })=>{

    if(user)
    {
        console.log(user)
        var dpUrl=`https://randomuser.me/api/portraits/men/${parseInt(user.uid)+45}.jpg`
    }
    var Levels=[
        "Unrepentant slacker",
        "Persistent slacker",
        "Recovering slacker",
        "Depressed drone",
        "Demoralized drone",
        "Dead-eyed drone",
        "Bored attendant",
        "Resigned attendant",
        "Obedient attendant",
        "Competent operative",
        "Engaged operative",
        "Committed operative",
        "Valuable asset",
        "Strategic asset",
        "Critical asset",
        "Habitual workaholic",
        "Determined workaholic",
        "Die-hard workaholic]",
        "GOD"]
    
    
    var coins=1801;
    var level=Levels[parseInt(coins/100)];
    


    return(
        <div className="Profile">
            <div className="ProfilePic">
                <p>{user ? user.user_name : ""}</p>
                <img className="Avatar" src={dpUrl}/>

            </div>
            <div className="Assets">
                <div className="Coins">
                    <p>1928 coins</p>
                </div>
                <div className="Level">
                    <p>Slacker</p>
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

Profile.propTypes = {
    user: PropTypes.object,
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, null)(Profile)