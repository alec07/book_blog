import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import logo from "../images/logo2.jpg"
import moment from "moment";


const Book = () => {
  const [book, setBook] = useState({
	book_name: "",
    book_author: "",
    book_description: "",
	user_name:"",
	category_name:"",
  });
  const [error, setError] = useState(false);

//   const bookId = location.pathname.split("/")[2];

// Obține slug-ul din URL
const { slug } = useParams();
useEffect(() => {
  const fetchBookData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/books/${slug}`);
      console.log("Response data:", response.data);
      setBook(response.data);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  fetchBookData();
}, [slug]);



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
		<header className="mt-20 text-left">
			<h1 className="text-4xl font-bold mb-5">Info about the Book</h1>
			<p className="text-slate-400 text-xs font-normal"> Posted by {book.user_name} {moment(book.data_adaugare).fromNow()} in category {book.category_name}</p>

		</header >
		<main className="max-w-6xl mx-auto mt-6 lg:mt-20 space-y-6">
			<div className="text-leftt">
				<button className="bg-violet-400 rounded-full py-2 px-6 text-white">
				<Link to="/"> Back to all books</Link>
				</button>
			</div>
			<div className="mt-10">
				<p>Title: {book.book_name}</p>
				<p>Author: {book.book_author}</p>
				<p>Rating: </p>
				<p>Publishing house: </p>
				<p>Year of publication: </p>
				<p>Number of pages: </p>
				<p>Translation: </p>
				<p>ISBN: </p>
			</div>
			<div >
				<p className="text-xl">Book description:</p>
				<p className="text-normal"> {book.book_description}</p>
			</div>
				{error && "Something went wrong!"}

		</main>
		<footer>

		</footer>
    </section>
  );
};

export default Book;
