import React from 'react';
import './style.css';

function Label(props) {
    return(
        <label htmlFor={props.htmlFor} className={props.className}>{props.children}</label>
    );
};

export default Label;