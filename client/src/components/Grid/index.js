import React from 'react';

export function Container(props) {
    const { fluid, children, id, styles } = props;
    return (
        <div className={`container${fluid ? '-fluid' : ''}`} id={id} style={styles.container}>{children}</div>
    );
};

export function Row(props) {
    const { fluid, children, id, styles } = props;
    return (
        <div className={`row${fluid ? '-fluid' : ''}`} id={id} style={styles.row}>{children}</div>
    );
};

export function Col(props) {
    const { size, children, id, styles } = props;
    return(
        <div className={size.split(' ').map(size => 'col-' + size).join(' ')} id={id} style={styles.col}>{children}</div>
    );
};