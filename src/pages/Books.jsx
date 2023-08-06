import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../images/logo2.jpg";
import moment from "moment/moment";
import { RxCaretDown } from "react-icons/rx";

const Books = () => {
	// Starea și efectul pentru preluarea cărților și categoriilor
	const [books, setBooks] = useState([]); // Starea pentru stocarea datelor despre cărți
	const [categories, setCategories] = useState([]); // Starea pentru stocarea datelor despre categorii
	const [selectedCategory, setSelectedCategory] = useState(""); // Starea pentru categoria selectată
	const [totalBooksInCategory, setTotalBooksInCategory] = useState(0); // Starea pentru numărul total de cărți din categoria selectată
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [pageSize] = useState("");






  // Funcție pentru preluarea tuturor cărților din backend
//   const fetchAllBooks = async () => {
// 	try {
// 	  const response = await axios.get("http://localhost:8080/books");
// 	  console.log("All books result:", response.data);
// 	  setBooks(response.data); // If the response data is an array, this should work correctly
// 	} catch (error) {
// 	  console.log(error);
// 	}
//   };







const fetchAllBooks = async () => {
	try {
	  const response = await axios.get(
		`http://localhost:8080/books?page=${currentPage}&limit=${pageSize}&category=${selectedCategory}`
	  );
	  setBooks(response.data.books);
	  setTotalPages(response.data.totalPages);
	} catch (error) {
	  console.log(error);
	}
  };






  // Funcție pentru preluarea categoriilor din backend
  const fetchAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/categories");
	  console.log("Categories result:", res.data);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Funcție pentru preluarea cărților în funcție de categoria selectată
  const fetchBooksByCategory = async () => {
	try {
	  if (!selectedCategory) {
		console.log("Selected Category ID is empty");
		return;
	  }
	  console.log("Selected Category ID:", selectedCategory);

	  // Obține numărul total de cărți din categoria selectată
	  const totalBooksResponse = await axios.get(
		`http://localhost:8080/categories/${selectedCategory}/totalBooks`
	  );
	  setTotalBooksInCategory(totalBooksResponse.data.total);

	  // Obține cărțile din categoria selectată și paginează rezultatele
	  const response = await axios.get(
		`http://localhost:8080/books?page=${currentPage}&limit=${pageSize}&category=${selectedCategory}`
	  );
	  setBooks(response.data.books);
	  setTotalPages(response.data.totalPages);
	} catch (err) {
	  console.log("Error fetching books by category:", err);
	}
  };

  // Efect pentru preluarea tuturor cărților și categoriilor la încărcarea componentei și actualizarea cărților când se schimbă categoria selectată
  useEffect(() => {
	fetchAllBooks();
	fetchAllCategories();

	if (selectedCategory) {
	  fetchBooksByCategory();
	} else {
	  // Dacă selectedCategory este gol, afișează toate cărțile (nu filtra după categorie)
	  setBooks([]);
	}
  }, [selectedCategory, currentPage,  pageSize]); // Adăugăm currentPage și pageSize ca dependințe pentru a refetcha datele la schimbarea paginii sau a limitei de paginare



  const handlePrevPage = () => {
	setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
	setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };






  // Funcție pentru ștergerea unei cărți
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const searchHandle = async (event) => {
	let searchTerm = event.target.value; // Preiei valoarea introdusă de utilizator
	if (searchTerm) {
	  console.log("Search key:", searchTerm); // Adaugă un mesaj de depanare pentru a verifica valoarea introdusă în căutare

	  let result = await fetch(`http://localhost:8080/search?search=${searchTerm}`);
	  console.log("Fetch result:", result); // Adaugă un mesaj de depanare pentru a verifica rezultatul fetch-ului

	  result = await result.json();
	  console.log("JSON result:", result); // Adaugă un mesaj de depanare pentru a verifica rezultatul JSON parsat

	  if (result) {
		setBooks(result);
	  }
	}
  };






  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
            <div className="mt-8 md:mt-0">
            	<p>
                	<img alt="Logo" width="80" height="20" src={logo}></img>
            	</p>
        	</div>
       		<div className="mt-8 md:mt-0">
				{/* <a className="uppercase text-xs font-bold">Home Page</a> */}
				<p className=" ml-3 px-2 pt-1 rounded-full text-xs font-bold uppercase ">
					Subscribe for Updates
				</p>
        	</div>
        </div>
        <header className="max-w-xl mx-auto mt-20 text-center">
        	<h1 className="text-4xl font-bold" >Book Blog</h1>
			{/* <h2 className="inline-flex mt-2">By Alexandra</h2> */}
			{/* <p className="text-sm mt-14">
                Another year. Another update. We're refreshing the popular Laravel series with new content.
                I'm going to keep you guys up to speed with what's going on!
            </p> */}
			<div className="lg:space-x-4 sm:space-x-1 flex flex-wrap justify-center mt-4">

        {/* <!-- Category --> */}
				<div className=" dropdown w-1/3 relative flex lg:inline-flex items-center bg-gray-100 rounded-xl">
					<select className="dropdown-content flex-1 appearance-none bg-transparent py-2 pl-3 pr-9 text-sm font-semibold"
					value={selectedCategory}
					onChange={(e) => {
					setSelectedCategory(e.target.value);
					console.log("Selected Category ID:", e.target.value);
					}}
				>
						<option value=""  defaultValue>Category</option>
						{Array.isArray(categories) && categories.map(category => (
						<option key={category.idcategories} value={category.idcategories}>{category.name}</option>
						))}
					</select>
					<RxCaretDown />
				</div>



					{/* <!-- Other Filters --> */}
				{/* <div className="w-1/3 relative flex lg:inline-flex items-center bg-gray-100 rounded-xl">
					<select className="flex-1 appearance-none bg-transparent py-2 pl-3 pr-9 text-sm font-semibold">
						<option value="" disabled defaultValue>Other Filters
						</option>
						<option value="foo">Foo
						</option>
						<option value="bar">Bar
						</option>
					</select>
				</div>
 */}

				{/* <!-- Search --> */}
				<div className="w-1/3 relative flex lg:inline-flex items-center bg-gray-100 rounded-xl px-3  py-2">
					<form >
						<input type="text" name="search" placeholder="Find something" className="bg-transparent placeholder-black font-semibold text-sm" onChange={searchHandle}/>
					</form>
				</div>
			</div>
		</header>
		<main className="max-w-6xl mx-auto mt-6 lg:mt-20 space-y-6">
  {Array.isArray(books) && books.length === 0 ? (
    // If books is an array but has no items, display a message
    <p>Nu există cărți disponibile pentru categoria selectată.</p>
  ) : (
    // If books is an array and has items, display the total count and the book list
    <>
      <p>Număr total de cărți în categorie: {totalBooksInCategory}</p>
      <article className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(books) && books.map((book) => (
          <div key={book.id} className="bg-gray-100 mb-2 p-6 ">
            <Link to={`/book/${book.book_slug}`} key={`link-${book.id}`}>
              <h2 className="uppercase font-bold text-xs leading-6 ">{book.book_name}</h2>
            </Link>
            <p className="font-thin text-xs mb-4">posted {moment(book.book_date_added).fromNow()}</p>
            <p key={book.id} className="text-xs">{book.book_excerpt}</p>
            <div className="flex justify-end">
              <button className="delete rounded-lg text-white px-2 bg-violet-400 mr-5" onClick={() => handleDelete(book.id)}>Delete</button>
              <button className="update rounded-lg text-white px-2 bg-violet-400 mr-5">
                <Link to={`/update/${book.book_slug}`} key={`link-${book.id}`}> Update </Link>
              </button>
              <Link to={`/book/${book.book_slug}`} key={`link-${book.id}`}>
                <button className="rounded-lg text-white px-2 bg-violet-400">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        ))}
      </article>
    </>
  )}
		{/* Navigation buttons */}
		<div className="text-center">
      <button className="mr-5" onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button className="" onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
		</div>
			{/* Buton adaugare carte noua*/}
		<div>
			<button className="addHome bg-violet-400 text-white rounded-lg px-2 py-2">
				<Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
				Add new book
				</Link>
			</button>
		</div>



</main>


		<footer className="bg-gray-100 border border-black border-opacity-5 rounded-xl text-center py-16 px-10 mt-16">
			<img className="mx-auto -mb-6" alt="Logo" width="145" src={logo}></img>
			<h5 className="text-3xl mt-5">Stay in touch with the latest posts</h5>
			<p className="text-sm mt-3">Promise to keep the inbox clean. No bugs.</p>

            <div className="mt-10">
                <div className="relative inline-block mx-auto lg:bg-gray-200 rounded-full">
                    <form  className="flex text-sm">
                        <div className="xs:px-0  py-3 px-5 flex items-center">

                            <input id="email" type="text" placeholder="Your email address"
                                   className="bg-transparent py-0 lg:focus-within:outline-none"/>
                        </div>

                        <button type="submit"
                                className="transition-colors duration-300 bg-violet-400 hover:bg-violet-600 mt-4 lg:mt-0 lg:ml-3 lg:py-3 lg:px-8 rounded-full text-xs font-semibold text-white uppercase sm:py-0 sm:px-3 xs:px-2 xs:py-2   "
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
		</footer>

    </section>


  );
};

export default Books;
