import decode from 'jwt-decode';

export default class AuthHelperMethods {
    login = (username, password) => {
        // GET a token from the api server using the fetch api
        return this.fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            // set the token in local storage
            this.setToken(res.token);
            return Promise.resolve(res)
        });
    };

    loggedIn = () => {
        // check if there is a valid saved token
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            // checking if the token is expired
            if (decoded.exp() < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            //console.log('expired check failed! Line 42: AuthService.js');
            return false;
        }
    };

    setToken = idToken => {
        // save the user token to local storage
        localStorage.setItem('id_token', idToken);
    };

    getToken = () => {
        // retrieve the token from local storage
        return localStorage.getItem('id_token');
    };

    logout = () => {
        return localStorage.removeItem('id_token');
    };

    getConfirm = () => {
        // use jwt-decode to decode the web token
        let answer = decode(this.getToken());
        //console.log('received answer!');
        return answer;
    };

    fetch = (url, options) => {
        // performs api calls sending the required authentication headers
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        // set the authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json());
    };

    _checkStatus = response => {
        /* raises an error in case the response status is not a success, the status code lies between 200 and 300 */
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var err = new Error(response.statusText);
            err.response = response;
            throw err;
        }
    };
};