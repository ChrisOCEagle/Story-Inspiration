import React from 'react';
import './style.css';

function Greeting(props) {
    return(
        <div id={props.id}>Welcome, {props.confirm.username}</div>
    );
};

export default Greeting;