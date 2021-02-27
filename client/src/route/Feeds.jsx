import React, { useEffect, useState } from 'react';
import ReactDOM from'react-dom';
import {Feed} from '../components/Feeds_Components/Feed';
import {NavBar} from '../components/NavBar';
import {Profile} from '../components/Feeds_Components/Profile';
import '../styles/feeds.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Feeds=({ isAuth })=>{

    const [FeedList, setFeedList] = useState([]);

    useEffect(() => {

        (async () => {
            try {
                const incoming_data = await axios.get('/api/tasks/');
                console.log(incoming_data.data.data.tasks)
                setFeedList(incoming_data.data.data.tasks);
                console.log(FeedList)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    if(!isAuth)
        return <Redirect to='/login' />
    
    return(
        <div className="FeedPage">
            <NavBar/>
            <div className="LeftPanel">
                <Profile/>
            </div>
            <div className="MainPanel">
                <div className="Feeds">
                    { FeedList && FeedList.map(task => {
                         console.log(task.tid)
                            return (
                                <Feed 
                                    user_name={task.user_name}
                                    task_thumbnail={task.task_thumbnail}
                                    body={task.body}
                                    pats={task.pats}
                                    streak={task.streak}
                                    key={task.tid}
                                    tid={task.tid}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="RightPanel">
                
            </div>
            
        </div>
    )
}

Feeds.propTypes = {
    isAuth: PropTypes.bool,
    user: PropTypes.object,
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user
});

export default connect(mapStateToProps, null)(Feeds)