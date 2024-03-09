import React from "react";
import { useEffect, useState } from "react";
import BookCard from "../../components/home/BookCard";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/LoginReducer";

const AdminHome = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    navigate("/login");
    dispatch(login(false));
    secureLocalStorage.removeItem("email");
    secureLocalStorage.removeItem("password");
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("role");
  };

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");
    axios
      .get("http://localhost:3000/book", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((ans) => {
        if (ans.data !== "") {
          setBooks(ans.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between w-full">
        <button onClick={logout} className="rounded-md px-6 py-2 bg-white">
          Logout
        </button>
        <button
          onClick={() => navigate("/library/addBook")}
          className="rounded-md px-6 py-2 bg-white"
        >
          Add Book
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {books.map(({ id, title, author, description, photo }) => (
          <BookCard
            id={id}
            title={title}
            author={author}
            description={description}
            photo={photo}
            key={id}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
