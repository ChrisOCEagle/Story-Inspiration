import React from 'react';

function Jumbotron(props) {
    const { children, styles } = props;
    return(
        <div className='jumbotron' style={styles}>
            {children}
        </div>
    );
};

export default Jumbotron;