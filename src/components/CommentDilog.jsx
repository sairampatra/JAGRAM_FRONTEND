import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import getComments from "../hooks/getComments";
import { useDispatch, useSelector } from "react-redux";
import { setNestedComments } from "../redux/slices/commentSlice";
import createComment from "../hooks/createComment";
import { toast } from "sonner";
import { setPosts } from "../redux/slices/postSlice.js";
import { fetchAllPost } from "../hooks/useGetAllPost.jsx";
import bookmark from "../hooks/bookmark.js";
import { setAuthUser } from "../redux/slices/authSlice.js";
import followUnfollow from "../hooks/followUnfollow.js";

function CommentDialog({ post, dilogbox, setDilogbox }) {
  const [text, setText] = useState("");
  const { nestedComments } = useSelector((store) => store.comment);
  const { posts } = useSelector((store) => store.post);
  const [comments, setComments] = useState(post?.comments);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    const getAllComments = async (postId) => {
      if (dilogbox) {
        const response = await getComments(postId);
// console.log('response' ,response)
        if (response.success) {
          dispatch(setNestedComments(response.nestedComments));
        } else {
          toast.error(
            response?.response?.data?.message ||
              response?.message ||
              "something went wrong"
          );
        }
      }
    };
    getAllComments(post._id);
  }, [post._id, dilogbox, setDilogbox]);

  const changeEventHandler = (e) => {
    setText(e.target.value);
  };

  const sendMessageHandler = async (postId) => {
    const response = await createComment(postId, text);
    if (response.success) {
      setText("");
      // fetchAllPost(dispatch)
      // const updatedComments = [...comments, response.comment];
      // const updatedPost = posts.map((p) => p._id == post._id ? { ...p, comments: updatedComments }:p
      // );
      // console.log(updatedPost)

      // dispatch(setPosts(updatedPost));
      toast.success(response.message);
      const allCommentsOfPost = await getComments(postId);
      if (allCommentsOfPost.success) {
        dispatch(setNestedComments(allCommentsOfPost.nestedComments));
      } else {
        toast.error(
          response?.response?.data?.message ||
            response?.message ||
            "something went wrong"
        );
      }
    } else {
      toast.error(
        response?.response?.data?.message ||
          response?.message ||
          "something went wrong"
      );
    }
  };
  const handleFollowUnfollow = async (userId) => {
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
  const bookmarkHandler = async (postId) => {
    const response = await bookmark(postId);
    let updatedBookmarks;
    if (response.success) {
      if (user?.bookmarks?.includes(postId)) {
        updatedBookmarks = user.bookmarks.filter((p) => p != postId);
      } else {
        updatedBookmarks = [...user.bookmarks, postId];
      }
      // const updatedBookmarks = user?.bookmarks?.filter(p => p!= postId )
      const updatedUser = { ...user, bookmarks: updatedBookmarks };
      console.log(updatedUser);
      dispatch(setAuthUser(updatedUser));
      toast.success(response?.message);
    } else {
      toast.error(
        response?.response?.data?.message ||
          response?.message ||
          "something went wrong"
      );
    }
  };
  return (
    <div>
      <Dialog
        open={dilogbox}
        onOpenChange={(open) => {
          if (!open) {
            console.log("Dialog closed, clearing comments...");

            setDilogbox(false);
            dispatch(setNestedComments([]));
          }
        }}
      >
        <VisuallyHidden>
          <DialogTitle>Post Image Preview</DialogTitle>
          <DialogDescription>This is a preview of your image</DialogDescription>
        </VisuallyHidden>
        <DialogContent
          className="sm:min-w-[70vw] sm:max-w-[70vw] h-[70vh] max-h-[70vh] p-0 flex flex-col"
          // onInteractOutside={whenInteractOutside }
        >
          <div className="flex h-full">
            <div className="w-1/2 h-full">
              <img
                className="rounded-l-lg h-full w-full object-cover"
                src={post?.image}
                alt=""
              />
            </div>
            <div className="w-1/2 h-full flex flex-col">
              {/* Header - Fixed height */}
              <div className="flex items-center justify-between p-4 flex-shrink-0 border-b">
                <div className="flex gap-3 items-center">
                  <Link>
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={post?.author?.profilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link className="font-semibold text-xs">
                      {post?.author?.username}
                    </Link>
                  </div>
                </div>
                <Dialog>
                  <VisuallyHidden>
                    <DialogTitle>Post Image Preview</DialogTitle>
                    <DialogDescription>
                      This is a preview of your image
                    </DialogDescription>
                  </VisuallyHidden>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center text-sm text-center">
                    {user && user?._id != post?.author?._id && (
                      <Button
                        onClick={() => handleFollowUnfollow(post?.author?._id)}
                        variant="ghost"
                        className="cursor-pointer w-fit text-[#ED4956] font-bold"
                      >
                        {user.following.includes(post?.author?._id)
                          ? "unFollow"
                          : "Follow"}
                      </Button>
                    )}
                    <Button
                      onClick={() => bookmarkHandler(post?._id)}
                      variant="ghost"
                      className="cursor-pointer "
                    >
                      {user?.bookmarks?.includes(post?._id)
                        ? " Remove Bookmark"
                        : "Bookmark"}
                    </Button>{" "}
                  </DialogContent>
                </Dialog>
              </div>

              {/* Comments Section - Scrollable with horizontal overflow */}
              <div className="flex-1 overflow-y-auto overflow-x-auto p-4 ">
                <div className="min-w-fit">
                  {nestedComments?.map((comment) => (
                    <Comment
                      key={comment?._id}
                      comment={comment}
                      level={0}
                      postId={post._id}
                    />
                  ))}
                </div>
              </div>

              {/* Input Section - Fixed height */}
              <div className="p-4 border-t flex-shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    onChange={changeEventHandler}
                    value={text}
                    placeholder="Add a comment..."
                    className="w-full outline-0 border-gray-300 border p-2 rounded text-sm"
                  />
                  <Button
                    disabled={!text.trim()}
                    onClick={() => sendMessageHandler(post._id)}
                    variant="outline"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CommentDialog;
