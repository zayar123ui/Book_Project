import { useDispatch, useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import { login } from '../store/LoginReducer';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.login);

  if (
    secureLocalStorage.getItem('email') !== null &&
    secureLocalStorage.getItem('password') !== null &&
    secureLocalStorage.getItem('token') !== null &&
    secureLocalStorage.getItem("role") !== null
  ) {
    dispatch(login(true));
  }

  return loggedIn.value ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
