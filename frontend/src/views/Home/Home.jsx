import { useEffect, useState } from "react";
import BookCard from "../../components/home/BookCard";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/LoginReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);

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

  const addToBorrowBooks = (bookId) => {
    const token = secureLocalStorage.getItem("token");
    const body = {
      book_id: bookId,
    };

    axios
      .post("http://localhost:3000/book/borrow", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((ans) => {
        if (ans) {
          notify("success", "Borrowed successful!");
        }
      })
      .catch((err) => {
        if (err) {
          notify("error", "Borrow books limit exceeded (max: 5)");

          setTimeout(() => {
            navigate("/borrow");
          }, 2000);
        }
      });
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

  const logout = () => {
    navigate("/login");
    dispatch(login(false));
    secureLocalStorage.removeItem("email");
    secureLocalStorage.removeItem("password");
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("role");
  };

  return (
    <div className="p-10 space-y-6">
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

      <div className="flex justify-between w-full">
        <button onClick={logout} className="rounded-md px-6 py-2 bg-white">
          Logout
        </button>
        <button
          onClick={() => navigate("/borrow")}
          className="rounded-md px-6 py-2 bg-white"
        >
          Borrow Books
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
            addToBorrowBooks={addToBorrowBooks}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
