import React, { useState, useEffect } from "react";
import Booklist from "./components/Booklist";
import AddBookForm from "./components/AddBookForm";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/books/");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <div className='app-container'>
      <h1>Bookstore Management</h1>
      <Booklist books={books} />
      <AddBookForm onAdd={handleAddBook} />
    </div>
  );
};

export default App;
