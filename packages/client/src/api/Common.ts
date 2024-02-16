import axios from 'axios'

export default axios.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'https://sdsdsd-9p5b.onrender.com'
            : 'http://localhost:5001',
    headers: {
        'Content-type': 'application/json',
    },
})
