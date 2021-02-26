import React from 'react';
import ReactDOM from'react-dom';
import {CommentSection} from './CommentSection';




export const Feed=()=>{
    return(
        <div className="Feed">
                <div className="User">
                    <img className="dp" src="../media/images/man1.jpg"/>
                    <p>lingesan</p>
                </div>
                <div className="ThumbnailWrapper">
                    <img className="Thumbnail" src="../media/images/scenary.jpg"/>
                </div>
                <p className="Description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae dolore eligendi voluptas soluta nobis, 
                    natus deserunt maiores aliquid numquam cumque odio alias explicabo debitis nam pariatur aut dolor, illum velit!
                </p>
                <div className="Actions">
                    <div className="Pats">
                        <div className="Label">
                            25 Pats
                        </div>
                    </div>
                    <div className="ActionSet">
                        <div className="StreakCount">
                        48 days streak
                        </div>
                        <div className="CommentButton">
                            23 comments
                        </div>
                        <a href="calendar.html" className="DailyUploads">
                            Daily Uploads
                        </a>
                    </div>
                    

                </div>
                <CommentSection/>
            </div>
    )
}