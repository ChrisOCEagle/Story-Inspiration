import React from 'react';
import { List, ListItem } from '../List';
import { Row } from '../Grid';

function CardBody(props) {
    const { prompt, id, styles, showBody, cardId, storyPrompts } = props;
    return(
        <div className={'card-body-overlay'} style={showBody && cardId === id ? {display: 'flex'} : {display: 'none'}}>
            <List>
                <div className={'card-body-' + id} style={styles.card.body}>
                    {prompt.text === null ?
                        <img src={prompt.src} alt={prompt.alt}/> : 
                        <Row styles={styles.grid}>
                            <h5 id={id}>{prompt.text}</h5>
                        </Row>}
                </div>
                <Row styles={styles.grid}>
                    {storyPrompts.length > 0 ?
                        storyPrompts.map(story => (
                            <ListItem key={story.id}>
                                <Row styles={styles.grid}>
                                    <div style={styles.card.title}>
                                        <a href={'/story/' + story.id} id='story' style={styles.buttons.link}>
                                            <h3>{story.title}</h3>
                                        </a>
                                        <p style={{display: 'flex'}}>{story.story}</p>
                                    </div>
                                </Row>
                            </ListItem>
                        )) : null
                    }
                </Row>
            </List>
        </div>
    );
};

export default CardBody;