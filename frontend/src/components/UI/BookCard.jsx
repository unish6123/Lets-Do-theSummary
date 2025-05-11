import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ id,image, title, author, category }) => {
  return (
    <Link to = {`/summary/${id}`}>
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-xs">
      <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">by {author}</p>
        <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
    </div>
    </Link>
  );
};

export default BookCard;
