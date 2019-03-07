import React from 'react';
import './style.css';

function Card(props) {
    if (typeof props.style != 'undefined') {
        return(
            <div className='card-overlay'>
                <div
                    className={'card ' + props.className}
                    id={props.id}
                    style={props.style}
                >
                    {props.children}
                </div>
            </div>
        );
    } else {
        return(
            <div className='card-overlay'>
                <div className={'card ' + props.className} id={props.id}>{props.children}</div>
            </div>
        );
    };
};

export default Card;