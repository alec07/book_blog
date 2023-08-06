import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Books from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';
import Book from './pages/Book';
import NotFound from './pages/NotFound';



function App() {
  return (
    <BrowserRouter>
    <Routes>

        <Route path='/' element={<Books/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/update/:slug' element={<Update/>} />
        <Route path='/book/:slug' element={<Book/>} />
        <Route path='*' element={<NotFound/>} />  {/* Catch-all route for 404 Not Found */}

    </Routes>


    </BrowserRouter>
  );
}

export default App;
