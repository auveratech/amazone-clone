import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-e75b9.cloudfunctions.net/api' //API URL (cloud function)
    // http://localhost:5001/clone-e75b9/us-central1/api
});

export default instance;

