// Add News
import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";

export default function NewsRoomMedia() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/news-room/");
        const data = response.data;
        // Normalize response to an array: accept direct array, or { results: [...] }, or single object
        if (Array.isArray(data)) setNewsItems(data);
        else if (data && Array.isArray(data.results))
          setNewsItems(data.results);
        else if (data) setNewsItems([data]);
        else setNewsItems([]);
      } catch (error) {
        console.error("Failed to fetch news items.", error);
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News Room</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsItems.map((newsItem) => (
          <div key={newsItem.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{newsItem.title}</h2>
            <p className="text-gray-700">{newsItem.description}</p>
            {newsItem.image && (
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="mt-2 rounded-lg"
              />
            )}
            {newsItem.news_link && (
              <a
                href={newsItem.news_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                Read more
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
