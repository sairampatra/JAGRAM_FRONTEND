import { axiosInstance } from "../utils/axiosInstance"

async function bookmark(postId) {
    try {
        const response = await axiosInstance.get(`/v1/post/bookmark/${postId}`,{withCredentials:true})
            return response?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export default bookmark