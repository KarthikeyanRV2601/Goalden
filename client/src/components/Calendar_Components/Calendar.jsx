import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import back from '../../media/icons/back.svg'
import scenary from '../../media/images/scenary.jpg'
import defaultThumbnail from '../../media/images/defaultThumbnail.jpg';
// import { post } from '../../../../routes/tasks';

// import 'react-calendar/dist/Calendar.css';

export const CalendarComp = (props) => {

    const [ updateList, setUpdateList ] = useState([])
    const [ isMine, setIsMine ] = useState(true);
    const [ taskInfo, setTaskInfo ] = useState([]);
    const [ displayForm, setDisplayForm ] = useState(true);
    const [ displayData, setDisplayData ] = useState([]);
    const [ calendarValue, setCalendarValue ] = useState("");
    const [isUpdated,setIsUpdate ] =useState(false);
    const [ formData, setFormData ] = useState({
    tid: props.tid,
    update_thumbnail: "",
    body: ""
})
    
    var buttons=document.querySelectorAll("[aria-label^='February']");
    console.log(buttons);

  useEffect(() => {

    (async () => {
        try {
            const update_data = await axios.get('/api/update/' + props.tid);
            const task = await axios.get('/api/tasks/details/' + props.tid);
            const post_owner = await axios.get('/api/update/mine/' + props.tid);

            console.log(update_data.data.data.update);
            console.log(post_owner.data.mine);
            console.log(task.data.data.tasks);
            setUpdateList(update_data.data.data.update);
            setTaskInfo(task);
            setIsMine(post_owner);
            
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

    const calendarChange = e => {
        console.log(e)
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
                setDisplayData(el)
                setDisplayForm(false)
            }
            else
                setDisplayForm(true)
            }
        })
          
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
      <Calendar
        onChange={e => calendarChange(e)}
        value={calendarValue}
      />
        {!displayForm && 
          <div className="InformationContainer" >
            <div className="Wrapper">
                  <div className="SwitchLeft">
                      {/* <img src={back}/> */}
                  </div>
                  <img className="Thumbail" src={displayData.update_thumbnail ? displayData.update_thumbnail : defaultThumbnail}/>
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







