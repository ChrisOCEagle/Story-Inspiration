import React, { Component } from 'react';
import { Container, Row, Col } from '../components/Grid';
import Navbar from '../components/Nav/Navbar';
import Jumbotron from '../components/Jumbotron';
import Header from '../components/Header';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Wrapper from '../components/Wrapper';
import Form from '../components/Form';
import API from '../utils/API';

class IndexPage extends Component {
    constructor() {
        super();

        this.state = {
            prompts: [],
            storyPrompts: [],
            formClass: '',
            showModal: false,
            promptCard: '',
            showPrompt: false,
            storyCard: '',
            showStory: false,
        };
    };

    componentDidMount() {
        this.getPrompts();
        this.clearData();
        this.getStories();
    };

    getPrompts = () => {
        API.prompts()
        .then(response => this.setState({ prompts: response.data }))
        .catch(err => console.log(err));
    };

    clearData = () => {
        return sessionStorage.clear();
    };

    getStories = () => {
        API.stories()
        .then(response => this.setState({ storyPrompts: response.data }))
        .catch(err => console.log(err));
    };

    handleFormChoice = async(formClass) => {
        await this.setState({ formClass: formClass });
    };

    handleToggleModal = async() => {
        await this.setState({ showModal: !this.state.showModal });
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
            <Container id='index' fluid>
                <Row id='navbar' fluid>
                    <Navbar
                        history={this.props.history}
                        formChoice={this.handleFormChoice}
                        toggleModal={this.handleToggleModal}
                        className='navbar'
                    />
                </Row>
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
                    <Row id='modal' fluid>
                        <Wrapper className='modal' id='modal' style={this.state.showModal ? { display: 'flex' } : {}}>
                            <Modal toggleModal={this.handleToggleModal}>
                                {
                                    this.state.formClass === 'signup' ?
                                        <Form history={this.props.history} className={this.state.formClass}>Sign-up</Form> :
                                    this.state.formClass === 'login' ?
                                        <Form history={this.props.history} className={this.state.formClass}>Log-in</Form> :
                                    null
                                }
                            </Modal>
                        </Wrapper>
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
                                                {prompt.title} &laquo;
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
                                                        <div
                                                            className={this.state.showPrompt && this.state.promptCard === prompt.id ? 'story-prompts card' : 'story-prompts'}
                                                            style={this.state.showPrompt && this.state.promptCard === prompt.id ?
                                                                    {
                                                                        width: '95%',
                                                                        margin: '10px 0',
                                                                        boxShadow: '4px 8px 16px 3px rgba(0, 0, 0, 0.3)',
                                                                        backgroundColor: '#ffd',
                                                                    } :
                                                                    {}}
                                                        >
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
                                                                    {storyPrompt.title} &laquo;
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
                </Container>
            </Container>
        );
    };
};

export default IndexPage;