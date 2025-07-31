import { axiosInstance } from "../utils/axiosInstance";

async function dislikePost(postId) {
   try {
    const result = await axiosInstance.post(`v1/post/dislikePost/${postId}`,{},{withCredentials:true})
    return result?.data
   } catch (error) {
    console.log(error)
    return error
   } 
}

export default dislikePost