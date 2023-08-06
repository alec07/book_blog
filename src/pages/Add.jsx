import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    book_name: "",
    book_description: "",
    book_author: "",
    idcategories: "", // Adaugăm și categoria în starea book
    book_publish_house: "",
    book_year_publication: "",
    book_pages: "",
    book_translation: "",
  });

  const [categories, setCategories] = useState([]); // Starea pentru a păstra categoriile

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleClick = async (e) => {
    e.preventDefault();

    // Verificăm dacă toate câmpurile necesare sunt completate
    if (!book.book_name || !book.book_description || !book.book_author || !book.idcategories|| !book.book_publish_house || !book.book_year_publication || !book.book_pages  || !book.book_translation ) {
      setError(true);
      return;
    }

    // Convertim idcategories într-un număr întreg
    const parsedIdcategories = parseInt(book.idcategories, 10);

    if (isNaN(parsedIdcategories)) {
      setError(true);
      return;
    }

    try {
      // Actualizăm valoarea lui idcategories cu versiunea numerică
      setBook((prev) => ({ ...prev, idcategories: parsedIdcategories }));

      // Trimitem datele către server (doar datele necesare)
      await axios.post("http://localhost:8080/add", {
        book_name: book.book_name,
        book_description: book.book_description,
        book_author: book.book_author,
        idcategories: parsedIdcategories,
        book_publish_house: book.book_publish_house,
        book_year_publication: book.book_year_publication,
        book_pages: book.book_pages,
        book_translation: book.book_translation,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };


  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="book_name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book author"
        name="book_author"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book description"
        name="book_description"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book Year"
        name="book_year_publication"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book Publish House"
        name="book_publish_house"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book Number Pages"
        name="book_pages"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book Translation"
        name="book_translation"
        onChange={handleChange}
      />

      {/* Adaugăm un select pentru categorii */}
      <select name="idcategories" onChange={handleChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.idcategories} value={category.idcategories}>
            {category.name}
          </option>
        ))}
      </select>

      {/* <input type="file" onChange={handleChange} name="image_book"/> */}

      <button className="bg-slate-200" onClick={handleClick}>
        Add
      </button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Add;
