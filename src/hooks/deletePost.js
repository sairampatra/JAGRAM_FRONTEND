import { axiosInstance } from "../utils/axiosInstance";

async function deletePost(postId) {
  try {
    const response = await axiosInstance.post(`/v1/post/deletePost/${postId}` ,{}, {withCredentials:true});
    return response?.data;
  } catch (error) {
    return error;
  }
}

export default deletePost;
