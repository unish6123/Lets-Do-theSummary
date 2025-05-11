import React, { useEffect, useState } from 'react';
import BookCard from '../UI/BookCard';
import SearchBar from '../UI/Search';
import { Link } from 'react-router-dom';

const BookStore = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

 
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/books');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data)
 
      if (data.success) {
        setBooks(data.books);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(); 
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    console.log('Searching for:', query);
 
  };

  const handleBookClick = (id) => {
    console.log(`Book clicked: ${id}`);
   
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800">📚 Book Store</h1>
        <p className="text-gray-500 mt-2">Browse our collection of powerful reads</p>
      </div>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {books.map((book) => (

                
                book.title.toLowerCase().startsWith(searchQuery) &&
                <BookCard
                  key={book.id}
                  id={book.id}
                  image={book.image} 
                  title={book.title}
                  author={book.author}
                  category={book.category}
                  onClick={() => handleBookClick(book.id)} 
                />
          ))}
        </div>
      )}
    </div>
    <Link
        to="/upload"
        aria-label="Upload a new book"
        className="
          fixed bottom-6 right-6
          flex items-center justify-center
          w-20 h-20 md:w-24 md:h-24            /* a bit wider for text */
          rounded-full bg-blue-900 text-white
          shadow-lg hover:bg-blue-800
          text-lg font-semibold
        "
      >
        Upload
      </Link>
    </>
  );
};

export default BookStore;
