import { axiosInstance } from '../utils/axiosInstance'

async function signup(input) {
  try {
    let response = await axiosInstance.post("/v1/user/signup",input,{
        headers: {
  "Content-Type": "application/json"
},
// withCredentials: true

    })
    return response.data
  } catch (error) {
    console.log(error)
    return error?.response?.data 
  }
}

export default signup