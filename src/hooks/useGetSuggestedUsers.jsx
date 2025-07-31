import { useDispatch } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";
import { useEffect } from "react";
import { setSuggestedUsers } from "../redux/slices/authSlice";
import { toast } from "sonner";
export const fetchSuggestedUsers = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/v1/user/suggested" , {withCredentials:true});
    if (response?.data?.success) {
      dispatch(setSuggestedUsers(response?.data?.users));
    }
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message || error?.message || "something went wrong"
    );
  }
};
const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchSuggestedUsers(dispatch); 
  }, [dispatch]);
};

export default useGetSuggestedUsers;
