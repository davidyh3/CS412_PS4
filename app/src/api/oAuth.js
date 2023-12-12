import axios from 'axios';

export const validateUser = async (token) => {
    const res = await axios.get('http://localhost:4000/users/login', {
        headers: {
            Authorization: "Bearer " + token 
        },
    });
    return res.data;
};