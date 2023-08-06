import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../images/logo2.jpg"
const Update = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    book_name: "",
    book_description: "",
    book_author: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch book data by slug when the component mounts
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/books/${slug}`);
        setBook(response.data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    fetchBookData();
  }, [slug]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/books/${slug}`, book);
      // Redirecționare către pagina cărții actualizate
      navigate(`/`);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <nav className="text-center">
			<div className="flex justify-between items-center">
				<div className="mt-8 md:mt-0">
					<a>
						<img alt="Logo" width="80" height="20" src={logo}></img>
					</a>
				</div>
        	</div>
		</nav>
    <header className="mt-20 text-left mb-10">
			<h1 className="text-4xl mb-5">Update details about the book</h1>
			<p className="text-2xl font-normal uppercase">{book.book_name}</p>
			<p className="text-slate-400 text-xs font-normal"> Posted by {book.user_name}  in category {book.category_name}</p>

		</header >
    <div className="form">
      <h1>Update the Book</h1>
      <div className="flex flex-col space-y-4 mx-auto">
        <input
          type="text"
          placeholder={book.book_name}
          name="book_name"
        //   value={book.book_name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder={book.book_author}
          name="book_author"
        //   value={book.book_author}
          onChange={handleChange}
        />
        <textarea
          rows={5}
          placeholder={book.book_description}
          name="book_description"
        //   value={book.book_descriprion}
          onChange={handleChange}
        />

        <button onClick={handleClick}>Update</button>
        {error && "Something went wrong!"}
        <Link to="/">See all books</Link>
      </div>
    </div>
    </section>
  );
};

export default Update;
