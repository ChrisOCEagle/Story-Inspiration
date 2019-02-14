import React, { Component } from 'react';
import AuthHelperMethods from '../../../authentication/AuthHelperMethods';

class Login extends Component {

    Auth = new AuthHelperMethods();

    state = {
        username: "",
        password: "",
    };

    _handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        this.Auth.login(username, password).then(res => {
            if (!res) {
                return alert('Sorry those credentials don\'t exist.');
            } else {
                this.props.history.push('/prompts');
            }
        }).catch(err => console.log(err));
    };

    componentDidMount() {
        if (this.Auth.loggedIn()) {
            this.props.history.push('/prompts');
        }
    };

    render() {
        const { styles } = this.props;
        return(
            <form className='login-form' style={styles.form}>
                <div className='form-group' style={styles.group}>
                    <h3>Log-in</h3>
                </div>
                <div className='form-group' style={styles.group}>
                    <label htmlFor='username'>Username</label>
                    <br/>
                    <input type='text' name='username' onChange={this._handleChange}/>
                </div>
                <br/>
                <div className='form-group' style={styles.group}>
                    <label htmlFor='password'>Password</label>
                    <br/>
                    <input type='password' name='password' onChange={this._handleChange}/>
                </div>
                <br/>
                <button name='Log-in' id='login' onClick={this.handleFormSubmit}>
                    Log-in
                </button>
            </form>
        );
    };
};

export default Login;