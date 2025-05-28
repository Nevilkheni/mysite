import React, { useState } from "react";

function AddLink() {
  const [link, setLink] = useState({ title: "", url: "", description: "" });

  const handleAdd = () => {
    if (!link.title || !link.url) {
      alert("Title and URL are required");
      return;
    }
    const links = JSON.parse(localStorage.getItem("links")) || [];
    links.push(link);
    localStorage.setItem("links", JSON.stringify(links));
    setLink({ title: "", url: "", description: "" });
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="space-y-2 items-center flex flex-col   mb-6">
      <input
        placeholder="Title"
        value={link.title}
        onChange={(e) => setLink({ ...link, title: e.target.value })}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        placeholder="URL"
        value={link.url}
        onChange={(e) => setLink({ ...link, url: e.target.value })}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        placeholder="Description (optional)"
        value={link.description}
        onChange={(e) => setLink({ ...link, description: e.target.value })}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-green-600 w-40  text-white rounded hover:bg-green-700 transition"
      >
        Add Link
      </button>
    </div>
  );
}

export default AddLink;
