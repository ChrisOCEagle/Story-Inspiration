import React from 'react';
import Button from '../Button';

function Card(props) {
    const { id, title, styles, toggleCardBody, cardChoice, getStories } = props;
    return (
        <div className={'card-' + id} style={styles.card.card}>
            <a href={'/prompt/' + id} id='prompt' style={styles.buttons.link}>
                <h3>{title}</h3>
            </a>
            <Button
                name={'prompt-' + id + '-details'}
                id={id}
                styles={styles.buttons.details}
                clickEvent1={toggleCardBody}
                clickEvent2={cardChoice}
                clickEvent3={getStories}
                children='...'
            />
        </div>
    );
};

export default Card;