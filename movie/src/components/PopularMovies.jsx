import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function PopularMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Popular Movies</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={7} 
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1288: { slidesPerView: 7 },
        }}
        style={{ paddingBottom: "50px" }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} style={styles.slide}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={styles.movieImage}
            />
            <h3 style={styles.movieTitle}>{movie.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    color: "#fff",
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#000",
    marginTop: "50px",
    marginBottom: "30px",
  },
  slide: {
    textAlign: "center",
    transition: "transform 0.3s",
  },
  movieImage: {
    width: "100%",
    borderRadius: "10px",
  },
  movieTitle: {
    fontSize: "14px",
    marginTop: "10px",
    color: "black",
  },
};

export default PopularMovies;
