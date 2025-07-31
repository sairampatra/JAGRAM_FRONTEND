import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import logout from "../hooks/logout";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSuggestedUsers, setUserProfile } from "../redux/slices/authSlice";
import { useState } from "react";
import CreatePost from "./CreatePost";
import { setPosts } from "../redux/slices/postSlice";
import logo from "../assets/Logo.jpg";
const iconeSize = 25;
const sidebarItems = [
  {
    icon: <Home size={iconeSize} />,
    text: "Home",
  },
  {
    icon: <Search size={iconeSize} />,
    text: "Search",
  },
  {
    icon: <TrendingUp size={iconeSize} />,
    text: "Explore",
  },
  {
    icon: <MessageCircle size={iconeSize} />,
    text: "Messages",
  },
  {
    icon: <Heart size={iconeSize} />,
    text: "Notificaon",
  },
  {
    icon: <PlusSquare size={iconeSize} />,
    text: "Create",
  },
  {
    icon: <LogOut size={iconeSize} />,
    text: "Logout",
  },
];

function LeftSidebar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const logoutHandler = async () => {
    const res = await logout();

    if (res.success) {
      dispatch(setAuthUser(null));
      dispatch(setUserProfile(null));
      dispatch(setPosts([]));
      dispatch(setSuggestedUsers([]));
      toast.success(res.message);
      navigate("/login");
    } else {
      toast.error(res.message || "Somthing went wrong");
    }
  };
  const sidebarHandler = (textType) => {
    if (textType === "Logout") logoutHandler();
    if (textType === "Create") {
      setOpen(true);
    }

    if (textType === "Home") {
      navigate("/");
    }
  };
  const handleprofileClick = (userId) => {
    navigate(`profile/${userId}`);
  };
  const handleLogoClick = () => {
    navigate(`/`);
  };
  return (
    <div className="fixed top-0 left-0 z-10 px-4 border-r pr-3 border-gray-300 w-[16vw] h-screen flex flex-col  ">
      <div className="pl-6    ">
        <div className="p-2.5 w-[80px] " onClick={handleLogoClick}>
          <img
            src={logo}
            alt=""
            className="w-full h-full rounded-full hover:scale-110 transition duration-700 ease-in-out"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 ">
        <div
          className="flex items-center gap-2 relative   px-3  mr-2  mt-5 hover:cursor-pointer"
          onClick={() => handleprofileClick(user?._id)}
        >
          <Avatar className="w-9 h-9">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>jagan</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <span className=" font-garamond">{user?.username}</span>
            <span className="text-[#6E788B] text-xs font-garamond">{`@${user?.username}`}</span>
          </div>
        </div>
        <div className="flex flex-col gap-6 pl-2 pt-5 ">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => sidebarHandler(item.text)}
              className="font-fredoka  text-lg flex items-center gap-2 relative p-1 px-3   rounded-l-full rounded-r-full hover:bg-[#F1F2F4] hover:cursor-pointer"
            >
              <div className="max-w-6 max-h-6 flex items-center justify-center shrink-0">
                {item.icon}
              </div>{" "}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
}

export default LeftSidebar;
