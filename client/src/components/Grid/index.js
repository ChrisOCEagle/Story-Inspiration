import React from 'react';
import './style.css';

export function Container(props) {
    return(
        <div className={`container${props.fluid ? '-fluid' : ''}`} id={props.id}>{props.children}</div>
    );
};

export function Row(props) {
    return(
        <div className={`row${props.fluid ? '-fluid' : ''}`} id={props.id}>{props.children}</div>
    );
};

export function Col(props) {
    return(
        <div
            className={props.size.split(' ').map(size => 'col-' + size).join(' ')}
            id={props.id}
        >
            {props.children}
        </div>
    );
};