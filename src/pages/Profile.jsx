import React, { useState } from "react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import followUnfollow from "../hooks/followUnfollow";
import { setAuthUser } from "../redux/slices/authSlice";
import { toast } from "sonner";
import SkeletonProfile from "../skeletonLoders/SkeletonProfile.jsx";
function Profile() {
  const param = useParams();
  const { userProfile, user, isProfileLoading } = useSelector(
    (state) => state.auth
  );
  useGetUserProfile(param.id);
  const isLoggedinUserProfile = user?._id === userProfile?._id;
  const isFollowing = user?.following?.includes(userProfile?._id);
  const [activeTab, setActiveTab] = useState("posts");
  const displayPosts =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const dispatch = useDispatch();
  const handleFollowUnfollow = async (userId) => {
    console.log(userId);
    const response = await followUnfollow(userId);

    if (response?.success) {
      let newFollowingArray;

      if (user?.following?.includes(userId)) {
        // Unfollow logic — remove the ID
        newFollowingArray = user.following.filter((id) => id !== userId);
      } else {
        // Follow logic — add the ID
        newFollowingArray = [...user.following, userId];
      }

      dispatch(
        setAuthUser({
          ...user,
          following: newFollowingArray,
        })
      );

      toast.success(response.message);
    } else {
      toast.error(
        response?.response?.data?.message ||
          response?.message ||
          "something went wrong"
      );
    }
  };
  if (isProfileLoading) {
    return <SkeletonProfile />;
  }
  return (
    <div className="m-5  flex max-w-4xl justify-start md:justify-center mx-auto md:pl-10   md:px-5">
      <div className="flex flex-col gap-7 items-center sm:p-6  ">
        <div className=" px-3 flex gap-5 sm:gap-14  md:px-5 items-center">
          <section className="flex flex-col items-center ">
            <span className="font-medium mb-3 md:hidden block">
              {userProfile?.username}
            </span>

            <Avatar className="md:h-32 md:w-32 h-20 w-20 border">
              <AvatarImage
                className="object-cover"
                src={userProfile?.profilePicture}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 md:hidden">
              <span className="font-semibold">
                {userProfile?.bio || "bio here..."}
              </span>
            </div>
          </section>
          <section>
            <div className="flex flex-col gap-4   ">
              <div className="flex flex-col md:flex-row md:items-center md:gap-2 gap-4 ">
                <span className="hidden md:block">{userProfile?.username}</span>
                <Badge variant="secondary" className="md:hidden ">
                  <AtSign />
                  <span>{userProfile?.username}</span>{" "}
                </Badge>
                {isLoggedinUserProfile ? (
                  <div className="sm:flex gap-3  hidden">
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        Edit Pofile
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      View Archive
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      Add Tools
                    </Button>
                  </div>
                ) : isFollowing ? (
                  <>
                    <Button
                      onClick={() => handleFollowUnfollow(userProfile?._id)}
                      variant="secondary"
                      className="h-8"
                    >
                      Unfollow
                    </Button>
                    <Button variant="secondary" className="h-8">
                      Message
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => handleFollowUnfollow(userProfile?._id)}
                    className="bg-[#0095F6] hover:bg-[#3192d2] h-8"
                  >
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4  text-">
                <p className="flex md:gap-1 gap-1/2 flex-col md:flex-row">
                  <span className="font-semibold">
                    {userProfile?.posts.length}
                  </span>
                  posts
                </p>
                <p className="flex md:gap-1 gap-1/2 flex-col md:flex-row">
                  <span className="font-semibold">
                    {userProfile?.following.length}
                  </span>
                  Following
                </p>
                <p className="flex md:gap-1 gap-1/2 flex-col md:flex-row">
                  <span className="font-semibold">
                    {userProfile?.followers.length}
                  </span>
                  Followers
                </p>
              </div>

              <div className="hidden md:flex flex-col gap-4 ">
                <span className="font-semibold">
                  {userProfile?.bio || "bio here..."}
                </span>
                <Badge variant="secondary">
                  <AtSign />
                  <span className="">{userProfile?.username}</span>{" "}
                </Badge>
              </div>
            </div>
          </section>
        </div>
        <div className="flex gap-3 ">
          {isLoggedinUserProfile ? (
            <div className="flex gap-3  sm:hidden">
              <Link to="/account/edit">
                <Button variant="secondary" className="hover:bg-gray-200 h-8">
                  Edit Pofile
                </Button>
              </Link>
              <Button variant="secondary" className="hover:bg-gray-200 h-8">
                View Archive
              </Button>
              <Button variant="secondary" className="hover:bg-gray-200 h-8">
                Add Tools
              </Button>
            </div>
          ) : isFollowing ? (
            <>
              <Button
                onClick={() => handleFollowUnfollow(userProfile?._id)}
                variant="secondary"
                className="h-8"
              >
                Unfollow
              </Button>
              <Button variant="secondary" className="h-8">
                Message
              </Button>
            </>
          ) : (
            <Button
              onClick={() => handleFollowUnfollow(userProfile?._id)}
              className="bg-[#0095F6] hover:bg-[#3192d2] h-8"
            >
              Follow
            </Button>
          )}
        </div>
        <div className="border-t  border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "posts" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "saved" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
            <span className="py-3 cursor-pointer">REELS</span>
            <span className="py-3 cursor-pointer">TAGS</span>
          </div>
          <div className="grid grid-cols-3 sm:gap-1 gap-[1px] mb-12 ">
            {displayPosts?.map((post) => (
              <div className="relative group cursor-pointer h-48 sm:h-auto" key={post?._id}>
                <img
                  src={post?.image}
                  alt="postImage"
                  className="object-cover aspect-square sm:rounded-sm rounded-0  w-full h-full"
                />
                <div className="rounded-sm  absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4">
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <Heart />
                      <span>{post?.likes.length}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <MessageCircle />
                      <span>{post?.comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
