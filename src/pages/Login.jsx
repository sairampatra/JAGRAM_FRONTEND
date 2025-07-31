import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import login from "../hooks/login";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/slices/authSlice";
import { useEffect } from "react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { user } = useSelector((store) => store?.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(input);
    console.log(res);
    if (res.success) {
      console.log(res.user);
      dispatch(setAuthUser(res.user));
      toast.success(res.message);
      navigate("/");
    } else {
      toast.error(res.message || "Something went wrong!");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="flex items-center justify-center w-screen h-screen rounded-lg">
      <form
        action=""
        onSubmit={loginHandler}
        className="shadow-lg  rounded-lg flex flex-col gap-4  p-8 w-100"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-center font-bold  text-xl">LOGO</h1>
          <p>Login to get inside me 😉</p>
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
        {loading ? (
          <Button>
            {" "}
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Plese wait{" "}
          </Button>
        ) : (
          <Button>Login</Button>
        )}

        <span className="text-center text-gray-500 text-xs">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 underline hover:text-blue-800 transition duration-150"
          >
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
