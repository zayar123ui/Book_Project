import React from "react";
import { useEffect, useState } from "react";
import BookCard from "../../components/home/BookCard";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BorrowBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");
    axios
      .get("http://localhost:3000/book/borrowed", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((ans) => {

        if (ans.data !== "") {
          setBooks(ans.data.Borrowed_Books);
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-end w-full">
        <button onClick={() => navigate("/")} className="rounded-md px-6 py-2 bg-white">Back to Home Page</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {books.map(({ _id, title, author, description, photo }) => (
          <BookCard
            id={_id}
            title={title}
            author={author}
            description={description}
            photo={photo}
            key={_id}
          />
        ))}
      </div>
    </div>
  );
};

export default BorrowBooks;
