import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

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

  const addSubmit = (e) => {
    e.preventDefault();
    const token = secureLocalStorage.getItem("token");

    const body = {
      title: title,
      author: author,
    };

    axios
      .post("http://localhost:3000/book", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((ans) => {
        if (ans) {
          notify("success", "Added successful!");

          setTimeout(() => {
            navigate("/library");
          }, 2000);
        }
      })
      .catch((err) => {
        if(err){
          notify('error', "Something went wrong in creating new book");
        }
      });
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
        <Typography variant="h4" color="blue-gray">
            Add New Book
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={addSubmit}
        >
          <div className="mb-4 flex flex-col gap-10">
            <Input
              size="lg"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                type="text"
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="pr-20"
              />
            </div>
          </div>
          <Button className="mt-16" fullWidth type="submit">
            Add
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddBook;
