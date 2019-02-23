import React from 'react';
import './style.css';

function Wrapper(props) {
    switch (props.id) {
        case 'card': 
        case 'modal':
            return(
                <div className={props.className + ' ' + props.id + '-wrapper'} style={props.style}>{props.children}</div>
            );
        default: 
            return(
                <div className={props.className + ' wrapper'} style={props.style}>{props.children}</div>    
            );
    }
};

export default Wrapper;