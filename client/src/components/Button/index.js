import React, { Component } from 'react';

class Button extends Component {
    render() {
        const { id, name, clickEvent1, clickEvent2, clickEvent3, children, styles } = this.props;
        return(
            <button
                className='btn'
                id={id}
                name={name}
                style={styles}
                onClick={
                    clickEvent2 && clickEvent3 ? 
                    () => {
                        clickEvent1();
                        clickEvent2(id);
                        clickEvent3(id);
                    } :
                    clickEvent2 ?
                    () => {
                        clickEvent1();
                        clickEvent2(id);
                    } :
                    () => {
                        clickEvent1();
                    }
                }
            >
                {children}
            </button>
        );
    };
};

export default Button;