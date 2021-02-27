import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import back from '../../media/icons/back.svg'
import scenary from '../../media/images/scenary.jpg'
// import { post } from '../../../../routes/tasks';

// import 'react-calendar/dist/Calendar.css';

export const CalendarComp = (props) => {

    const [ updateList, setUpdateList ] = useState([])
    const [ isMine, setIsMine ] = useState(false);
    const [ taskInfo, setTaskInfo ] = useState([]);
    const [ displayForm, setDisplayForm ] = useState(0);
    const [ displayData, setDisplayData ] = useState({
        "thumbnail": "",
        "body": ""
    });
    const [ showGoalStarted, setGoalStarted ] = useState(false);
    const [ formData, setFormData ] = useState({
        tid: props.tid,
        update_thumbnail: "",
        body: ""
    })

    const months = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }
    
    useEffect(() => {
    (async () => {
        try {
            const update_data = await axios.get('/api/update/' + props.tid);
            const task = await axios.get('/api/tasks/details/' + props.tid);
            const post_owner = await axios.get('/api/update/mine/' + props.tid);

            // console.log(update_data.data.data.update);
            // console.log(post_owner.data.mine);
            // console.log(task.data.data.tasks);
            setUpdateList(update_data.data.data.update);
            setTaskInfo(task.data.data.tasks);
            setIsMine(post_owner.data.mine);


        } catch (error) {
            console.log(error)
        }
        })()
    }, [])

    var FetchImageAsBase64=(e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() 
        {
            var ThumbnailBase64=reader.result;
            setFormData({
            ...formData,
            [e.target.name]: ThumbnailBase64
            })

        }
        reader.readAsDataURL(file);

    }

    var onBodyChange=(e)=>{

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const calendarChange = (value, e) => {
        // console.log(e)
        console.log(isMine)

        var dd=value.getDate();
        var mm=value.getMonth()+1;
        var yyyy=value.getFullYear();
        if(dd<10) 
        {   
            dd='0'+dd;
        } 
        if(mm<10) 
        {
            mm='0'+mm;
        } 
        var date = dd+ "-" + mm + "-" + yyyy;

        // setCalendarValue(date)
        // let combined_array = updateList.concat(taskInfo);
        var found=0;
        updateList.forEach(el => {
            // consolvalue.log(date)
            // console.log(el.update_date)
            if(found!==1)
            {
                if(el.update_date === date)
                {
                    found=1
                    setDisplayData({...displayData,
                        "thumbnail": el.update_thumbnail,
                        "body": el.body
                    })
                    setDisplayForm(1)
                    setGoalStarted(false);
                }
                else
                    setDisplayForm(true)
            }
        })
        
        if(found != 1)
        {

            var today = new Date()
            var dd=today.getDate();
            var mm=today.getMonth()+1;
            var yyyy=today.getFullYear();
            if(dd<10) 
            {   
                dd='0'+dd;
            } 
            if(mm<10) 
            {
                mm='0'+mm;
            } 
            var today= dd+ "-" + mm + "-" + yyyy;
            if(taskInfo[0].start_date == date)
            {
                setDisplayData({...displayData,
                    "thumbnail": taskInfo[0].task_thumbnail,
                    "body": taskInfo[0].body
                })
                setGoalStarted(true);
                setDisplayForm(1);
            }
            else if (date == today && isMine)
            {
                console.log(isMine)
                setDisplayForm(0);
            }
            else
            {
                setDisplayData({...displayData,
                    "thumbnail": null,
                    "body": "No recorded update today."
                })
                setDisplayForm(2);
            }
        }
          
    }
    
    function tileClassName({ date, view }) {

        var dd=date.getDate();
        var mm=date.getMonth()+1;
        var yyyy=date.getFullYear();
        if(dd<10) 
        {   
            dd='0'+dd;
        } 
        if(mm<10) 
        {
            mm='0'+mm;
        } 
        var date = dd+ "-" + mm + "-" + yyyy;

        // Add class to tiles in month view only

        if(taskInfo[0] != null && updateList != null){
            const task = [taskInfo[0].start_date]
            if (view === 'month') {
              // Check if a date React-Calendar wants to check is on the list of dates to add class to
              if (task.find(dDate => dDate === date)) {
                return 'StartDate';
              }
              if (updateList.find(element => element.update_date === date)){
                  return 'Checkpoint';
              }
            }
        }
        return ""
      }
    //StartDate Checkpoint EndDate
    
  const onSubmit = async e => {
    e.preventDefault();
    // console.log(formData);
    try {
        const res = axios.post('/api/update', formData);
    } catch (error) {
        console.log(error)
    }

    console.log(formData);
    }       
  



  return (
    <>
        <div class="ActualCalendarcontainer">
        
            <h1>{taskInfo[0] ? taskInfo[0].task_name : ""}</h1>
            <Calendar
                onChange={(value, event) => calendarChange(value, event)}
                tileClassName={tileClassName}
            />
        </div>
        <div className="HoverDisplay">{isUpdated?"Updates available - credited 10 goalds":"No updates - deduced 20 goalds"</div>

        {(displayForm == 1 || displayForm == 2) && 
          <div className="InformationContainer" >
            <h2>{showGoalStarted?"Goal started today": "Update Info"}</h2>
            <div className="Wrapper">
                  <div className="SwitchLeft">
                      {/* <img src={back}/> */}
                  </div>
                  {displayData.thumbnail?<img className="Thumbail" src={displayData.thumbnail}/>:null}
                  <div className="SwitchRight">
                      {/* <img src={back}/> */}
                  </div>
            </div>
            
            <div className='Description'>
              {displayData.body}
            </div>
        </div>
             }
       
        {(displayForm == 0) && (isMine) && 
            <div className="UpdateContainer">

                <div class="ThumbnailUploader">
                    <div class="ThumbnailWrapper">
                        <img src={formData.update_thumbnail} alt="" class="Thumbnail"/>
                    </div>
                    <label for="upload">
                        <div class="UploadThumbnailBtn">Upload thumbnail</div>
                        <input 
                            type="file" 
                            id="upload" 
                            style={{display:"none"}} 
                            name="update_thumbnail"
                            onChange={e => FetchImageAsBase64(e)}
                            accept="image/x-png,image/gif,image/jpeg"
                            />
                            
                    </label>
                </div>
                <textarea
                    className="InputField" 
                    id="Description" 
                    placeholder="enter task description" 
                    type="text" 
                    name="body"
                    onChange={e => onBodyChange(e)}
                ></textarea>

                
                <button class="SaveInformationButton" onClick={e=>onSubmit(e)}>Save information</button>
                  

              </div>
            }
       
    
      
        
    </>
  );
}







