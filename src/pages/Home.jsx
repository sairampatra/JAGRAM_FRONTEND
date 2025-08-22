import React, { useEffect } from "react";
import Feed from "../components/Feed";
import { Outlet } from "react-router-dom";
import RightSidebar from "../components/RightSidebar";
import useGetAllPost from "../hooks/useGetAllPost";
import useGetSuggestedUsers from "../hooks/useGetSuggestedUsers";
// import isToken from "../hooks/isToken";

function Home() {
  useGetAllPost()
  useGetSuggestedUsers()
//   useEffect(()=>{
//  const checkToken = async () => {
//     await isToken();
//   };

//   checkToken();
//   },)
  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <div className="flex-grow ">
        <Feed />
        <Outlet />
      </div>
      <RightSidebar/>
    </div>
  );
}

export default Home;
