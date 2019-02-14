import React, { Component } from 'react';
import AuthHelperMethods from './AuthHelperMethods';

export default function withAuth(AuthComponent) {
    const Auth = new AuthHelperMethods();

    return class AuthWrapped extends Component {
        // set up some state variables one that will determine if the components is loaded and the other that will confirm the authentication
        state = {
            loaded: false,
            confirm: null
        };

        /* after the component mounts verify the current user's authentication status */
        componentDidMount() {
            // if the user is not logged in
            if (!Auth.loggedIn()) {
                // replace the history with the index route
                this.props.history.replace('/');
            } else {
                // get a confirmation message
                try {
                    const confirm = Auth.getConfirm();
                    //console.log('Confirmation is: ' + confirm);
                    this.setState({
                        loaded: true,
                        confirm: confirm
                    });
                } catch (err) {
                    console.log(err);
                    Auth.logout();
                    this.props.history.replace('/');
                }
            }
        };

        render() {
            const { loaded, confirm } = this.state;
            if (loaded) {
                if (confirm) {
                    return(
                        <AuthComponent
                            history={this.props.history}
                            confirm={confirm}
                        />
                    );
                } else {
                    console.log('not confirmed');
                    return null;
                }
            } else {
                return null;
            }
        };
    };
};