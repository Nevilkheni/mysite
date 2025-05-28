import React, { useEffect, useState } from "react";

function LinkList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const updateLinks = () => {
      const storedLinks = JSON.parse(localStorage.getItem("links")) || [];
      setLinks(storedLinks);
    };

    updateLinks();

    window.addEventListener("storage", updateLinks);
    return () => window.removeEventListener("storage", updateLinks);
  }, []);

  const handleDelete = (index) => {
    const updated = [...links];
    updated.splice(index, 1);
    localStorage.setItem("links", JSON.stringify(updated));
    setLinks(updated);
  };

  if (links.length === 0)
    return <p className="text-center text-gray-500">No links added yet.</p>;

  return (
    <div className="space-y-4">
      {links.map((link, idx) => (
        <div
          key={idx}
          className="p-4 border rounded shadow flex justify-between items-center"
        >
          <div>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              {link.title}
            </a>
            {link.description && <p className="text-sm text-gray-600">{link.description}</p>}
          </div>
          <button
            onClick={() => handleDelete(idx)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default LinkList;
