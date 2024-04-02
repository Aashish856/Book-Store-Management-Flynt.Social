// src/components/BookList.js
import React, { useState, useEffect } from "react";
import "../styles/Booklist.css";
import BookForm from "./BookForm";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const booksData = await response.json();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleEditClick = (isbn) => {
    const selected = books.find(book => book.ISBN === isbn);
    setSelectedBook(selected);
  };

  const handleDeleteClick = (isbn) => {
    const selected = books.find(book => book.ISBN === isbn);
    fetch(`http://localhost:5000/books/${selected._id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error('Error updating book', error));
  }

  const handleFormSubmit = (editedBook) => {
    console.log(editedBook);
    fetch(`http://localhost:5000/books/${editedBook._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedBook),
    })
      .then(response => response.json())
      .then(data => {
        setBooks(prevBooks => prevBooks.map(book => (book.ISBN === data.ISBN ? data : book)));
        setSelectedBook(null);
      })
      .catch(error => console.error('Error deleting book', error));
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <h3>Book List</h3>
      <div className="book-container">
        <ul className="book-list">
          {books.map(book => (
            <li key={book.ISBN} className="book-item">
              <strong>{capitalize(book.title)}</strong> <br /> Author: {capitalize(book.author)} <br /> Price: ${book.price}
              <button onClick={() => handleEditClick(book.ISBN)}>Edit</button>
              <button onClick={() => handleDeleteClick(book.ISBN)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedBook && (
        <BookForm
          book={selectedBook}
          onSubmit={handleFormSubmit}
          onCancel={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

export default BookList;
