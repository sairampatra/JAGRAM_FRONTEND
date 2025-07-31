import { axiosInstance } from "../utils/axiosInstance";

async function likePost(postId) {
   try {
    const result = await axiosInstance.post(`v1/post/likePost/${postId}`,{},{withCredentials:true})
    return result?.data
   } catch (error) {
    console.log(error)
    return error
   } 
}

export default likePost