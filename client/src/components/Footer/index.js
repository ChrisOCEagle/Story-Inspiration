import React from 'react';

function Footer(props) {
    const { children, styles } = props;
    return(
        <footer className='footer' id='footer' style={styles}>{children}</footer>
    );
};

export default Footer;