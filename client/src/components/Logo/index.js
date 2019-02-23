import React from 'react';
import logo from './story-prompt-logo.png';
import './style.css';

function Logo(props) {
    return(
        <div className={props.className}>
            <img src={logo} alt={props.alt}/>
            <p>{props.children}</p>
        </div>
    );
};

export default Logo;