import React, { useState } from 'react';
import ReactDOM from'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom"; 

const Form=({isAuth })=>{
    let history = useHistory();
    const [formData, setFormData] = useState({
        category: "Others",
        task_name: "",
        body: "",
        end_date: null,
        private_goal: 0,
        task_thumbnail: "",
        frequency: "",
        update: "W",
        isRecurring: 1
    });
    const [isChecked, setIsChecked] = useState(false);
    
    const onChange = e => {
        let res;
        if(e.target.name == 'update')
        {
            if(e.target.value == 'Update progress week wise')
                res = 'W'
            else if (e.target.value == 'Update progress month wise')
                res = 'M'
            else
                res = 'Y'
        }
        else if(e.target.name == 'frequency')
        {
            res = formData.update + e.target.value
        }
        else
            res = e.target.value
        setFormData({
            ...formData,
            [e.target.name]: res
        })
    }

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const res = axios.post('/api/tasks', formData);
            history.push("/feeds");
        } catch (error) {
            console.log("poooooooo")
        }

        console.log(formData);
    }

    var FetchImageAsBase64=(element) => {
        var file = element.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() 
        {
            var ThumbnailBase64=reader.result;
            setFormData({
                ...formData,
                [element.target.name]: ThumbnailBase64
            })

        }
        reader.readAsDataURL(file);
            
    }

    
    if (isAuth == false) {
        return <Redirect to='/login' />
    }

    return(
        <div className="InputFetchingContainer">
        <div className="LeftContainer">
            <div className="H2_n_Category">
                <h2>Add a new task</h2>
                <select 
                    className="Field" 
                    id="Category" 
                    name="category" 
                    onChange={e => onChange(e)}>
                        <option>Category</option>
                        <option>Career</option>
                        <option>Hobby</option>
                        <option>Fitness</option>
                        <option>Business</option>
                        <option>Education</option>
                        <option>Family</option>
                        <option>Others</option>
                </select>
            </div>
            <input 
                className="InputField" 
                id="TaskName" 
                placeholder="enter your task name" 
                type="text" 
                name="task_name"
                onChange={e => onChange(e)}/>
            <textarea 
                className="InputField" 
                id="Description" 
                placeholder="enter task description" 
                type="text" 
                name="body"
                onChange={e => onChange(e)}
            ></textarea>
            <input 
                className="InputField" 
                id="TargetDate"  
                placeholder="enter target date in dd-mm-yy format" 
                name="end_date"
                type="text" 
                onChange={e => onChange(e)}
            />

            <div className="switchInput">
                <div className="FieldLabel">
                    Private 
                </div>
                <div className="switch"  
                onClick={e => setIsChecked(!isChecked)}>
                    <input 
                        id="Privacy" 
                        type="checkbox" 
                        name="private_goal"
                        onChange={(event) => setIsChecked(event.currentTarget.checked)}
                        checked={isChecked}
            
                       />
                    <span className="sliderSwitch round"></span>
                </div >
            </div>
            {/* <select className="Field" id="Priority" onChange={e => onChange(e)}>
                <option>Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select> */}
            <select 
                className="Field" 
                id="Frequency" 
                name="update"
                onChange={e => onChange(e)}>
                <option>Update progress week wise</option>
                <option>Update progress month wise</option>
                <option>Update progress year wise</option>

            </select>
            <input 
                className="Field"  
                placeholder={!formData.update ? "Update freqency" : "Update frequency per " + formData.update}
                id="FrequencyValue"
                name="frequency" 
                onChange={e => onChange(e)}/>
            <button onClick={e => onSubmit(e)} className="Post_Task_Button">Post task</button>
        </div>
        <div class="RightContainer">
            <div class="ThumbnailUploader">
                <div class="ThumbnailWrapper">
                    <img src={formData.task_thumbnail} alt="" class="Thumbnail"/>
                </div>
                <label for="upload">
                    <div class="UploadThumbnailBtn">Upload thumbnail</div>
                    <input 
                        type="file" 
                        id="upload" 
                        style={{display:"none"}} 
                        name="task_thumbnail"
                        onChange={e => FetchImageAsBase64(e)}
                        accept="image/x-png,image/gif,image/jpeg"
                        />

                </label>
            </div>
        </div>
    </div>
    )
}

Form.propTypes = {
    isAuth: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, null)(Form);


//var c = document.getElementById("myCanvas");
//var ctx = c.getContext("2d");
//ctx.drawImage(img, 10, 10);
//var ImageSourceURL = await canvas.toDataURL('image/jpeg');



// function binEncode(data) {
//     var binArray = []
//     var datEncode = "";

//     for (i=0; i < data.length; i++) {
//         binArray.push(data[i].charCodeAt(0).toString(2)); 
//     } 
//     for (j=0; j < binArray.length; j++) {
//         var pad = padding_left(binArray[j], '0', 8);
//         datEncode += pad + ' '; 
//     }
//     function padding_left(s, c, n) { if (! s || ! c || s.length >= n) {
//         return s;
//     }
//     var max = (n - s.length)/c.length;
//     for (var i = 0; i < max; i++) {
//         s = c + s; } return s;
//     }
//     console.log(binArray);
// }



{/* <img src={URL.createObjectURL(responseData)} /> */}