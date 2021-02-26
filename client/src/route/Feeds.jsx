import React, { useEffect, useState } from 'react';
import ReactDOM from'react-dom';
import {Feed} from '../components/Feeds_Components/Feed';
import {NavBar} from '../components/NavBar';
import {Profile} from '../components/Feeds_Components/Profile';
import '../styles/feeds.css';
import axios from 'axios';


export const Feeds=()=>{


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

    return(
        <div className="FeedPage">
            <NavBar/>
            <div className="LeftPanel">
                <Profile/>
            </div>
            <div className="MainPanel">
                <div className="Feeds">
                    { FeedList && FeedList.map(task => {
                            return (
                                <Feed 
                                    user_name={task.user_name}
                                    task_thumbnail={task.task_thumbnail}
                                    body={task.body}
                                    pats={task.pats}
                                    streak={task.streak}
                                    key={task.tid}
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