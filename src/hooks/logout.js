import { axiosInstance } from '../utils/axiosInstance'

async function logout(input) {
  try {
    let response = await axiosInstance.get("/v1/user/logout",{withCredentials: true})
       
    return response.data
  } catch (error) {
    console.log(error)
    return error?.response?.data 
  }
}

export default logout