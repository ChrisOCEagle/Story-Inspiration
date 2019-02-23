import React from 'react';
import './style.css';

function Section(props) {
    return(
        <p className='section'>{props.children}</p>
    );
};

export default Section;