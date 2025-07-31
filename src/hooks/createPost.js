import { axiosInstance } from "../utils/axiosInstance";

async function createPost(input){
try {
   const response  =  await axiosInstance.post("/v1/post/post",input,{
    // headers:{
    //      "Content-Type":"application/json"
    // },
   withCredentials:true
   })
   return response?.data
} catch (error) {
    console.log(error)
    return error
}
}

export default createPost