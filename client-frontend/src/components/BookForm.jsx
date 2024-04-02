// BookForm.js
import React, { useState } from 'react';

const BookForm = ({ book, onSubmit, onCancel }) => {
    const [editedBook, setEditedBook] = useState(book);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editedBook);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Book</h2>
            <label>
                Title:
                <input type="text" name="title" value={editedBook.title} onChange={handleInputChange} />
            </label>
            <label>
                Author:
                <input type="text" name="author" value={editedBook.author} onChange={handleInputChange} />
            </label>
            <label>
                ISBN:
                <input type="text" name="ISBN" value={editedBook.ISBN} readOnly />
            </label>
            <label>
                Price:
                <input type="text" name="price" value={editedBook.price} onChange={handleInputChange} />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default BookForm;
