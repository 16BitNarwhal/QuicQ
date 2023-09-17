import axios from 'axios'
//create axios instance using create method of axios object
const request = axios.create({
  //Base Url
  baseURL: "http://10.33.130.14:5000",
  timeout: 5000,
})
//add request and response interceptors to request instance
request.interceptors.request.use((config) => {
  //return config object
  return config
})

request.interceptors.response.use(
  (response) => {
    //success
    return response.data
  },
  (error) => {
    //fail
    return Promise.reject(error)
  },
)

export default request