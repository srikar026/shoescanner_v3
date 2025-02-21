import { useState } from "react";

export default function ShoeScanner() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    setLoading(true);
    const response = await fetch(`/search?query=${query}`);
    const data = await response.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>ShoeScanner - Find the Best Prices</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter sneaker name..."
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        />
        <button onClick={fetchPrices} disabled={loading} style={{ padding: "10px", width: "100%" }}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <div>
        {results.length > 0 ? (
          results.map((item, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
              <p><strong>{item.retailer}</strong></p>
              <p>Price: {item.price}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">View Listing</a>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}
