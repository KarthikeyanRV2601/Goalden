import React from 'react';



export const Filter=()=>{
    return(
        <div className="SearchFilter">

            <div id="Status" className="FilterWrap">
                <div className="FilterLabel">Status</div>
                <select name="" id="StatusSelect" className="Filter">
                    <option className="FilterValue">On going</option>
                    <option className="FilterValue">Completed</option>
                    <option className="FilterValue">On hold</option>
                    <option className="FilterValue">Pending</option>
                </select>
            </div>
            
            <div className="FilterWrap">
                <div className="FilterLabel">Target Date</div>
                <input type="text" id="TargetDate" placeholder="Target date in dd-mm-yy" className="Filter"/>
            </div>
            

            <div id="Priotity" className="FilterWrap">
                <div className="FilterLabel">Priority</div>
                <select name="" id="PrioritySelect" className="Filter">
                    <option  className="FilterValue">High</option>
                    <option  className="FilterValue">Medium</option>
                    <option  className="FilterValue">Low</option>
                </select>
            </div>
        </div>
    )
}