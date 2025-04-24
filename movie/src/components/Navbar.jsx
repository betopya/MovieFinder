import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Logo
import { FaSearch, FaRegCalendarAlt, FaBell, FaChevronDown } from 'react-icons/fa';

function Navbar() {
  const [hovered, setHovered] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    genre: [],
    country: [],
    year: [],
  });

  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      navigate(`/search/${e.target.value}`);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.leftContainer}>
        <Link to="/" style={styles.logoContainer}>
          <img src={logo} alt="MovieFinder Logo" style={styles.logo} />
          <h1 style={styles.logoText}>MovieFinder</h1>
        </Link>
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchBox}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <ul style={styles.navLinks}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            style={styles.menuItem}
            onMouseEnter={() => setActiveDropdown(item.text.toLowerCase())}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {item.type === 'dropdown' ? (
              <div style={styles.dropdown}>
                <button
                  style={{
                    ...styles.dropdownButton,
                    ...(activeDropdown === item.text.toLowerCase() ? styles.linkHover : {}),
                  }}
                >
                  {item.text} <FaChevronDown />
                </button>
                {activeDropdown === item.text.toLowerCase() && (
                  <ul style={styles.dropdownMenu}>
                    {item.options.map((option, idx) => {
                      const category = item.text.toLowerCase();
                      const isChecked = selectedFilters[category]?.includes(option);

                      return (
                        <li
                          key={idx}
                          style={{ ...styles.dropdownItem, display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked || false}
                            onChange={() => {
                              const updatedOptions = isChecked
                                ? selectedFilters[category].filter(val => val !== option)
                                : [...(selectedFilters[category] || []), option];

                              const updatedFilters = {
                                ...selectedFilters,
                                [category]: updatedOptions,
                              };

                              setSelectedFilters(updatedFilters);

                              const query = new URLSearchParams();
                              Object.keys(updatedFilters).forEach(key => {
                                if (updatedFilters[key]?.length > 0) {
                                  updatedFilters[key].forEach(val => query.append(key, val));
                                }
                              });

                              navigate(`/filter-results?${query.toString()}`);
                            }}
                          />
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                style={{
                  ...styles.link,
                  ...(hovered === index ? styles.linkHover : {}),
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.icon} {item.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

const menuItems = [
  { text: 'Genre', type: 'dropdown', options: ['Action', 'Comedy', 'Horror', 'Drama', 'Sci-Fi', 'Romance', 'Thriller', 'Fantasy', 'Adventure', 'Animation'] },
  { text: 'Country', type: 'dropdown', options: ['USA', 'UK', 'France', 'Germany', 'Turkey', 'India', 'Korea'] },
  { text: 'Year', type: 'dropdown', options: ['2025', '2024', '2023', '2022', '2021', '2020'] },
  { text: 'Content of the Week', path: '/weekly-content', icon: <FaRegCalendarAlt /> },
  { text: 'Subscribe', path: '/subscribe', icon: <FaBell /> },
];

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 300px',
    backgroundColor: '#111',
    color: '#fff',
    zIndex: 1000,
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff',
  },
  logo: {
    width: '50px',
    height: '50px',
  },
  logoText: {
    fontSize: '25px',
    fontWeight: 'bold',
    color: '#b81414',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '8px 12px',
    borderRadius: '5px',
  },
  searchIcon: {
    color: '#FFFFFF',
    marginRight: '8px',
  },
  searchBox: {
    padding: '8px 12px',
    fontSize: '13px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: '#fff',
    outline: 'none',
    width: '200px',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '40px',
    margin: 0,
    padding: 0,
  },
  menuItem: {
    position: 'relative',
    fontFamily: 'sans-serif',
  },
  dropdown: {
    position: 'relative',
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s',
    borderRadius: '5px',
  },
  dropdownButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  dropdownMenu: {
    position: 'absolute', // denem
    
    top: '100%',
    left: 0,
    backgroundColor: '#222',
    listStyle: 'none',
    margin: 0,
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
  dropdownItem: {
    padding: '8px 12px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '10px 15px',
    transition: 'color 0.3s ease, background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '5px', // deneme
  },
  linkHover: {
    color: '#b81414',
  },
};

export default Navbar;
