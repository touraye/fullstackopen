import axios from "axios";

const baseUrl = "http://localhost:3001/persons"


const getAll = () => {
    return axios.get( baseUrl );
}

const addPerson = ( object ) => {
    return axios.post(baseUrl, object)
}

const services = {
    getAll,
    addPerson
}

export default services