import { useDispatch } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";
import { useEffect } from "react";
import { setPosts , setIsPostsLoading } from "../redux/slices/postSlice";
import { toast } from "sonner";
export const fetchAllPost = async (dispatch) => {
  try {
    dispatch(setIsPostsLoading(true))
    const response = await axiosInstance.get("/v1/post/getAllPost" , {withCredentials:true});
    // console.log(response);
    if (response?.data?.success) {
      console.log(response?.data?.posts)
      dispatch(setPosts(response?.data?.posts));
    }
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message || error?.message || "something went wrong"
    );
  }finally{
        dispatch(setIsPostsLoading(false))
  }
};
const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllPost(dispatch); //i moved this function out of this useeffect bcz i wanted to use this fetch function when i create a post
  }, [dispatch]);
};

export default useGetAllPost;
