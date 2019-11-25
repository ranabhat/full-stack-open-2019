import axios from 'axios'
const baseUrl = BACKEND_URL

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data

}

const update = async(id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const comment = async(id, newObject) => {

  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  return response.data
}

const deletes = async(id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  // console.log(config)
  return await axios.delete(`${baseUrl}/${id}`, config, newObject)

}

export default { getAll, setToken, create, update, deletes, comment }