import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import SuggestedUsers from "./SuggestedUsers";
import SkeletonRightsideBar from "../skeletonLoders/SkeletonRightsideBar";
function RightSidebar() {
  const { user } = useSelector((state) => state.auth);
    const {isPostsLoading} = useSelector(store => store?.post)
    if (isPostsLoading) {
      return(
        <SkeletonRightsideBar/>
      )
    }
  
  return (
    <div className="px-2 md:pl-[9%] lg:pl-0 w-full lg:p-2 lg:w-[24%] lg:my-10 pt-3 lg:pr-7 font-fredoka  lg:block bg-[#fcfbfb] lg:bg-transparent">
      <div className="lg:flex items-center gap-2 hidden ">
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={user?.profilePicture}
              className='object-cover'
              
              alt="post_image"
            />
            <AvatarFallback>
              CN
            </AvatarFallback>
          </Avatar>
        </Link>
        <div >
          <h1 className="font-semibold text-sm"><Link to={`/profile/${user?._id}`}>{user?.username}</Link> </h1>
          <span className="text-gray-600 text-sm"> {user?.bio|| "Bio here..."}</span>
        </div>
      </div>
              <h1 className=' text-gray-600 lg:hidden mx-2'>Suggested for you</h1>

      <SuggestedUsers/>
    </div>
  );
}

export default RightSidebar;
