import axios from 'axios';
const url = '/api/persons';

const getAll = () => {
    const request = axios.get(url);
    return request.then(response => {
        return response.data;
    }
    );
}
const create = async(person) => {
    const request = await(axios.post(url, person));
    const response = await request;
    return response.data;
    
    
}
   
const update = (id, person) => {
    const request = axios.put(`${url}/${id}`, person);
    return request.then(response => {
        return response.data;
    }
    );
    }
const deletePerson = (id) => {
    const request = axios.delete(`${url}/${id}`);
    return request.then(response => {
        return response.data;
    }
    );
    }
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    create,
    update,
    deletePerson
}