import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function FilterResult() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genreParams = queryParams.getAll('genre');
  const countryParams = queryParams.getAll('country');
  const yearParams = queryParams.getAll('year');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      const genreMap = {
        Action: 28,
        Comedy: 35,
        Horror: 27,
        Drama: 18,
        "Sci-Fi": 878,
        Romance: 10749,
        Thriller: 53,
        Fantasy: 14,
        Adventure: 12,
        Animation: 16,
      };

      const countryMap = {
        USA: "US",
        UK: "GB",
        France: "FR",
        Germany: "DE",
        Turkey: "TR",
      };

      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&`;

        if (genreParams.length > 0) {
          const genreIds = genreParams.map((g) => genreMap[g]).filter(Boolean).join(',');
          url += `with_genres=${genreIds}&`;
        }

        if (countryParams.length > 0) {
          const countryCodes = countryParams.map((c) => countryMap[c]).filter(Boolean).join(',');
          url += `with_origin_country=${countryCodes}&`;
        }

        if (yearParams.length > 0) {
          url += `year=${yearParams[0]}&`; // sadece ilk yılı al
        }

        url = url.slice(0, -1); // son "&" karakterini temizle

        const response = await fetch(url);
        if (!response.ok) throw new Error('Error fetching movies');
        const data = await response.json();
        if (!data || !data.results || data.results.length === 0) {
          setError('No movies found');
        } else {
          setMovies(data.results);
        }
      } catch (err) {
        setError('Error fetching movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [location.search]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Filtered Movies</h2>
      <div style={styles.grid}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={styles.card}
            onClick={() => setSelectedMovie(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={styles.poster}
            />
            <h3 style={styles.title}>{movie.title}</h3>
            <p style={styles.overview}>{movie.overview}</p>
            <button style={styles.infoBtn}>More Info</button>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div style={styles.modalOverlay} onClick={() => setSelectedMovie(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>{selectedMovie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p><strong>Overview:</strong> {selectedMovie.overview}</p>
            <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
            <p><strong>Rating:</strong> {selectedMovie.vote_average}</p>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <a
                href={`https://www.themoviedb.org/movie/${selectedMovie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.moreInfoLink}
              >
                Go to TMDB
              </a>
            </div>

            <br />
            <button style={styles.closeBtn} onClick={() => setSelectedMovie(null)}>
              Close
            </button>
          </div>
        </div>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '30px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '8px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    display: "flex",            
    flexDirection: "column",   
    justifyContent: "space-between", 
    height: "450px",            
    overflow: "hidden",
    fontFamily: 'sans-serif',
  },
  poster: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
    height: "300px",
    objectFit: "cover",          
    backgroundColor: "#ddd",     
  },
  title: {
    marginTop: '8px',
    fontSize: '16px',
    color: '#111',
    fontFamily: 'sans-serif',
  },
  overview: {
    fontSize: '13px',
    color: '#555',
    margin: '8px 0',
    maxHeight: '90px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: '10px',  
    textAlign: 'left',
  },
  infoBtn: {
    padding: '9px 20px',
    backgroundColor: '#b81414',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '12px',
    marginTop: '7px',          
    alignSelf: 'center',   
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    paddingTop: '20px',
    color: '#111',
    textAlign: 'left', 
    fontSize: '17px',
    fontFamily: 'sans-serif',
  },
  modalTitle: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
    fontFamily: 'sans-serif',
  },  
  closeBtn: {
    display: "block", 
    margin: '5px auto 0',
    padding: '8px 16px',
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
  },
  moreInfoLink: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 15px", 
    backgroundColor: "#b81414",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    fontFamily: 'sans-serif',
  },
};

export default FilterResult;
