
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";

function LinkList() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(collection(db, "links"), where("userId", "==", user.uid));
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="grid gap-4">
      {links.map((link) => (
        <div key={link.id} className="border p-4 rounded bg-white shadow relative">
          <button
            onClick={() => handleDelete(link.id)}
            className="absolute top-5 text-white p-2 bg-blue-600 rounded-lg right-3  hover:text-white"
          >
            &times;
          </button>
          <h3 className="font-bold text-lg">{link.title}</h3>
          <p>{link.description}</p>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Visit
          </a>
        </div>
      ))}
      {links.length === 0 && (
        <p className="text-gray-500 text-center">No links found for this user.</p>
      )}
    </div>
  );
}

export default LinkList;
