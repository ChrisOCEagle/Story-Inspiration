import React, { Component } from 'react';
import AuthHelperMethods from '../../../authentication/AuthHelperMethods';
import API from '../../../utils/API';

class Story extends Component {
    Auth = new AuthHelperMethods();

    state = {
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

    _handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    _handleCheckboxChange = event => {
        const { share } = this.state;
        this.setState({ share: !share });
    };

    getSessionData = key => {
        return sessionStorage.getItem(key);
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { title, body, share } = this.state;
        const { pathname } = this.props.history.location;
        var PromptId = '';
        if (pathname.indexOf('/prompt/') === 0) {
            PromptId = parseInt(pathname.replace('/prompt/', ''));
        } else if (pathname.indexOf('/story/') === 0) {
            PromptId = parseInt(pathname.replace('/story/', ''));
        }
        const UserId = this.Auth.getConfirm().id;
        const data = {
            story: {
                title: title,
                body: body,
            },
            share: share,
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

    render() {
        const { forms, buttons } = this.props.styles;
        const { title, body, share } = this.state;
        return (
            <form className='story-form' style={forms.story.form}>
                <div className='form-group' style={forms.story.group}>
                    <label htmlFor='title' style={{ display: 'flex', justifyContent: 'flex-start', width: '25%', margin: 'auto' }}>
                        Title
                    </label>
                    <input
                        name='title'
                        type='text'
                        style={{ width: '25%' }}
                        onChange={this._handleChange}
                        value={title}
                    />
                </div>
                <br />
                <div className='form-group' style={forms.story.group}>
                    <label htmlFor='body' style={{ display: 'flex', justifyContent: 'flex-start', width: '50%', margin: 'auto' }}>
                        Story
                    </label>
                    <textarea
                        name='body'
                        rows='10'
                        style={{ width: '50%' }}
                        onChange={this._handleChange}
                        value={body}
                    />
                </div>
                <br />
                <div className='form-group' style={forms.story.group}>
                    <label htmlFor='share'>
                        Share
                    </label>
                    <input
                        name='share'
                        type='checkbox'
                        value={share}
                        onChange={this._handleCheckboxChange}
                        defaultChecked={true}
                    />
                </div>
                <div className='btn-group' style={buttons.group}>
                    <button id='save' name='save' style={buttons.save} onClick={this.handleFormSubmit}>Save</button>
                </div>
            </form>
        );
    };
};

export default Story;