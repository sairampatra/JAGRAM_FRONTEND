import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import isToken from '../hooks/isToken'; 
// import { setAuthUser } from '../redux/slices/authSlice'; 

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((store) => store?.auth);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const check = async () => {
  //     const res = await isToken();
  //     if (!res?.success) {
  //       dispatch(setAuthUser(null)); // remove user if token is bad
  //     }
  //   };
  //   check();
  // }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]); // run this when user changes

  return <>{children}</>;
};

export default ProtectedRoutes;
