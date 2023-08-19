import axios from 'axios';

const instance = axios.create({
    
    baseURL:'https://us-central1-clone-1aaf7.cloudfunctions.net/api'
});
// 'http://127.0.0.1:5001/clone-1aaf7/us-central1/api/'

export default instance;