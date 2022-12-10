import Axios from '../axios'

export const gatewayFetch = (url, request) => Axios.post(url, request)
