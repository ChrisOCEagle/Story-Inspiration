import React from 'react';

function Section(props) {
    const { children, styles } = props;
    return(
        <p className='section' style={styles}>{children}</p>
    );
};

export default Section;