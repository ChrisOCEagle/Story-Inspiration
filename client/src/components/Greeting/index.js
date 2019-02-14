import React from 'react';

function Greeting(props) {
    return(
        <div id='greeting' style={props.styles}>Welcome, {props.confirm.username}</div>
    );
};

export default Greeting;