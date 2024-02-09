import axios from 'axios';

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://qa-dashboard-4gfp.onrender.com' : 'http://localhost:5001',
  headers: {
    'Content-type': 'application/json',
    'API-Key': process.env.REACT_APP_API_KEY
  }
});
