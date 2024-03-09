import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import BookCover from "../../assets/bookcover.jpg"

const BookCard = ({ id, title, author, description, addToBorrowBooks }) => {
  const [isInCart, setIsInCart] = useState(false);
  return (
    <div className="p-8 rounded-md bg-white relative">
      {addToBorrowBooks && <div className="absolute top-3 right-4 cursor-pointer" onClick={() => {
        setIsInCart(true);
        addToBorrowBooks(id);
      }}>
        {isInCart ? (
          <FaShoppingCart className="text-5xl text-mainBackgroundColor" />
        ) : (
          <IoCartOutline className="text-5xl text-mainBackgroundColor" />
        )}
      </div>}
      <div className="w-full h-48">
        <img
          src={BookCover}
          alt={author + "'" + title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="pt-4 space-y-1">
        <p className="text-3xl font-bold">{title}</p>
        <p className="text-sm font-semibold">Author: {author}</p>
        <p className=" opacity-50 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default BookCard;
