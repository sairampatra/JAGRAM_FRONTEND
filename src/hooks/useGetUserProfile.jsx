import { useDispatch } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";
import { useEffect } from "react";
import { setUserProfile } from "../redux/slices/authSlice";
import { toast } from "sonner";
export const fetchUserProfile = async (dispatch,userId) => {
  try {
    const response = await axiosInstance.get(`/v1/user/${userId}/profile` , {withCredentials:true});
    console.log(response)
    if (response?.data?.success) {
      dispatch(setUserProfile(response?.data?.user));
    }
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message || error?.message || "something went wrong"
    );
  }
};
const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUserProfile(dispatch , userId); //i moved this function out of this useeffect bcz i wanted to use this fetch function when i create a post
  }, [userId]);
};

export default useGetUserProfile;
