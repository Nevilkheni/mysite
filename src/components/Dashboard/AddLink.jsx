import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";

function AddLink() {
  const [link, setLink] = useState({ title: "", url: "", description: "" });

  const handleAdd = async () => {
    if (!link.title || !link.url) {
      alert("Title and URL are required");
      return;
    }

    if (!auth.currentUser) {
      alert("You must be logged in to add a link.");
      return;
    }

    try {
      const normalizeUrl = (u) => {
        if (!u) return u;
        let s = u.trim();
        s = s.replace(/^(https?:\/\/)+/i, "$1");
        if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
        return s;
      };

      const dataToSave = {
        ...link,
        url: normalizeUrl(link.url),
        createdAt: Timestamp.now(),
        userId: auth.currentUser.uid,
      };

      await addDoc(collection(db, "links"), dataToSave);
      setLink({ title: "", url: "", description: "" });
    } catch (error) {
      console.error("Error adding link:", error);
      alert("Error adding link: " + error.message);
    }
  };

  return (
    <div className="space-y-3 max-w-xl mx-auto card">
      <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--muted)" }}>Add a New Link</h2>
      <input
        placeholder="Title"
        value={link.title}
        onChange={(e) => setLink({ ...link, title: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 input"
      />
      <input
        placeholder="URL"
        value={link.url}
        onChange={(e) => setLink({ ...link, url: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 input"
      />
      <textarea
        placeholder="Description (optional)"
        value={link.description}
        onChange={(e) => setLink({ ...link, description: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 input"
        rows={3}
      />
      <button
        onClick={handleAdd}
        className="w-full py-2 btn-primary"
      >
        Add Link
      </button>
    </div>
  );
}

export default AddLink;
