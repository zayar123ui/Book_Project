import { useDispatch, useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import { login } from '../store/LoginReducer';
import { Navigate, Outlet } from 'react-router-dom';

const FreedomRoute = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.login);

  if (
    secureLocalStorage.getItem('email') !== null &&
    secureLocalStorage.getItem('password') !== null &&
    secureLocalStorage.getItem('token') !== null &&
    secureLocalStorage.getItem('admin') !== null
  ) {
    dispatch(login(true));
  }

  return loggedIn.value ? <Navigate to={"/"} /> : <Outlet /> ;
};

export default FreedomRoute;
