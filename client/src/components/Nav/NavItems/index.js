import React from 'react';
import Button from '../../Button';
import Greeting from '../../Greeting';

function NavItems(props) {
    const { pathname } = props.history.location;
    const { toggleModal, formChoice, logout, confirm, styles } = props;
    return(
        <div className='nav-items' style={styles.nav.navItems}>
            {
                pathname === '/'
                ?   <Button
                        id='login'
                        name='Log-in'
                        clickEvent1={toggleModal}
                        clickEvent2={formChoice}
                        children='Log-in'
                        styles={styles.buttons.login}
                    />
                :   <Greeting confirm={confirm} styles={styles.nav.greeting}/>
            }
            {
                pathname === '/'
                ?   <Button
                        id='signup'
                        name='Sign-up'
                        clickEvent1={toggleModal}
                        clickEvent2={formChoice}
                        children='Sign-up'
                        styles={styles.buttons.signup}
                    />
                :   <Button
                        id='logout'
                        name='Log-out'
                        clickEvent1={logout}
                        children='Log-out'
                        styles={styles.buttons.logout}
                    />
            }
        </div>
    );
};

export default NavItems;