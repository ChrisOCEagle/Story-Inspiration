import React from 'react';
import './style.css';

function Card(props) {
    return(
        <div className='card-overlay'>
            <div className={'card ' + props.className} id={props.id}>{props.children}</div>
        </div>
    );
};

export default Card;