import React from 'react';
import Logo from '../../Logo';
import NavItems from '../NavItems';
import './style.css';

function Navbar(props) {
    return(
        <nav className={props.className}>
            <Logo className='logo' alt='story-prompt-logo' children='WriteSpire'/>
            <NavItems
                history={props.history}
                confirm={props.confirm}
                formChoice={props.formChoice}
                logout={props.logout}
                toggleModal={props.toggleModal}
                className='nav-items'
            />
        </nav>
    );
};

export default Navbar;