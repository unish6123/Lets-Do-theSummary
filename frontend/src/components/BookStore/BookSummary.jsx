import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // ✅ Get the ID from the URL

const BookSummary = () => {
  const { contentId } = useParams(); // 👈 Get book ID from the route
  const [bookPages, setBookPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = bookPages.length;
  const currentData = bookPages.find(p => p.page === currentPage);

  const fetchBookSummary = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/books/${contentId}`); 
      if (!response.ok) throw new Error('Failed to fetch book summary data');
      const data = await response.json();
      console.log(data)
      if (data.success) {
       
        const pages = [
          { page: 1, type: 'toc', chapters: data.toc },
          ...data.sections.map((section, i) => ({
            page: i + 2,
            type: 'section',
            title: section.title,
            content: section.summary,
          })),
          { page: data.sections.length + 2, type: 'summary', content: data.summary },
        ];
        setBookPages(pages);
      }
    } catch (error) {
      console.error('Error fetching book summary:', error);
    }
  };

  useEffect(() => {
    if (contentId) {
      fetchBookSummary();
    }
  }, [contentId]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">📖 Book Summary</h1>
        <p className="text-gray-600">Page {currentPage} of {totalPages}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mb-8">
        {currentData?.type === 'toc' ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Table of Contents</h2>
            <ul className="space-y-3">
              {currentData.chapters.map((chapter, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <span>{chapter.title}</span>
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => goToPage(index + 2)}
                  >
                    Go to Section
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-lg text-gray-800 leading-relaxed">
            {currentData?.content}
          </p>
        )}
      </div>

      <div className="flex justify-center items-center gap-2 flex-wrap">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        {bookPages.map(p => (
          <button
            key={p.page}
            onClick={() => goToPage(p.page)}
            className={`px-3 py-1 rounded-md border text-sm ${
              p.page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            {p.page}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookSummary;
