import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults"; 
import FilterResult from "./pages/FilterResult"; ///
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Navbar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search/:query" element={<SearchResults />} />  
        <Route path="/filter-results" element={<FilterResult />} /> {/* Yeni */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
