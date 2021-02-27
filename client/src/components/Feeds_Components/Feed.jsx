import React from 'react';
import ReactDOM from'react-dom';
import {CommentSection} from './CommentSection';


export const Feed=(props)=>{


    return(
        <div className="Feed" key={props.key}>
                <div className="User">
                    <img className="dp" src="../media/images/man1.jpg"/>
                    <p>{props.user_name}</p>
                </div>
                <div className="ThumbnailWrapper">
                    <img className="Thumbnail" src={props.task_thumbnail}/>
                </div>
                <p className="Description">
                    {props.body}
                </p>
                <div className="Actions">
                    <div className="Pats">
                        <div className="Label">
                            {props.pats} Pats
                        </div>
                    </div>
                    <div className="ActionSet">
                        <div className="StreakCount">
                            {props.streak} Streak
                        </div>
                        {/* <div className="CommentButton">
                            {commentsCount} Comments
                        </div> */}
                        <a href={"/calendar/" + props.tid} className="DailyUploads">
                            Daily Uploads
                        </a>
                    </div>
                    

                </div>
                <CommentSection/>
            </div>
    )
}