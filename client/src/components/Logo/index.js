import React from 'react';
import logo from './story-prompt-logo.gif';

function Logo(props) {
    return(
        <img src={logo} alt='story-prompt-logo' className='logo' style={props.styles}/>
    );
};

export default Logo;