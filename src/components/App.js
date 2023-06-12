import "../styles/App.css";
import React, { useState, useEffect } from "react";

const keys = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");

const App = () => {
  const [previewText, setPreviewText] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (previewText === "forty two") {
      fetchQuote();
    } else {
      setQuote("");
    }
  }, [previewText]);

  const handleKeyPress = (key) => {
    setPreviewText((prevText) => prevText + key);
  };

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      const { content } = data;
      setQuote(content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="keyboard">
      <div className="preview">{previewText}</div>
      {quote && <div className="quote">{quote}</div>}
      <div>
        {keys.map((key) => (
          <button
            key={key}
            id={key === " " ? `key-space` : `key-${key}`}
            onClick={() => handleKeyPress(key)}
          >
            {key === " " ? "Space" : key.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
