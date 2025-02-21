import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ShoeScanner - Find the Best Prices</h1>
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter sneaker name..."
        />
        <Button onClick={fetchPrices} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>
      <div className="mt-4">
        {results.length > 0 ? (
          results.map((item, index) => (
            <Card key={index} className="mt-2">
              <CardContent className="p-2">
                <p className="font-semibold">{item.retailer}</p>
                <p className="text-sm text-gray-600">Price: {item.price}</p>
                <a
                  href={item.link}
                  target="_blank"
                  className="text-blue-500 text-sm"
                >
                  View Listing
                </a>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 mt-2">No results found.</p>
        )}
      </div>
    </div>
  );
}