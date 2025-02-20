import axios from 'axios'
const baseURL = '/api/persons'
//const baseURL = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request =  axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)

}

const deletes = (id, newObject) => {
    return axios.delete(`${baseURL}/${id}`, newObject)
}

export default { getAll, create, update, deletes}