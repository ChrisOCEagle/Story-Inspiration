import React from 'react';
import Greeting from '../../Greeting';
import Button from '../../Button';
import './style.css';

function NavItems(props) {
    if (props.history.location.pathname === '/') {
        return(
            <div className={props.className}>
                <Button
                    className='btn'
                    id='login'
                    name='Log-in'
                    clickEvent1={props.toggleModal}
                    clickEvent2={props.formChoice}
                >
                    Log-in
                </Button>
                <Button
                    className='btn'
                    id='signup'
                    name='Sign-up'
                    clickEvent1={props.toggleModal}
                    clickEvent2={props.formChoice}
                >
                    Sign-up
                </Button>
            </div>
        );
    } else {
        return(
            <div className={props.className}>
                <Greeting confirm={props.confirm} id='greeting'/>
                <Button className='btn' id='logout' name='Log-out' clickEvent1={props.logout}>Log-out</Button>
            </div>
        );
    }
};

export default NavItems;