

import React, { useState, useEffect } from "react";
import LinkCard from "./LinkCard";

function LinkList() {
  const [links, setLinks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const updateLinks = () => {
      const stored = JSON.parse(localStorage.getItem("links")) || [];
      setLinks(stored);
    };
    updateLinks();
    window.addEventListener("storage", updateLinks);
    return () => window.removeEventListener("storage", updateLinks);
  }, []);

  const filtered = links.filter(
    (l) =>
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((link, i) => (
          <LinkCard key={i} link={link} index={i} />
        ))}
      </div>
    </div>
  );
}

export default LinkList;


