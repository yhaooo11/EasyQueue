import axios from 'axios'
const baseUrl = '/api/queues'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const updateQueue = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

export default { getAll, getOne, create, updateQueue, setToken }