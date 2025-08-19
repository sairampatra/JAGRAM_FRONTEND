import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge.jsx";
import {
  Bookmark,
  Heart,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import CommentDilog from "./CommentDilog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import deletePost from "../hooks/deletePost.js";
import { setPosts } from "../redux/slices/postSlice.js";
// import { setAuthUser } from "../redux/slices/authSlice.js";
import likePost from "../hooks/likePost.js";
import { fetchAllPost } from "../hooks/useGetAllPost.jsx";
import dislikePost from "../hooks/dislikePost.js";
import createComment from "../hooks/createComment.js";
import bookmark from "../hooks/bookmark.js";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import followUnfollow from "../hooks/followUnfollow.js";
import { setAuthUser } from "../redux/slices/authSlice.js";

function Post({ post }) {
  const { posts } = useSelector((store) => store?.post);
  const { user } = useSelector((store) => store.auth);
  const [text, setText] = useState("");
  const [dilogbox, setDilogbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(post?.likes.includes(user?._id) || false);
  const [likeCount, setLikeCount] = useState(post?.likes.length);
  const [comments, setComments] = useState(post?.comments);
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    if (e.target.value.trim()) {
      setText(e.target.value);
    } else {
      setText("");
    }
  };
  const deletePostHandler = async (postId) => {
    setLoading(true);
    const response = await deletePost(postId);
    if (response.success) {
      const updatedPost = posts.filter((postItem) => postItem?._id != postId);
      dispatch(setPosts(updatedPost));
      toast.success(response?.message);
    } else {
      toast.error(
        response?.response?.data?.message ||
          response?.message ||
          "something went wrong"
      );
    }
    setLoading(false);
  };

  const handleLike = async (postId) => {
    setLiked(true);
    setLikeCount(likeCount + 1);

    const response = await likePost(postId);
    console.log(response);
    if (response?.success) {
      toast.success(response?.message);
      fetchAllPost(dispatch);
    } else {
      toast.error(
        response?.response?.data?.message ||
          response?.message ||
          "something went wrong"
      );
    }
  };

  const handleDislike = async (postId) => {
    setLiked(false);
    setLikeCount(likeCount - 1);
    const response = await dislikePost(postId);
    console.log(response);
    if (response?.success) {
      toast.success(response?.message);
      fetchAllPost(dispatch);
    } else {
      toast.error(
        response?.response?.data?.message ||
          response?.message ||
          "something went wrong"
      );
    }
  };
  const commentHandler = async (postId) => {
    const response = await createComment(postId.trim(), text);
    if (response?.success) {
      setText("");
      const updatedComments = [...comments, response?.comment];
      setComments(updatedComments);
      const updatedPost = posts.map((p) =>
        p._id === post._id ? { ...p, comments: updatedComments } : p
      );
      dispatch(setPosts(updatedPost));
      toast.success(response?.message);
    } else {
      toast.error(
        response?.response?.data?.message ||
          response?.message ||
          "something went wrong"
      );
    }
  };

  const bookmarkHandler =async (postId) => {
    const response = await bookmark(postId)
    let updatedBookmarks
    if (response.success) {
      if (user?.bookmarks?.includes(postId)) {
        updatedBookmarks = user.bookmarks.filter(p => p!= postId)
      } else {
        updatedBookmarks = [...user.bookmarks, postId]
      }
      // const updatedBookmarks = user?.bookmarks?.filter(p => p!= postId ) 
      const updatedUser = {...user,bookmarks:updatedBookmarks}
      console.log(updatedUser)
dispatch(setAuthUser(updatedUser));
toast.success(response?.message)
    }else{
            toast.error(response?.response?.data?.message || response?.message || "something went wrong");

    }
  }
  const handleFollowUnfollow = async (userId) => {
    const response = await followUnfollow(userId)

    if (response?.success) {
      let newFollowingArray;

      if (user?.following?.includes(userId)) {
        // Unfollow logic — remove the ID
        newFollowingArray = user.following.filter(id => id !== userId)
      } else {
        // Follow logic — add the ID
        newFollowingArray = [...user.following, userId]
      }

      dispatch(setAuthUser({
        ...user,
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
    <div className="mb-8  md:my-8 w-full max-w-md mx-auto  max-[484px]:max-w-none ">
      <div className="flex items-center justify-between  max-[484px]:px-3">
        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7">
            <AvatarImage src={post?.author?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            <h1>{post?.author?.username}</h1>
            {user?._id === post?.author?._id && <Badge variant="secondry">Author</Badge>}
            
          </div>
        </div>
        <Dialog>
           <VisuallyHidden>
          <DialogTitle>Post Image Preview</DialogTitle>
          <DialogDescription>This is a preview of your image</DialogDescription>
        </VisuallyHidden>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer " />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {user && user?._id != post?.author?._id &&
            (
              <Button
              onClick={()=>handleFollowUnfollow(post?.author?._id)}
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                 {user.following.includes(post?.author?._id) ? 'unFollow' : 'Follow'} 
              </Button>
            )}

            <Button onClick={()=>bookmarkHandler(post?._id)}  variant="ghost" className="cursor-pointer border-none outline-none ring-0 focus:ring-0 shadow-none">
                {user?.bookmarks?.includes(post?._id) ? " Remove Bookmark": "Bookmark"} 
            </Button>
            {user &&
              user?._id === post?.author?._id &&
              (!loading ? (
                <Button
                  onClick={() => deletePostHandler(post?._id)}
                  variant="ghost"
                  className="cursor-pointer w-fit "
                >
                  Delete
                </Button>
              ) : (
                <Button variant="ghost" className="cursor-pointer w-fit ">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Plese Wait
                </Button>
              ))}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm aspect-square my-2 w-full object-cover"
        src={post?.image}
        alt=""
      />
      <div className="flex items-center justify-between my-2 max-[484px]:px-3">
        {/* {console.log(post?.likes.includes(user?._id))} */}
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              onClick={() => handleDislike(post?._id)}
              size={"22px"}
              className="cursor-pointer text-[#ED4956]"
            />
          ) : (
            <FaRegHeart
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
              onClick={() => handleLike(post?._id)}
            />
          )}

          <MessageCircle
            onClick={() => setDilogbox(true)}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark onClick={()=>bookmarkHandler(post?._id)} className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="max-[484px]:px-3 font-medium block mb-2">{`${likeCount} likes`}</span>
      <p>
        <span className="max-[484px]:px-3 font-medium mr-2">{post?.author?.username}</span>
        {post.caption}
      </p>
      <span onClick={() => setDilogbox(true)} className="max-[484px]:px-3 text-gray-500">
        {post?.comments?.length > 0
          ? `view all ${comments?.length} comments `
          : null}
      </span>
      <CommentDilog dilogbox={dilogbox} setDilogbox={setDilogbox} post={post}  />
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={text}
          onChange={changeEventHandler}
          placeholder="write a commet"
          className="max-[484px]:px-3 outline-0 text-sm w-full"
        />
        {text && (
          <span
            className="max-[484px]:px-3 text-[#3BADF8] cursor-pointer"
            onClick={() => commentHandler(post?._id)}
          >
            post
          </span>
        )}
      </div>
    </div>
  );
}

export default Post;
