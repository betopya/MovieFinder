import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function SearchResults() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // API anahtarını .env'den al
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [query]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Search Results for: "{query}"</h2>
      {movies.length > 0 ? (
        <div style={styles.grid}>
          {movies.map((movie) => (
            <div key={movie.id} style={styles.movieCard}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={styles.moviePoster}
              />
              <h3 style={styles.movieTitle}>{movie.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.text}>No results found! Try another search. 🎬</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    color: "#fff",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#b81414",
  },
  text: {
    fontSize: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    paddingTop: "20px",
  },
  movieCard: {
    backgroundColor: "#222",
    padding: "10px",
    borderRadius: "8px",
  },
  moviePoster: {
    width: "100%",
    borderRadius: "5px",
  },
  movieTitle: {
    fontSize: "16px",
    marginTop: "10px",
    color: "#fff",
  },
};

export default SearchResults;
