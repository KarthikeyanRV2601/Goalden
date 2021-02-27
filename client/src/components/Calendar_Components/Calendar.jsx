import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import back from '../../media/icons/back.svg'
import scenary from '../../media/images/scenary.jpg'

// import 'react-calendar/dist/Calendar.css';

export const CalendarComp = (props) => {

  const [ updateList, setUpdateList ] = useState([])
  const [ isMine, setIsMine] = useState(true);

  const [ formData, setFormData ] = useState({
    tid: props.tid,
    update_thumbnail: "",
    body: ""
  })
  

  useEffect(() => {

    (async () => {
        try {
            const update_data = await axios.get('/api/update/' + props.tid);
            const post_owner = await axios.get('/api/update/mine/' + props.tid);

            console.log(update_data.data.data.update);
            console.log(post_owner.data.mine)
            setUpdateList(update_data.data.data.tasks);
            console.log(updateList)
        } catch (error) {
            console.log(error)
        }
    })()
  }, [])

  const [value, onChange] = useState(new Date());
  const [isUpdated,setIsUpdate] =useState(false);

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
      [e.target.name]: [e.target.value]
    })
  }

  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    try {
        const res = axios.post('/api/update', formData);
    } catch (error) {
        console.log("poooooooo")
    }

    console.log(formData);
}
  
  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
      />
      
       <div className="InformationContainer" >
          <div className="Wrapper">
                <div className="SwitchLeft">
                    <img src={back}/>
                </div>
                <img className="Thumbail" src={scenary}/>
                <div className="SwitchRight">
                    <img src={back}/>
                </div>
          </div>
          
          <div className='Description'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Voluptatem ratione dignissimos, illum similique commodi 
          </div>
      </div>
    
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
        
    </>
  );
}