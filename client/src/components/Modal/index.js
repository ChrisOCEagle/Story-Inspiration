import React from 'react';
import Button from '../Button';
import './style.css';

function Modal(props) {
    return(
        <div className='modal-overlay' >
            <div className='modal'>
                <Button
                    className='btn'
                    id='close'
                    name='close'
                    clickEvent1={props.toggleModal}
                >
                    &times;
                </Button>
                <div className='modal-content'>{props.children}</div>
            </div>
        </div>
    );
};

export default Modal;