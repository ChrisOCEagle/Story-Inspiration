import React from 'react';
import './style.css';

function Header(props) {
    if (typeof props.style != 'undefined') {
        if (props.className === 'h1') {
            return <h1 style={props.style}>{props.children}</h1>;
        } else if (props.className === 'h2') {
            return <h2 style={props.style}>{props.children}</h2>;
        } else if (props.className === 'h3') {
            return <h3 style={props.style}>{props.children}</h3>;
        } else if (props.className === 'h4') {
            return <h4 style={props.style}>{props.children}</h4>;
        } else if (props.className === 'h5') {
            return <h5 style={props.style}>{props.children}</h5>;
        } else if (props.className === 'h6') {
            return <h6 style={props.style}>{props.children}</h6>;
        };    
    } else {
        if (props.className === 'h1') {
            return <h1>{props.children}</h1>;
        } else if (props.className === 'h2') {
            return <h2>{props.children}</h2>;
        } else if (props.className === 'h3') {
            return <h3>{props.children}</h3>;
        } else if (props.className === 'h4') {
            return <h4>{props.children}</h4>;
        } else if (props.className === 'h5') {
            return <h5>{props.children}</h5>;
        } else if (props.className === 'h6') {
            return <h6>{props.children}</h6>;
        };    
    };
};

export default Header;