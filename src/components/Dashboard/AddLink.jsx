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
      await addDoc(collection(db, "links"), {
        ...link,
        createdAt: Timestamp.now(),
        userId: auth.currentUser.uid,
      });
      setLink({ title: "", url: "", description: "" });
    } catch (error) {
      console.error("Error adding link:", error);
      alert("Error adding link: " + error.message);
    }
  };

  return (
    <div className="space-y-3 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a New Link</h2>
      <input
        placeholder="Title"
        value={link.title}
        onChange={(e) => setLink({ ...link, title: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        placeholder="URL"
        value={link.url}
        onChange={(e) => setLink({ ...link, url: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <textarea
        placeholder="Description (optional)"
        value={link.description}
        onChange={(e) => setLink({ ...link, description: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={3}
      />
      <button
        onClick={handleAdd}
        className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
      >
        Add Link
      </button>
    </div>
  );
}

export default AddLink;
