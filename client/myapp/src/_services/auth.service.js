import { useState } from 'react';
import axios from 'axios';
import config from 'config';

export const authService = {
    login,
    logout
    //currentUser: currentUserSubject.asObservable(),
    //get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return axios.post(`${config.apiUrl}/users/authenticate`,JSON.stringify({ username, password }))
    .then(res => {
        console.log(res);
    })
}

function logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('currentUser');
    //currentUserSubject.next(null);
}