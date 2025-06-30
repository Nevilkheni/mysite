import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";

function LinkList() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(
            collection(db, "links"),
            where("userId", "==", user.uid)
          );
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLinks(data);
        } catch (error) {
          console.error("Error fetching links:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "links", id));
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
      {links.map((link, index) => (
        <div
          key={link.id}
          className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow">
            Link #{index + 1}
          </div>
          <button
            onClick={() => handleDelete(link.id)}
            className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
            title="Delete"
          >
            &times;
          </button>
          <h3 className="font-semibold text-xl text-gray-800 mb-2 mt-6">
            {link.title}
          </h3>
          <p className="text-gray-600 mb-3 text-sm">{link.description}</p>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-medium underline hover:text-indigo-800"
          >
            Visit Link →
          </a>
        </div>
      ))}
      {links.length === 0 && (
        <p className="text-gray-400 text-center col-span-full">
          No links found for this user.
        </p>
      )}
    </div>
  );
}

export default LinkList;
