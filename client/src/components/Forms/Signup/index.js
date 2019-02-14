import React, { Component } from 'react';
import AuthHelperMethods from '../../../authentication/AuthHelperMethods';
import API from '../../../utils/API';

class Signup extends Component {

    Auth = new AuthHelperMethods();

    state = {
        username: "",
        password: "",
    };

    _handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;

        // add an axios post to the signup route on the server
        API.signup(username, password).then(data => {
            const { username, password} = this.state;
            this.Auth.login(username, password).then(res => {
                if (!res) {
                    return alert('Sorry those credentials don\'t exist.');
                } else {
                    this.props.history.push('/prompts');
                }
            }).catch(err => console.log(err));
        });
    };

    componentDidMount() {
        if (this.Auth.loggedIn()) {
            this.props.history.push('/prompts');
        }
    };

    render() {
        const { styles } = this.props;
        return(
            <form className='signup-form' style={styles.form}>
                <div className='form-group' style={styles.group}>
                    <h3>Sign-up</h3>
                </div>
                <div className='form-group' style={styles.group}>
                    <label htmlFor='username'>Username</label>
                    <br/>
                    <input name='username' type='text' onChange={this._handleChange}/>
                </div>
                <br/>
                {/* <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <br/>
                    <input type='text' name='email'/>
                </div>
                <br/> */}
                <div className='form-group' style={styles.group}>
                    <label htmlFor='password'>Password</label>
                    <br/>
                    <input name='password' type='password' onChange={this._handleChange}/>
                </div>
                <br/>
                <button name='Sign-up' id='signup' onClick={this.handleFormSubmit}>
                    Sign-up
                </button>
            </form>
        );
    };
};

export default Signup;