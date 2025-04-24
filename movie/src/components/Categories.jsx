import React from "react";

const Categories = () => {
  const categories = ["Action", "Drama", "Comedy",  "Horror", "Romance", "Thriller"];

  return (
    <div style={styles.container}>
      {categories.map((category, index) => (
        <button key={index} style={styles.button}>
          {category}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
  },
  button: {
    backgroundColor: "#b81414", 
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Categories;
