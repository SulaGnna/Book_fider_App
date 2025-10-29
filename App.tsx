import { useState } from "react";
import "./styles.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      setBooks(data.docs.slice(0, 15));
    } catch (err) {
      console.error("Error fetching books:", err);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Book Finder</h1>
        <p>Search for your favorite books instantly!</p>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks()}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="book-grid">
          {books.map((book, index) => (
            <div key={index} className="book-card">
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : "https://via.placeholder.com/150x200?text=No+Cover"
                }
                alt={book.title}
              />
              <h3>{book.title}</h3>
              <p>{book.author_name?.[0] || "Unknown Author"}</p>
            </div>
          ))}
        </div>
      )}

      <footer>
        Built by <strong>Sulagnna Mohanty 💻</strong> with React + Open Library
        API
      </footer>
    </div>
  );
}

export default App;
