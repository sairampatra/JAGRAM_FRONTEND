import { axiosInstance } from "../utils/axiosInstance";

async function followUnfollow(userId) {
    try {
        const response = await axiosInstance.post(`/v1/user/followOrUnfollow/${userId}`,{},{withCredentials:true})
        return response?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export default followUnfollow