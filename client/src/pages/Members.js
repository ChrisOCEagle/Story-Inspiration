import React, { Component } from 'react';
import withAuth from '../authentication/withAuth';
import AuthHelperMethods from '../authentication/AuthHelperMethods';
import { Container, Row, Col } from '../components/Grid';
import Navbar from '../components/Nav/Navbar';
import Jumbotron from '../components/Jumbotron';
import Header from '../components/Header';
import Section from '../components/Section';
import Card from '../components/Card';
import CardBody from '../components/CardBody';
import Story from '../components/Forms/Story';
import Footer from '../components/Footer';
import API from '../utils/API';

class Members extends Component {
    Auth = new AuthHelperMethods();

    constructor() {
        super();

        this.state = {
            prompts: [],
            showBody: false,
            cardId: '',
            prompt: [],
            storyPrompts: [],
            story: [],
        };
    };

    componentDidMount() {
        const { pathname } = this.props.history.location;
        const UserId = this.Auth.getConfirm().id;
        var id = 0;
        this.handleScrape();
        if (pathname === '/prompts') {
            this.clearData();
            this.getPrompts();
            //this.getStories(userId);
        }
        if (pathname.indexOf('/prompt/') === 0) {
            id = parseInt(pathname.replace('/prompt/', ''));
            this.getPrompt(id)
            .then(PromptId => this.getStory(UserId, PromptId));    
        } else if (pathname.indexOf('/story/') === 0) {
            id = parseInt(pathname.replace('/story/', ''));
            this.getStoryPrompt(UserId, id);
        }
    };

    storeData = (key, data) => {
        return sessionStorage.setItem(key, data);
    };

    getData = key => {
        return sessionStorage.getItem(key);
    };

    clearData = () => {
        return sessionStorage.clear();
    };

    getPrompts = () => {
        API.prompts()
        .then(response => this.setState({ prompts: response.data }))
        .catch(err => console.log(err));
    };

    scrapePrompts = () => {
        API.scrape()
        .then(response => alert(response.data))
        .catch(err => console.log(err));
    };

    handleScrape = () => {
        const { scrape } = this.state;
        this.setState({ scrape: !scrape });
        if (scrape) {
            this.scrapePrompts();
        }
    };

    styles = {
        nav: {
            logo: {
                borderRadius: '50%',
                width: '8%',
            },
            navItems: {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '17%',
            },
            navbar: {
                display: 'flex',
                justifyContent: 'space-between',
                height: '80px',
                padding: '5px 0',
                backgroundColor: 'grey',
            },
            greeting: {
                margin: '0 2%',
                padding: '0 10px',
                width: '50%',
                whiteSpace: 'nowrap',
            },
        },
        buttons: {
            group: {
                width: '50%',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'flex-end',
            },
            login: {
                height: '100%',
                margin: '0 5px',
                borderRadius: '12%',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
            },
            signup: {
                height: '100%',
                margin: '0 5px',
                borderRadius: '12%',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
            },
            logout: {
                height: '100%',
                margin: '0 5px',
                borderRadius: '12%',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
            },
            details: {
                display: 'flex',
                justifyContent: 'center',
                //position: 'fixed',
                fontSize: '18px',
                padding: '1px 6px 8px',
                alignItems: 'center',
                margin: 'auto 0',
                lineHeight: '50%',
                borderRadius: '10%',
                height: '8%',
            },
            link: {
                color: 'initial',
                textDecoration: 'none',
            },
            close: {
                position: 'absolute',
                top: '0',
                right: '0',
                backgroundColor: '#fff',
                width: '2.5rem',
                height: '2.5rem',
                padding: '0',
                border: '0',
                outline: '0',
                boxShadow: '0 0 0.625rem rgba(0, 0, 0, 0.2)',
                fontSize: '200%',
                borderRadius: '50%',
            },
            save: {
                margin: '0 5px',
                padding: '5px',
                borderRadius: '15%',
            },
            share: {
                margin: '0 5px',
                padding: '5px',
                borderRadius: '15%',
            },
        },
        jumbotron: {
            section: {
                display: 'flex',
                justifyContent: 'center',
            },
            jumbotron: {
                padding: '30px',
                backgroundColor: '#ffc',
            },
        },
        header: {
            textAlign: 'center',
        },
        forms: {
            signup: {
                form: {
                    padding: '10px',
                },
                group: {
                    textAlign: 'center',
                },
            },
            login: {
                form: {
                    padding: '10px',
                },
                group: {
                    textAlign: 'center',
                },
            },
            story: {
                form: {
                    padding: '10px',
                },
                group: {
                    textAlign: 'center',
                },
            },
        },
        card: {
            card: {
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 40px',
                width: '50%',
                boxShadow: '2px 4px 8px 3px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#ffc',
                margin: '15px auto',
            },
            body: {
                padding: '5px 100px',
                width: '25%',
                display: 'flex',
                justifyContent: 'center',
                boxShadow: '3px 5px 9px 4px rgba(0, 0, 0, 0.4)',
                backgroundColor: '#ffc',
                margin: 'auto',
            },
            title: {
                padding: '5px 40px',
                width: '30%',
                boxShadow: '2px 4px 8px 3px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#ffc',
                margin: '15px auto',
            },
            story: {
                padding: '5px 100px',
                width: '15%',
                display: 'flex',
                justifyContent: 'center',
                boxShadow: '3px 5px 9px 4px rgba(0, 0, 0, 0.4)',
                backgroundColor: '#ffc',
                margin: 'auto',
            },
        },
        grid: {
            container: {
                display: 'grid',
                gridGap: '25px',
            },
            row: {
                display: 'grid',
                gridRowGap: '25px',
            },
            col: {
                display: 'grid',
                gridColumnGap: '10px',
            },
        },
        footer: {
            position: 'sticky',
            bottom: '0',
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            margin: 'auto',
            fontSize: '20px',
            backgroundColor: 'darkslategrey',
        },
        image: {
            width: '30%',
            height: '30%',
        },
    };

    _handleLogout = () => {
        this.Auth.logout();
        this.props.history.replace('/');
    };

    handleToggleCardBody = () => {
        const { showBody } = this.state;
        this.setState({ showBody: !showBody });
    };

    handleCardChoice = cardId => {
        this.setState({ cardId: cardId });
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

    getStoryPrompt = (userId, promptId) => {
        API.storyPrompt(userId, promptId)
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

    getStories = promptId => {
        API.stories(promptId)
        .then(response => this.setState({ storyPrompts: response.data }))
        .catch(err => console.log(err));
    };

    render() {
        const { history, confirm } = this.props;
        const { prompts, showBody, cardId, prompt, storyPrompts, story } = this.state;
        return(
            <Container id='members' fluid styles={this.styles.grid}>
                <Row id='nav' styles={this.styles.grid}>
                    <Navbar
                        history={history}
                        confirm={confirm}
                        logout={this._handleLogout}
                        styles={this.styles}
                    />
                </Row>
                {
                    history.location.pathname === '/prompts' ?
                        <Container id='intro' styles={this.styles.grid}>
                            <Row id='jumbotron' styles={this.styles.grid}>
                                <Jumbotron styles={this.styles.jumbotron.jumbotron}>
                                    <Header history={history} className='jumbotron' styles={this.styles.header}>
                                        Group Story Writing
                                    </Header>
                                    <Section styles={this.styles.jumbotron.section}>
                                        Have you ever had writer's block? <br/>
                                        Have you ever thought about writing a novel, but didn't know where to begin? <br/>
                                        Do you need some inspiration for the next piece to your story? <br/>
                                        Look no further! <br/>
                                        Using this site, you can design a small piece of a story using the work of others as an inspiration! <br/>
                                        So get out there and start writing!
                                    </Section>
                                </Jumbotron>
                            </Row>
                            <Row id='stories' styles={this.styles.grid}>
                                <Header history={history} className='stories' styles={this.styles.header}>
                                    Stories
                                </Header>
                                {
                                    prompts.length > 0 ?
                                        prompts.map((prompt, key) => <Row key={key} styles={this.styles.grid}>
                                            <Col size='md-12' id={prompt.id} styles={this.styles.grid}>
                                                <Card
                                                    id={prompt.id}
                                                    title={prompt.title}
                                                    prompt={prompt}
                                                    showBody={showBody}
                                                    toggleCardBody={this.handleToggleCardBody}
                                                    cardChoice={this.handleCardChoice}
                                                    getStories={this.getStories}
                                                    cardId={cardId}
                                                    styles={this.styles}
                                                />
                                            </Col>
                                            <Col size='md-12' id={prompt.id} styles={this.styles.grid}>
                                                <Row styles={this.styles.grid}>
                                                    <CardBody
                                                        prompt={prompt}
                                                        id={prompt.id}
                                                        styles={this.styles}
                                                        showBody={showBody}
                                                        cardId={cardId}
                                                        storyPrompts={storyPrompts}
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>) : null
                                }
                            </Row>
                        </Container> :
                        <Container id='prompt' styles={this.styles.grid}>
                            <Row id='jumbotron' styles={this.styles.grid}>
                                <Jumbotron styles={this.styles.jumbotron.jumbotron}>
                                    <Header history={history} className='jumbotron' styles={this.styles.header}>
                                        {
                                            prompt && prompt.title ? prompt.title : 
                                            story && story.title ? story.title :
                                            null
                                        }
                                    </Header>
                                    <Section styles={this.styles.jumbotron.section}>
                                        {
                                            prompt && prompt.text ? prompt.text :
                                            story && story.story ? story.story :
                                            <img src={prompt.src} alt={prompt.alt} style={this.styles.image}></img>
                                        }
                                    </Section>
                                </Jumbotron>
                            </Row>
                            <Row id='story' styles={this.styles.grid}>
                                <Story history={history} styles={this.styles}/>
                            </Row>
                        </Container>
                }
                <Row id='footer' styles={this.styles.grid}>
                    <Footer styles={this.styles.footer}>
                        Here is some footer content.
                    </Footer>
                </Row>
            </Container>
        );
    };
};

export default withAuth(Members);