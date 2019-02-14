import React from 'react';

function Header(props) {
    const { children, className, styles } = props;
    if (className === 'jumbotron') {
        return(
            <h1 className={`${className ? className + '-' : ''}header`} style={styles}>{children}</h1>
        );
    } else {
        return(
            <h2 className={`${className ? className + '-' : ''}header`} style={styles}>{children}</h2>
        );
    }
};

export default Header;