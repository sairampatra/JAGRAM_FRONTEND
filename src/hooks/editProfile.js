import { axiosInstance } from "../utils/axiosInstance"

async function editProfile(formData){
    try {
       const response = await axiosInstance.post('/v1/user/profile/edit' , formData ,{
        headers : {
            'Content-Type':"multipart/form-data"
        },
        withCredentials:true
       })
       console.log(response)
       return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
export default editProfile