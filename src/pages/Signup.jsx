import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import signup from "../hooks/signup";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Signup() {
    const {user} = useSelector(store =>store?.auth)

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
    const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signup(input);
    console.log(res);
    if (res.success) {
      toast.success(res.message);
      navigate('/')
    } else {
      toast.error(res.message || "Something went wrong!");
    }
    setLoading(false);
  };
  useEffect(()=>{
    if (user) {
      navigate('/')
    }
  })
  return (
    <div className="flex items-center justify-center w-screen h-screen rounded-lg">
      <form
        action=""
        onSubmit={signupHandler}
        className="shadow-lg  rounded-lg flex flex-col gap-4  p-8 w-100"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-center font-bold  text-xl">LOGO</h1>
          <p>Signup to get inside me 😉</p>
        </div>
        <div className=" flex gap-1 flex-col ">
          <Label>Username</Label>
          <Input
            name="username"
            type="text"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent outline-0 border-0 bg-[#F1F2F4]"
            placeholder="Full name"
          />
        </div>
        <div className=" flex gap-1 flex-col">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent"
          />
        </div>
        <div className=" flex gap-1 flex-col">
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent"
          />
        </div>
        {loading ? ( <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Plese wait </Button>):(        <Button>Signup</Button>
)}
        <span className="text-center text-gray-500 text-xs">
          Already have an account?{" "}
          <Link
          to="/login"
            className="text-blue-600 underline hover:text-blue-800 transition duration-150"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Signup;
