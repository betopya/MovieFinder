import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function FilterResult() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  // URL'den filtre parametrelerini al
  const queryParams = new URLSearchParams(location.search);
  const genre = queryParams.get('genre');
  const country = queryParams.get('country');
  const year = queryParams.get('year');

  console.log('Filter params:', genre, country, year);  // Debug mesajı

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&`;

        if (genre) url += `with_genres=${genre}&`;
        if (country) url += `region=${country}&`;
        if (year) url += `year=${year}&`;

        // Sonundaki '&'i kaldır
        url = url.slice(0, -1);

        console.log('Generated API URL:', url); // API URL'sini kontrol et

        const response = await fetch(url);
        if (!response.ok) throw new Error('Error fetching movies');
        const data = await response.json();

        setMovies(data.results);  // API'nin döndüğü veri formatına göre burayı uyarlayın
      } catch (err) {
        setError('Error fetching movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre, country, year]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Filter Results</h1>
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '200px' }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterResult;
