import React, { Component } from 'react';
import withAuth from '../authentication/withAuth';
import AuthHelperMethods from '../authentication/AuthHelperMethods';
import { Container, Row, Col } from '../components/Grid';
import Navbar from '../components/Nav/Navbar';
import Jumbotron from '../components/Jumbotron';
import Header from '../components/Header';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import Wrapper from '../components/Wrapper';
import Form from '../components/Form';
import API from '../utils/API';

class Members extends Component {
    Auth = new AuthHelperMethods();

    constructor() {
        super();

        this.state = {
            prompts: [],
            prompt: [],
            storyPrompts: [],
            story: [],
            promptCard: '',
            showPrompt: false,
            storyCard: '',
            showStory: false,
        };
    };

    componentDidMount() {
        const UserId = this.Auth.getConfirm().id;
        var id = 0;
        if (this.props.history.location.pathname === '/prompts') {
            this.getPrompts();
            this.clearData();
            this.getStories();
        };
        if (this.props.history.location.pathname.indexOf('/prompt/') === 0) {
            id = parseInt(this.props.history.location.pathname.replace('/prompt/', ''));
            this.getPrompt(id)
            .then(PromptId => this.getStory(UserId, PromptId));    
        } else if (this.props.history.location.pathname.indexOf('/story/') === 0) {
            id = parseInt(this.props.history.location.pathname.replace('/story/', ''));
            this.getStoryPrompt(id);
        }
    };

    clearData = () => {
        return sessionStorage.clear();
    };

    storeData = (key, data) => {
        return sessionStorage.setItem(key, data);
    };

    getData = key => {
        return sessionStorage.getItem(key);
    };

    getPrompts = () => {
        API.prompts()
        .then(response => this.setState({ prompts: response.data }))
        .catch(err => console.log(err));
    };

    getStories = () => {
        API.stories()
        .then(response => this.setState({ storyPrompts: response.data }))
        .catch(err => console.log(err));
    };

    handleTogglePrompt = async() => {
        await this.setState({ showPrompt: !this.state.showPrompt });
    };

    handlePromptCardChoice = async(promptCard) => {
        await this.setState({ promptCard: promptCard });
    };

    handleToggleStory = async() => {
        await this.setState({ showStory: !this.state.showStory });
    };

    handleStoryCardChoice = async(storyCard) => {
        await this.setState({ storyCard: storyCard });
    };

    _handleLogout = () => {
        this.Auth.logout();
        this.props.history.replace('/');
    };

    getPrompt = promptId => {
        return new Promise((resolve, reject) => {
            API.prompt(promptId)
            .then(response => {
                this.storeData('prompt-id', response.data.id);
                this.storeData('prompt-title', response.data.title);
                this.storeData('prompt-body', response.data.text);
                this.setState({ prompt: response.data });
            })
            .catch(err => console.log(err));
            resolve(this.getData('prompt-id'));
        });
    };

    getStoryPrompt = (promptId) => {
        API.storyPrompt(promptId)
        .then(response => { response.data && this.sessionStory(response) })
        .catch(err => console.log(err));
    };


    getStory = (userId, promptId) => {
        API.story(userId, promptId)
        .then(response => { response.data && this.sessionStory(response) })
        .catch(err => console.log(err));
    };

    sessionStory = response => {
        this.storeData('story-title', response.data.title);
        this.storeData('story-body', response.data.story);
        this.storeData('story-shared', response.data.share);
        this.setState({ story: response.data });
    };

    handlePromptDetailsButton = prompt => {
        if (this.state.showPrompt && this.state.promptCard === prompt.id) {
            return <div>&#708;</div>;
        } else {
            return <div>&#709;</div>;
        };
    };

    handleStoryDetailsButton = prompt => {
        if (this.state.showStory && this.state.storyCard === prompt.id) {
            return <div>&#708;</div>;
        } else {
            return <div>&#709;</div>;
        };
    };


    render() {
        return(
            <Container id='members' fluid>
                <Row id='navbar' fluid>
                    <Navbar
                        history={this.props.history}
                        confirm={this.props.confirm}
                        logout={this._handleLogout}
                        className='navbar'
                    />
                </Row>
                {this.props.history.location.pathname === '/prompts' ?
                    <Container id='prompts'>
                        <Row id='jumbotron' fluid>
                            <Jumbotron>
                                <Row id='header'>
                                    <Header className='h1'>Group Story Writing</Header>
                                </Row>
                                <Row id='description'>
                                    <Section>
                                        Have you ever had writer's block? <br />
                                        Have you ever thought about writing a novel, but didn't know where to begin? <br />
                                        Do you need some inspiration for the next piece to your story? <br />
                                        Look no further! <br />
                                        Using this site, you can design a small piece of a story using the work of others as an inspiration! <br />
                                        So get out there and start writing!
                            </Section>
                                </Row>
                            </Jumbotron>
                        </Row>
                        <Row id='stories' fluid>
                            <Row id='header'>
                                <Header className='h2' style={{ textAlign: 'center' }}>
                                    Stories
                            </Header>
                            </Row>
                            {this.state.prompts.length > 0 ?
                                this.state.prompts.map((prompt, key) => (
                                    <Row key={key} id={prompt.id}>
                                        <Card id={prompt.id} className='prompt-card'>
                                            <div className='card-title'>
                                                <Button
                                                    className='prompt'
                                                    id={prompt.id}
                                                    name={prompt.title}
                                                    href={'/prompt/' + prompt.id}
                                                    headerName='h3'
                                                >
                                                    &raquo; {prompt.title}
                                                </Button>
                                                <Button
                                                    className='btn'
                                                    id={prompt.id}
                                                    name='details'
                                                    clickEvent1={this.handleTogglePrompt}
                                                    clickEvent2={this.handlePromptCardChoice}
                                                    children={this.handlePromptDetailsButton(prompt)}
                                                />
                                            </div>
                                            <Wrapper
                                                className='prompt-body'
                                                id='card'
                                                style={this.state.showPrompt && this.state.promptCard === prompt.id ? { display: 'flex' } : {}}
                                            >
                                                {prompt.text ?
                                                    <Section>{prompt.text}</Section> :
                                                    <img src={prompt.src} alt={prompt.alt} />
                                                }
                                            </Wrapper>
                                            {this.state.storyPrompts.length > 0 ?
                                                this.state.storyPrompts.map((storyPrompt, key) => (
                                                    <div key={key}>
                                                        {prompt.id === storyPrompt.PromptId ?
                                                            <div className='story-prompts'>
                                                                <Wrapper
                                                                    className='story-title'
                                                                    id='card'
                                                                    style={this.state.showPrompt && this.state.promptCard === prompt.id ? { display: 'flex' } : {}}
                                                                >
                                                                    <Button
                                                                        className='story-prompt'
                                                                        id={storyPrompt.id}
                                                                        name={storyPrompt.title}
                                                                        headerName='h3'
                                                                        href={'/story/' + storyPrompt.id}
                                                                    >
                                                                        >> {storyPrompt.title}
                                                                    </Button>
                                                                    <Button
                                                                        className='btn'
                                                                        id={storyPrompt.id}
                                                                        name='details'
                                                                        clickEvent1={this.handleToggleStory}
                                                                        clickEvent2={this.handleStoryCardChoice}
                                                                        children={this.handleStoryDetailsButton(storyPrompt)}
                                                                    />
                                                                </Wrapper>
                                                                <Wrapper
                                                                    className='story-body'
                                                                    id='card'
                                                                    style={this.state.showStory && this.state.storyCard === storyPrompt.id ? { display: 'flex' } : {}}
                                                                >
                                                                    <Section>{storyPrompt.story}</Section>
                                                                </Wrapper>
                                                            </div>
                                                            : null
                                                        }
                                                    </div>
                                                )) :
                                                null
                                            }
                                        </Card>
                                    </Row>
                                )) : null
                            }
                        </Row>
                    </Container> : 
                    <Container id='prompt'>
                        <Row id='jumbotron' fluid>
                            <Jumbotron>
                                <Row id='header'>
                                    <Header className='h1'>
                                        {
                                            this.state.prompt && this.state.prompt.title ? this.state.prompt.title :
                                            this.state.story && this.state.story.title ? this.state.story.title :
                                            null
                                        }
                                    </Header>
                                </Row>
                                <Row id='prompt-body'>
                                    <Section>
                                        {
                                            this.state.prompt && this.state.prompt.text ? this.state.prompt.text :
                                            this.state.story && this.state.story.story ? this.state.story.story :
                                            <img src={this.state.prompt.src} alt={this.state.prompt.alt}/>
                                        }
                                    </Section>
                                </Row>
                            </Jumbotron>
                        </Row>
                        <Row id='story'>
                            <Card className='story' id='story'>
                                <Form history={this.props.history} className='story'>Story</Form>
                            </Card>
                        </Row>
                    </Container>
                }
            </Container>
        );
    };
};

export default withAuth(Members);