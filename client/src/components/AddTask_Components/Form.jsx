import React from 'react';



export const Form=()=>{
    var TaskData={}
    //all input data is in TaskDat now
    var InputHandler=(e)=>{
        TaskData[e.target.id]=[e.target.value];
    }

    return(
        <div className="InputFetchingContainer">
        <div className="LeftContainer">
            <div className="H2_n_Category">
                <h2>Add a new task</h2>
                <select className="Field" id="Category" onChange={InputHandler}>
                    <option>Category</option>
                    <option>Career</option>
                    <option>Financial</option>
                    <option>Business</option>
                    <option>Personal</option>
                    <option>Family</option>
                </select>
            </div>
            <input className="InputField" id="TaskName" placeholder="enter your task name" type="text" onChange={InputHandler}/>
            <input className="InputField" id="Description" placeholder="enter task description" type="text" onChange={InputHandler}/>
            <input className="InputField" id="TargetDate"  placeholder="enter target date in dd-mm-yy format" type="text" onChange={InputHandler}/>
            <div className="switchInput">
                <div className="FieldLabel">
                    Private 
                </div>
                <div className="switch">
                    <input id="Privacy" type="checkbox" onChange={InputHandler}/>
                    <span className="sliderSwitch round"></span>
                </div>
            </div>
            <select className="Field" id="Priority" onChange={InputHandler}>
                <option>Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
            <select className="Field" id="Frequency" onChange={InputHandler}>
                <option>Update progress month wise</option>
                <option>Update progress week wise</option>
                <option>Update progress year wise</option>
            </select>
            <input className="Field"  placeholder="Update frequency" id="FrequencyValue" onChange={InputHandler}/>
            <button className="Post_Task_Button">Post task</button>
        </div>
        <div className="RightContainer">

        </div>
    </div>
    )
}