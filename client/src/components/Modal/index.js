import React from 'react';
import Login from '../Forms/Login';
import Signup from '../Forms/Signup';
import Button from '../Button';
import './style.css';

function Modal(props) {
    const { showModal, toggleModal, formId, history, styles } = props;
    return(
        <div className='modal-overlay' style={showModal ? { display: 'flex' } : { display: 'none' } }>
            <div className='modal'>
                <Button
                    className='close-button'
                    id='close'
                    name='close'
                    clickEvent1={toggleModal}
                    clickEvent2={() => {}}
                    styles={styles.buttons.close}
                    children='&times;'
                />
                <div className='modal-content'>
                    {
                        formId === 'login' ? <Login history={history} styles={styles.forms.login}/> :
                        formId === 'signup' ? <Signup history={history} styles={styles.forms.signup}/> :
                        null
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;