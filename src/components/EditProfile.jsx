import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {setAuthUser}  from '../redux/slices/authSlice'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import editProfile from "../hooks/editProfile";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const imageRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    profilePicture: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender,
  });
  const [loading , setLoading] = useState(false)

  const editProfileHandler = async () => {
    const formData = new FormData()
    formData.append('bio',input?.bio)
    formData.append('gender',input?.gender)
    if (input?.profilePicture) {
      formData.append('profilePicture',input?.profilePicture)
      
    }
    setLoading(true)
  const response =  await editProfile(formData)
const updatedData = response?.newUser
if (response?.success) {
const updatedUserData = {
  ...user,
  bio:updatedData.bio,
  gender:updatedData.gender,
  profilePicture:updatedData.profilePicture
}
dispatch(setAuthUser(updatedUserData))
navigate(`/profile/${user?._id}`)
                toast.success(response.message);

}else {
      toast.error(response?.response?.data?.message || response?.message || "something went wrong");
    }
    setLoading(false)
  }
  
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePicture: file });
  };
  const selectChangeHandler = (val) => {
    setInput({ ...input, gender: val });
  };
  return (
    <div className="flex max-w-2xl mx-auto pl-10 ">
      <div className="flex flex-col gap-6 w-full my-8">
        <h1 className="font-bold text-xl"> Edit Profile</h1>
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.profilePicture} alt="post_image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <span className="text-gray-600">
                {user?.bio || "Bio here..."}
              </span>
            </div>
          </div>
          <input ref={imageRef} type="file" onChange={fileChangeHandler} className="hidden" />
          <Button
            onClick={() => imageRef?.current.click()}
            className="bg-[#0095F6] h-8 hover:bg-[#318bc7]"
          >
            Change Photo
          </Button>
        </div>
        <div>
          <h1 className="font-bold text-xl md-2">Bio</h1>
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <h1 className="font-bold md-2 ">Gender</h1>
          <Select
            defaultValue={input?.gender}
            onValueChange={selectChangeHandler}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          {
            loading ? (
              <Button className='w-fit bg-[#0095F6] hover:bg-[#2a8ccd]'>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please Wait
              </Button>
            ) :(
              <Button onClick={editProfileHandler} className='w-fit bg-[#0095F6] hover:bg-[#2a8ccd]'> Submit</Button>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
