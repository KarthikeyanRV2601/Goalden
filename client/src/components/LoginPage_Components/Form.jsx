import React, { useState } from 'react';
import ReactDOM from'react-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Form= ({ login, isAuth })=>{

    const [formData, setFormData] = useState({
        user_name: "",
        password: ""
    });

    const { user_name, password } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async e => {
        e.preventDefault();
        login(user_name, password)
    }

    if (isAuth) {
        return <Redirect to='/feeds' />
    }

    return(
        <div class="LeftPanel">
            <div class="Introtext">
                <p>Your <span>Goalden</span> journey <br/><span class="SecondLine">begins now</span></p>
            </div>
            <form onSubmit={e => onSubmit(e)} class="LoginForm">
                <div class="input-field">
                  <input 
                    type="text" 
                    id="uname"
                    name="user_name"
                    onChange={e => onChange(e)}
                    required />
                  <label for="uname">username</label>
                </div>
                <div class="input-field">
                    <input 
                        type="password" 
                        id="pwd"
                        name="password" 
                        onChange={e => onChange(e)}
                        required />
                    <label for="pwd">password</label>
                </div>
                <button className="Signinbtn">Sign in</button>
            </form>
        </div>
    )
}

Form.propTypes = {
    login: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
    user: PropTypes.object,
  };

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user
});

export default connect(mapStateToProps, { login })(Form);