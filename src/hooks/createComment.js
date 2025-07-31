import { axiosInstance } from "../utils/axiosInstance"

async function createComment(postId, text ,parentCommentId) {
    // console.log(parentCommentId)
    try {
        const response = await axiosInstance.post(`/v1/post/comment/${postId}`, {text , parentCommentId} , {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            // console.log(response)
            return response?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export default createComment