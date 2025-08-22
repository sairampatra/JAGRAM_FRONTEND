import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import followUnfollow from '../hooks/followUnfollow'
import { setAuthUser } from "../redux/slices/authSlice.js"

function SuggestedUsers() {
  const dispatch = useDispatch()
  const { suggestedUsers, user: loggedInUser } = useSelector(state => state.auth)

  const handleFollowUnfollow = async (userId) => {
    const response = await followUnfollow(userId)

    if (response?.success) {
      let newFollowingArray;

      if (loggedInUser?.following?.includes(userId)) {
        // Unfollow logic — remove the ID
        newFollowingArray = loggedInUser.following.filter(id => id !== userId)
      } else {
        // Follow logic — add the ID
        newFollowingArray = [...loggedInUser.following, userId]
      }

      dispatch(setAuthUser({
        ...loggedInUser,
        following: newFollowingArray
      }))

      toast.success(response.message)
    } else {
      toast.error(
        response?.response?.data?.message ||
        response?.message ||
        "something went wrong"
      )
    }
  }

  return (
    <div className='lg:my-5 h-24 lg:h-auto hide-scrollbar overflow-auto flex lg:block gap-4 lg:gap-0 px-1'>
      <div className=' items-center justify-between text-sm gap-4 hidden lg:flex'>
        <h1 className=' text-gray-600'>Suggested for you</h1>
        <span className=' cursor-pointer'>See All</span>
      </div>
      {
        suggestedUsers.map((user) => (
          <div key={user._id} className='flex items-center justify-center lg:justify-between my-5 gap-3  min-w-12'>
            <div className='flex items-center gap-2 max-w-[80%] flex-col lg:flex-row'>
              <Link to={`/profile/${user?._id}`}>
                <Avatar className="w-12 h-12 border">
                  <AvatarImage src={user?.profilePicture} alt="post_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h1 className='font-medium text-sm truncate lg:max-w-[120px] max-w-12 '>
                  <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                </h1>
                <span className='text-gray-600 text-sm hidden lg:block'>{user?.bio || "Bio here..."}</span>
              </div>
            </div>

            <span
              className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6] hidden lg:block' 
              onClick={() => handleFollowUnfollow(user?._id)}
            >
              {loggedInUser?.following?.includes(user?._id) ? "Unfollow" : "Follow"}
            </span>
          </div>
        ))
      }
    </div>
  )
}

export default SuggestedUsers
