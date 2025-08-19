import { axiosInstance } from "../utils/axiosInstance";

async function getComments(postId) {
    try {
        const response = await axiosInstance.get(`/v1/post/getCommentsOfPost/${postId}`,{withCredentials:true})
        // console.log(response?.data)
        return response?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export default getComments