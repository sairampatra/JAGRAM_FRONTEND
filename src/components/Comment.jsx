import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { MessageCircle, ChevronDown, ChevronRight } from "lucide-react";
import createComment from "../hooks/createComment";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import getComments from "../hooks/getComments";
import { setNestedComments } from "../redux/slices/commentSlice";

function Comment({ comment, level = 0 , postId }) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
const dispatch = useDispatch()
  // Calculate indentation based on level with increased spacing for better visibility
  const indentationStyle = {
    marginLeft: `${level * 24}px`, // Increased from 20px to 24px for better spacing
  };

 
  const sendMessageHandler = async (postId, text ,parentCommentId) => {
    const response = await createComment(postId, text ,parentCommentId);
    if (response.success) {
      setReplyText("");
      setShowReplyInput(false);
      toast.success(response.message);
      const allCommentsOfPost = await getComments(postId);
      if (allCommentsOfPost.success) {
        dispatch(setNestedComments(allCommentsOfPost.nestedComments));
        setShowReplies(true)
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full  ">
      <div className="my-2 min-w-fit " style={indentationStyle}>
        {/* Main Comment */}
        <div className="flex gap-3 items-start min-w-max  ">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage
              src={comment?.author?.profilePicture}
              className="object-cover"
            />
            <AvatarFallback>
              {comment?.author?.username?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-bold text-sm whitespace-nowrap">
                {comment?.author?.username}
              </h1>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {formatDate(comment?.createdAt)}
              </span>
            </div>

            <p className="text-sm mb-2 break-words">{comment?.text}</p>

            {/* Action buttons */}
            <div className="flex items-center gap-4 text-xs text-gray-500 ">
              <button
                className="flex items-center gap-1 hover:text-gray-700 whitespace-nowrap"
                onClick={() => {
                  setShowReplyInput(!showReplyInput);
                  // // Show replies when opening reply input
                  // if (!showReplyInput && comment?.children?.length > 0) {
                  //   setShowReplies(false);
                  // }
                }}
              >
                <MessageCircle size={12} />
                Reply
              </button>

              {comment?.children?.length > 0 && (
                <button
                  className="flex items-center gap-1 hover:text-gray-700 whitespace-nowrap "
                  onClick={() => setShowReplies(!showReplies)}
                >
                  {showReplies ? (
                    <ChevronDown size={12} />
                  ) : (
                    <ChevronRight size={12} />
                  )}
                  {comment.children.length}{" "}
                  {comment.children.length === 1 ? "reply" : "replies"}
                </button>
              )}
            </div>

            {/* Reply input */}
            {showReplyInput && (
              <div className="mt-3 flex gap-2 min-w-[300px] b">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 outline-0 border-gray-300 border p-2 rounded text-sm min-w-[150px]"
                />
                <Button
                  size="sm"
                  disabled={!replyText.trim()}
                  onClick={()=>sendMessageHandler(comment.post,replyText,comment._id)}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowReplyInput(false);
                    setReplyText("");
                  }}
                  className="whitespace-nowrap"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nested Comments (Replies) */}
      {comment?.children?.length > 0 && showReplies && (
        <div className="border-l-2   border-gray-100 ml-4 ">
          {comment.children.map((childComment) => (
            <Comment
              key={childComment._id}
              comment={childComment}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
