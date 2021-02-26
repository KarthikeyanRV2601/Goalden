import { React, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from'react-dom';
import {NavBar} from '../components/NavBar';
import {SearchBar} from '../components/SearchBar';
import {Filter} from '../components/Tasks_Components/Filter'
import {Task} from '../components/Tasks_Components/Task'
import '../styles/tasks.css';

export const Tasks=()=>{

    var TaskTitles=["hello"]
    // var [ TaskTitles, setTaskTitles ] = useState([]);
    //Save the title values here
    
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const TitlesData = await axios.get('/api/salesperson/' + user.id + '/customer');
    //             console.log(TitlesData)
    //             // setsetTaskTitles(spCusts.data.data.results)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     })()
    // }, [])

    return(
        <div className="TasksPage">
            <NavBar/>
            <div className="LeftPanel">
                <SearchBar/>
                <div className="TasksList">
                   {TaskTitles.map((item)=><Task TaskTitle={item} /*pass Set status function along*//>)}
                </div>
            </div>
            <div className="RightPanel">
                <Filter/>
            </div>
        </div>
    )
}