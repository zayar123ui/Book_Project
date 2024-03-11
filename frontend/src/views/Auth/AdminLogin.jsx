import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePasswordToggler } from "../../hooks/usePasswordToggle";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("librarian1@gmail.com");
  const [password, setPassword] = useState("asdfasdf");

  const { type, passwordVisibility, handlePasswordVisibility } =
    usePasswordToggler();

  const navigate = useNavigate();

  const notify = (type, text) => {
    if (type === "error") {
      toast.error(text, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success(text, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:3000/librarian/login", body)
      .then((ans) => {
        if (ans.data.token) {
          secureLocalStorage.setItem("email", email);
          secureLocalStorage.setItem("password", password);
          secureLocalStorage.setItem("token", ans.data.token);
          secureLocalStorage.setItem("role", 1);

          notify("success", "Login successful!");

          setTimeout(() => {
            navigate("/library");
          }, 2000);
        }
      })
      .catch((err) => {
        if (err) {
          notify("error", "Something went wrong (email or password");
        }
      });

    // email !== 'yannainghtwe.777.yy@gmail.com' &&
    //   notify('error', 'Email should be yannainghtwe.777.yy@gmail.com');
    // setTimeout(() => {
    //   setEmail('yannainghtwe.777.yy@gmail.com');
    //   return;
    // }, 2000);

    // password !== '12345678' && notify('error', 'Password should be 12345678');
    // setTimeout(() => {
    //   setPassword('12345678');
    //   return;
    // }, 2000);

    // if (
    //   email === 'yannainghtwe.777.yy@gmail.com' &&
    //   password === '12345678'
    // ) {
    //   secureLocalStorage.setItem('email', email);
    //   secureLocalStorage.setItem('password', password);

    //   notify('success', 'Login successful!');

    //   setTimeout(() => {
    //     navigate('/');
    //   }, 2000);
    // }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <Card color="transparent" shadow={false} className="bg-white p-10">
        <div className="w-full flex justify-between items-center">
          <Typography variant="h4" color="blue-gray">
            Login In
          </Typography>
          <button onClick={() => navigate("/login")}>User Login</button>
        </div>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={formSubmit}
        >
          <div className="mb-4 flex flex-col gap-10">
            <Input
              size="lg"
              label="Email"
              crossOrigin=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                type={type}
                label="Password"
                value={password}
                crossOrigin=""
                onChange={(e) => setPassword(e.target.value)}
                className="pr-20"
              />
              <div
                className="!absolute right-1 top-1/2 -translate-y-1/2 bg-white cursor-pointer px-2"
                onClick={handlePasswordVisibility}
              >
                {passwordVisibility ? (
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="rgba(0,0,0,0.8)"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="rgba(0,0,0,0.8)"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path d="M508 624a112 112 0 00112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 00-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 000 11.31L155.25 889a8 8 0 0011.31 0l712.16-712.12a8 8 0 000-11.32zM332 512a176 176 0 01258.88-155.28l-48.62 48.62a112.08 112.08 0 00-140.92 140.92l-48.62 48.62A175.09 175.09 0 01332 512z" />
                    <path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 01445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <Button className="mt-16" fullWidth type="submit">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
