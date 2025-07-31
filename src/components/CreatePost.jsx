import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
   
} from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "../lib/utils";
import { Loader2 } from "lucide-react";
import createPost from "../hooks/createPost";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPost } from "../hooks/useGetAllPost";
function CreatePost({ open, setOpen }) {
  const imageRef = useRef(null);
  const [file, setFile] = useState("");
  const [caption, SetCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
const dispatch = useDispatch();
const { user} = useSelector(state => state.auth)

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    // console.log(file, caption);
    setLoading(true);
    if (!file) {
  toast.error("No image selected!");
  setLoading(false);
  return;
}
    const form = new FormData();
    form.append("caption", caption);
    form.append("image", file);
    const response = await createPost(form);
    // console.log(response)
    if (response?.success) {
      toast.success(response.message);
      setImagePreview("")
          await fetchAllPost(dispatch); // here i am fetching all posts bczwhen ever idoa new post new post will automatically shown in my page bcz refetching it will update mt edux
          setOpen(false)

    } else {
      toast.error(response?.response?.data?.message || response?.message || "something went wrong");
    }
    setLoading(false);
  };
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <VisuallyHidden>
          <DialogTitle>Post Image Preview</DialogTitle>
          <DialogDescription>This is a preview of your image</DialogDescription>
        </VisuallyHidden>
        <DialogHeader className="text-center font-fw-semibold">
          Create New Post
        </DialogHeader>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage className= 'object-cover' src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xs font-semibold">{user?.username}</h1>
            <span className="text-gray-600 text-xs">{user?.bio}</span>
          </div>
        </div>
        <Textarea
          value={caption}
          onChange={(e) => SetCaption(e.target.value)}
          className="focus-visible:ring-transparent border-0"
          placeholder="write a caption..."
        />
        {imagePreview && (
          <div className="w-full max-h-80 flex items-center justify-center  rounded-md ">
            <img
              src={imagePreview}
              alt="preview_image"
              className="object-cover object-top max-h-80 w-auto border"
            />
          </div>
        )}
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={fileChangeHandler}
        />
        <Button
          onClick={() => imageRef.current.click()}
          className="w-fit mx-auto  bg-[#0095F6] hover:bg-[#258bcf]"
        >
          select from computer
        </Button>
        {imagePreview &&
          (loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Plese Wait
            </Button>
          ) : (
            <Button onClick={createPostHandler}>Post</Button>
          ))}
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
