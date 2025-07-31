import { axiosInstance } from '../utils/axiosInstance'

async function login(input) {
  try {
    let response = await axiosInstance.post("/v1/user/signin",input,{
        headers: {
  "Content-Type": "application/json"
},
withCredentials: true

    })
    return response.data
  } catch (error) {
    console.log(error)
    return error?.response?.data 
  }
}

export default login