import React, { useEffect, useState } from 'react';
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
    const [ taskList, setTaskList ] = useState([])
    

    useEffect(() => {

        (async () => {
            try {
                const incoming_data = await axios.get('/api/tasks/user');
                console.log(incoming_data.data.data.tasks)
                setTaskList(incoming_data.data.data.tasks);
                console.log(taskList)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return(
        <div className="TasksPage">
            <NavBar/>
            <div className="LeftPanel">
                <SearchBar/>
                <div className="TasksList">
                   {taskList && taskList.map((item)=> {
                    console.log(item)
                        return (

                            <Task 
                                task_id={item.tid}
                                task_name={item.task_name}
                            />
                        )
                    })
                }
                </div>
            </div>
            <div className="RightPanel">
                <Filter/>
            </div>
        </div>
    )
}