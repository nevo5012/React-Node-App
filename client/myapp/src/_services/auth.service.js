import axios from 'axios';
import {Auth} from 'aws-amplify';

const apiURL = process.env.REACT_APP_NODEJS_SERVER_URL || 'http://localhost:8000';
const defaultOptions = {
    baseURL: apiURL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(async function (config) {
    const cognito = await Auth.currentSession();
    config.headers.Authorization =  cognito ? `Bearer ${cognito.idToken.jwtToken}` : '';
    return config;
  });

export {instance}