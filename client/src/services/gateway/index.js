import axios from 'axios'

export const gatewayFetch = (url, request) =>
  axios.post(url, request, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
