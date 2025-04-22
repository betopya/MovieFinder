import React, { useState } from "react";
import bannerImg from "../assets/banner.png"; 

const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    banner: {
      position: "relative",
      width: "100%",
      height: "450px",
      overflow: "hidden",
      marginTop: "68px",
    },
    bannerImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    blurOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backdropFilter: "blur(5px)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    bannerContent: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      color: "white",
      fontFamily: 'sans-serif',
    },
    title: {
      fontSize: "42px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    description: {
      fontSize: "18px",
      marginBottom: "20px",
    },
    bannerButton: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
    },
    button: {
      backgroundColor: isHovered ? "#b81414" : "#333",
      color: "white",
      border: "none",
      padding: "12px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      borderRadius: "5px",
      transition: "0.3s ease",
    },
  };

  return (
    <div style={styles.banner}>
      <img src={bannerImg} alt="Movie Banner" style={styles.bannerImg} />
      <div style={styles.blurOverlay}></div> 
      <div style={styles.bannerContent}>
        <h1 style={styles.title}>Welcome to Your Ultimate Movie Guide!</h1>
        <p style={styles.description}>
          Discover the best movies curated just for you.
        </p>
        <div style={styles.bannerButton}>
          <button
            style={styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Random Pick
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
