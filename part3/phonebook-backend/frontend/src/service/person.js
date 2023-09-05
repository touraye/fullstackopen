import axios from "axios";

const baseUrl = '/api/persons'


const getAll = async () => {
    const request = axios.get( baseUrl );
    const response = await request;
    return response.data;
}

const addPerson = async ( object ) => {
    const request = axios.post(baseUrl, object)
    const response = await request;
    return response.data;
}

const deletePerson = ( id ) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = ( id, newNumber ) => {
    return axios.put(`${baseUrl}/${id}`, newNumber)
}

const services = {
    getAll,
    addPerson,
    deletePerson,
    updatePerson
}

export default services