import { axiosInstance } from "../utils/axiosInstance";

async function isToken(userId) {
    try {
        const response = await axiosInstance.get(`/v1/user/isToken`,{withCredentials:true})
        // console.log(response)
        return response?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export default isToken