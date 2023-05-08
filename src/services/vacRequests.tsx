import axios from 'axios';
import { VacationRequest } from '../types';

const apiBaseUrl = '/api/requests';

const getAll = () => {
    const req = axios.get<VacationRequest[]>(apiBaseUrl)
    return req.then(response => response.data);
}

const create = async (newObject: VacationRequest) => {
    const response = await axios.post(apiBaseUrl, newObject)
    return response.data;
}

const remove = (id: number) => {
    const url = `${apiBaseUrl}/${id}`
    const req = axios.delete(url)
    return req.then(response => response.data);
}

const update = (id: number, changedObject: VacationRequest) => {
    const req = axios.put(`${apiBaseUrl}/${id}`, changedObject)
    return req.then(response => response.data);
}

export default {getAll, create, remove, update }