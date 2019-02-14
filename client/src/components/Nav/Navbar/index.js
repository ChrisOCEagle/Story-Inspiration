import React from 'react';
import Logo from '../../Logo';
import NavItems from '../NavItems';

function Navbar(props) {
    const { history, toggleModal, formChoice, logout, confirm, styles } = props;
    return(
        <nav className='nav' style={styles.nav.navbar}>
            <Logo styles={styles.nav.logo}/>
            <NavItems
                history={history}
                toggleModal={toggleModal}
                formChoice={formChoice}
                logout={logout}
                confirm={confirm}
                styles={styles}
            />
        </nav>
    );
};

export default Navbar;