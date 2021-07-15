import { useState } from 'react';
import axios from 'axios';
import config from './config';

export const authService = {
    register,
      login,
    logout
    //currentUser: currentUserSubject.asObservable(),
    //get currentUserValue () { return currentUserSubject.value }
};
async function login(credentials){
    
    let url = `http://localhost:8000/api/users/authenticate`
    try {
        let resp = await axios.post(url , credentials);
        return resp.data
      }
      catch
      {
        return { email: '' }
      }
    }
     
function register(obj) {
   
    return axios.post(`http://localhost:8000/api/users/register`,obj)
    .then(res => {
         
        return res.data
    })
}

function logout() {

    sessionStorage.clear();
    window.location.assign('/login');
  
}