import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useToast } from "../Shared/ToastProvider";

function AddLink() {
  const [link, setLink] = useState({ title: "", url: "", description: "" });
  const { showToast } = useToast();
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!link.title || !link.url) {
      alert("Title and URL are required");
      return;
    }

    if (!auth.currentUser) {
      alert("You must be logged in to add a link.");
      return;
    }

    setAdding(true);
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

      const docRef = await addDoc(collection(db, "links"), dataToSave);
      setLink({ title: "", url: "", description: "" });
      if (showToast) {
        showToast({
          title: 'Link added',
          message: dataToSave.title || 'New link added',
          type: 'success',
          meta: { url: dataToSave.url, id: docRef.id },
          timeout: 7000,
        })
      }
    } catch (error) {
      console.error("Error adding link:", error);
      if (showToast) {
        showToast({ title: 'Error adding link', message: error.message, type: 'error' })
      } else {
        alert("Error adding link: " + error.message);
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="space-y-3 max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a New Link</h2>
      <input
        placeholder="Title"
        value={link.title}
        onChange={(e) => setLink({ ...link, title: e.target.value })}
        className="input"
      />
      <input
        placeholder="URL"
        value={link.url}
        onChange={(e) => setLink({ ...link, url: e.target.value })}
        className="input"
      />
      <textarea
        placeholder="Description (optional)"
        value={link.description}
        onChange={(e) => setLink({ ...link, description: e.target.value })}
        className="input"
        rows={3}
      />
        <button
          type="button"
          onClick={handleAdd}
          className={`w-full py-2 btn-primary ${adding ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={adding}
        >
          {adding ? (
            <span className="inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Adding...</span>
            </span>
          ) : (
            'Add Link'
          )}
        </button>
      </div>
    </div>
  );
}

export default AddLink;
