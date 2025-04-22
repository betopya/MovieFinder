import { useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png"; // Logoyu içe aktardık

function Footer() {
  // Hover kontrolü için state
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>

        {/* Sol taraf: Logo & Açıklama & Sosyal Medya */}
        <div style={styles.left}>
          <img src={logo} alt="MovieApp Logo" style={styles.logo} />
          <p style={styles.description}>Your friendly movie recommendation platform</p>
          <div style={styles.socialIcons}>
            <FaInstagram style={styles.icon} />
            <FaTwitter style={styles.icon} />
            <FaYoutube style={styles.icon} />
          </div>
        </div>

        {/* En Popüler Türler */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Most Popular Genres</h3>
          <div style={styles.underline}></div>
          <ul style={styles.list}>
            {["Comedy", "Horror", "Thriller", "Action"].map((genre, index) => (
              <li
                key={index}
                style={{
                  ...styles.listItem,
                  ...(hoveredItem === genre ? styles.listItemHover : {}),
                }}
                onMouseEnter={() => setHoveredItem(genre)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>

        {/* Yıla Göre Film  */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Choose Movie by Year</h3>
          <div style={styles.underline}></div>
          <ul style={styles.list}>
            {Array.from({ length: 5 }, (_, i) => 2025 - i).map((year) => (
              <li
                key={year}
                style={{
                  ...styles.listItem,
                  ...(hoveredItem === year ? styles.listItemHover : {}),
                }}
                onMouseEnter={() => setHoveredItem(year)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {year}
              </li>
            ))}
          </ul>
        </div>

        {/* Menü */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Menu</h3>
          <div style={styles.underline}></div>
          <ul style={styles.list}>
            {["Submit Your Recommendation", "Contact Us", "Subscribe"].map((item, index) => (
              <li
                key={index}
                style={{
                  ...styles.listItem,
                  ...(hoveredItem === item ? styles.listItemHover : {}),
                }}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}


const styles = {
  footer: {
    position: "relative",
    backgroundColor: "#111",
    color: "#fff",
    padding: "50px 50px",
    fontFamily: 'sans-serif',
    //clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 100%)",
  },
  
  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  left: {
    maxWidth: "300px",
    textAlign: "center",
  },
  logo: {
    width: "150px",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#bbb",
    marginBottom: "15px",
    textAlign: "center",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  icon: {
    fontSize: "24px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  section: {
    maxWidth: "250px",
    textAlign: "center",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    marginBottom: "8px",
    marginTop: "40px",
  },
  underline: {
    width: "200px",
    height: "2px",
    backgroundColor: "#b81414",
    margin: "0 auto 15px",
  },
  list: {
    listStyle: "none",
    padding: "0",
    margin: "0",
    fontSize: "14px",
    color: "#ddd",
    lineHeight: "1.9",
  },
  listItem: {
    transition: "transform 0.3s ease",
    cursor: "pointer",
    textAlign: "center",
  },
  listItemHover: {
    transform: "scale(1.2)",
  },
};


export default Footer;
