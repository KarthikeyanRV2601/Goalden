import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import back from '../../media/icons/back.svg'
import scenary from '../../media/images/scenary.jpg'
// import { post } from '../../../../routes/tasks';

// import 'react-calendar/dist/Calendar.css';

export const CalendarComp = (props) => {

    const [ updateList, setUpdateList ] = useState([])
    const [ isMine, setIsMine ] = useState(true);
    const [ taskInfo, setTaskInfo ] = useState([]);
    const [ displayForm, setDisplayForm ] = useState(true);
    const [ displayData, setDisplayData ] = useState({
        "thumbnail": "",
        "body": ""
    });
    const [ showGoalStarted, setGoalStarted ] = useState(false);
    const [ calendarValue, setCalendarValue ] = useState(0);
    const [ isUpdated,setIsUpdate ] =useState(false);
    const [ formData, setFormData ] = useState({
        tid: props.tid,
        update_thumbnail: "",
        body: ""
    })
    const [CalendarState,setCalendarState]=useState("");

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
            console.log(task.data.data.tasks);
            setUpdateList(update_data.data.data.update);
            setTaskInfo(task.data.data.tasks);
            setIsMine(post_owner);


        } catch (error) {
            console.log(error)
        }
        })()
    }, [])
    
    var styling = (date, color)=>{
        // StartDate="February 5, 2021";
        var Stringdate="[aria-label^="+`'${date}'`+"]";
        var StartDateButton= document.querySelectorAll(Stringdate);
        if(StartDateButton[0]!= null)
        {
            StartDateButton[0].parentElement.style.background=color;
            StartDateButton[0].parentElement.style.color="white";
            
        }
        
    }
    if(taskInfo.length !== 0)
    {
        let taskDate = taskInfo[0].start_date
        // console.log(taskDate)
        let curDate = taskDate.substring(0, 2)
        if(curDate[0] == 0)
            curDate = curDate[1]
        let curMonth = months[taskDate.substring(3, 5)]
        let year = taskDate.substring(6, 10)
        styling(curMonth + " " + curDate + ", " + year, "green")
    }

    if( updateList.length !== 0 )
    {
        updateList.forEach(element => {
            let updateDate = element.update_date
            let curDate = updateDate.substring(0, 2)
            if(curDate[0] == 0)
                curDate = curDate[1]
            let curMonth = months[updateDate.substring(3, 5)]
            let year = updateDate.substring(6, 10)

            styling(curMonth + " " + curDate + ", " + year, "orange")
        })
    }

    
    //change start date color

    // console.log(buttons[0]);
    // buttons.forEach((button=>{
    //     button.addEventListener('click',ButtonClick)
    // }));
    
  


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


    const calendarChange = e => {
        var dd=e.getDate();
        var mm=e.getMonth()+1;
        var yyyy=e.getFullYear();
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
            // console.log(date)
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
                setDisplayForm(false)
                setGoalStarted(false);
            }
            else
                setDisplayForm(true)
            }
        })
        
        if(taskInfo[0].start_date == date)
        {
            setDisplayData({...displayData,
                "thumbnail": taskInfo[0].task_thumbnail,
                "body": taskInfo[0].body
            })
            setGoalStarted(true);
            setDisplayForm(false);
        }
          
    }
    
    
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
            onChange={e => calendarChange(e)}
            value={calendarValue}
            />
        </div>

        {!displayForm && 
          <div className="InformationContainer" >
            <h2>{showGoalStarted?"Goal started today": "Daily update"}</h2>
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
        {displayForm && 
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







