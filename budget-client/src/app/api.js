import axios from 'axios'

const baseUrl = 'http://localhost:5000/budget-a591b/us-central1/api'
const request = type => (url, data, config = {}) => axios[type](baseUrl + url, data, config)

export const api = {
  post: request('post'),
  get: request('get'),
}