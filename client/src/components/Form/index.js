import React, { Component } from 'react';
import Header from '../Header';
import Label from '../Label';
import Input from '../Input';
import Button from '../Button';
import API from '../../utils/API';
import AuthHelperMethods from '../../authentication/AuthHelperMethods';
import './style.css';

class Form extends Component {
    Auth = new AuthHelperMethods();

    state = {
        username: '',
        password: '',
        title: '',
        body: '',
        share: false,
    };

    componentWillMount() {
        if (this.getSessionData('story-title') && this.getSessionData('story-body')) {
            if (this.getSessionData('story-shared')) {
                this.setState({ share: this.getSessionData('story-shared') });
            }
            if (!this.state.share) {
                this.setState({ 
                    title: this.getSessionData('story-title'),
                    body: this.getSessionData('story-body'),
                });
    
            }
        }
    };

    getSessionData = key => {
        return sessionStorage.getItem(key);
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.props.className === 'signup') {
            API.signup(this.state.username, this.state.password)
            .then(data => {
                this.Auth
                .login(this.state.username, this.state.password)
                .then(res => {
                    if (!res) {
                        return alert('Sorry those credentials don\'t exist.');
                    } else {
                        this.props.history.push('/prompts');
                    }
                })
                .catch(err => {throw err});
            })
            .catch(err => console.log(err));
        } else if (this.props.className === 'login') {
            this.Auth
            .login(this.state.username, this.state.password)
            .then(res => {
                if (!res) {
                    return alert('Sorry those credentials don\'t exist.');
                } else {
                    this.props.history.push('/prompts');
                }
            })
            .catch(err => console.log(err));
        } else {
            const UserId = this.Auth.getConfirm().id;
            var PromptId = '';
            if (this.props.history.location.pathname.indexOf('/prompt/') === 0) {
                PromptId = parseInt(this.props.history.location.pathname.replace('/prompt/', ''));
            } else if (this.props.history.location.pathname.indexOf('/story/') === 0) {
                PromptId = parseInt(this.props.history.location.pathname.replace('/story/', ''));
            };
            const data = {
                story: {
                    title: this.state.title,
                    body: this.state.body,
                },
                share: this.state.share,
                UserId: UserId,
                PromptId: PromptId,
            };
            if (this.getSessionData('story-title') && this.getSessionData('story-body')) {
                API.share(data)
                .then(response => console.log(response))
                .catch(err => console.log(err));
            } else {
                API.save(data)
                .then(response => console.log(response))
                .catch(err => console.log(err));
            };
        };
    };

    handleUsernameChange = (event) => {
        const { name, value } = event.target;
        API.usernameCheck(value).then(response => {
            if (typeof response.data === typeof '') {
                alert('The username already exists. Please choose another.');
            } else {
                this.setState({ [name]: value });
            }
        });
    };

    handleChange = async(event) => {
        const { name, value } = event.target;
        await this.setState({ [name]: value });
    };

    handleCheckboxChange = async(event) => {
        await this.setState({ share: !this.state.share });
    };

    render() {
        if (this.props.className === 'signup' || this.props.className === 'login') {
            if (this.props.className === 'signup') {
                return(
                    <form className={this.props.className + ' form'}>
                        <div className='form-group'>
                            <Header className='h3'>{this.props.children}</Header>
                        </div>
                        <div className='form-group'>
                            <Label htmlFor='username' children='Username'/><br/>
                            <Input className='input' name='username' type='text' onChange={this.handleUsernameChange}/>
                        </div><br/>
                        <div className='form-group'>
                            <Label htmlFor='password' children='Password'/><br/>
                            <Input className='input' name='password' type='password' onChange={this.handleChange}/>
                        </div><br/>
                        <div className='form-group'>
                            <Label htmlFor='confirm' children='Confirm Password'/><br/>
                            <Input className='input' name='confirm' type='password' onChange={this.handleChange}/>
                        </div><br/>
                        <button name={this.props.children} className={this.props.className + ' submit-btn'} onClick={this.handleFormSubmit}>
                            {this.props.children}
                        </button>
                    </form>
                );
            } else if (this.props.className === 'login') {
                return(
                    <form className={this.props.className + ' form'}>
                        <div className='form-group'>
                            <Header className='h3'>{this.props.children}</Header>
                        </div>
                        <div className='form-group'>
                            <Label htmlFor='username' children='Username'/><br/>
                            <Input className='input' name='username' type='text' onChange={this.handleChange}/>
                        </div><br/>
                        <div className='form-group'>
                            <Label htmlFor='password' children='Password'/><br/>
                            <Input className='input' name='password' type='password' onChange={this.handleChange}/>
                        </div>
                        <Button className='link' href='' id='forgot-password' name='' headerName='h5'>
                            forgot password?
                        </Button>
                        <button name={this.props.children} className={this.props.className + ' submit-btn'} onClick={this.handleFormSubmit}>
                            {this.props.children}
                        </button>
                    </form>
                );
            };    
        } else {
            return(
                <form className={this.props.className + ' form'}>
                    <div className='form-group'>
                        <Header className='h3'>{this.props.children}</Header>
                    </div>
                    <div className='form-group'>
                        <Label htmlFor='title' children='Title'/><br/>
                        <Input className='input' name='title' type='text' size='70' value={this.state.title} onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                        <Label htmlFor='body' children='Story'/><br/>
                        <Input className='textarea' name='body' rows='15' cols='80' type='text' value={this.state.body} onChange={this.handleChange}/>
                    </div>
                    <div className='form-group' id='checkbox'>
                        <Input
                            className='checkbox'
                            name='share'
                            id='share'
                            type='checkbox'
                            value={this.state.share}
                            onChange={this.handleCheckboxChange}
                        />
                        <Label htmlFor='share' children='Share'/>
                    </div>
                    <button name='save' className={this.props.className + ' submit-btn'} id='save-story' onClick={this.handleFormSubmit}>
                        Save
                    </button>
                </form>
            );    
        };
    };
};

export default Form;