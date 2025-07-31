import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Signup = lazy(()=> import("./pages/Signup"))
const Login = lazy(()=> import("./pages/Login"));
import MainLayout from "./pages/Layout";
const Home = lazy(()=> import("./pages/Home"));
const Profile = lazy(()=> import("./pages/Profile"))
const EditProfile = lazy(()=> import("./components/EditProfile"))
import {ErrorBoundary} from "react-error-boundary"
import {ErrorBoundryFallback} from "./components/ErrorBoundry"
import ProtectedRoutes from "./components/ProtectedRoutes";
function Routing() {
  return (

    <BrowserRouter>
    <ErrorBoundary FallbackComponent={ErrorBoundryFallback} onReset={()=>{}}>
      <Routes>
        <Route path="/" element={ <ProtectedRoutes> <MainLayout /></ProtectedRoutes>}>
        <Route index element={<ProtectedRoutes><Suspense fallback={<h1 className=" w-full flex items-center justify-center h-screen  text-center">Loading...</h1>}><Home /> </Suspense></ProtectedRoutes>}/>
        <Route path="profile/:id" element={<ProtectedRoutes> <Suspense fallback={<h1 className=" w-full flex items-center justify-center h-screen  text-center">Loading...</h1>}><Profile/></Suspense></ProtectedRoutes> } />
        <Route path="account/edit" element={<ProtectedRoutes><Suspense fallback={<h1 className=" w-full flex items-center justify-center h-screen  text-center">Loading...</h1>}><EditProfile/></Suspense> </ProtectedRoutes> } />
        </Route>

        <Route path="/signup" element={<Suspense fallback={<h1 className=" w-full flex items-center justify-center h-screen  text-center">Loading...</h1>}><Signup /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<h1 className=" w-full flex items-center justify-center h-screen  text-center">Loading...</h1>}><Login /></Suspense>} />
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default Routing;
