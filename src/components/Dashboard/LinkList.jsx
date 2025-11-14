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

  if (loading) return <p className="text-center" style={{ color: "var(--muted)" }}>Loading...</p>;

  const normalizeUrl = (u) => {
    if (!u) return u;
    let s = u.trim();
    s = s.replace(/^(https?:\/\/)+/i, "$1");
    if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
    return s;
  };

  return (
    <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
      {links.map((link, index) => (
        <div
          key={link.id}
          className="relative p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 link-card"
        >
          <div className="absolute top-4 left-4 badge">Link #{index + 1}</div>
          <button
            onClick={() => handleDelete(link.id)}
            className="absolute top-4 right-4 btn-danger"
            title="Delete"
          >
            &times;
          </button>
          <h3 className="font-semibold text-xl mb-2 mt-6" style={{ color: "var(--header-text)" }}>
            {link.title}
          </h3>
          <p className="mb-3 text-sm" style={{ color: "var(--muted)" }}>{link.description}</p>
          <a
            href={normalizeUrl(link.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="site-link"
          >
            Visit Link →
          </a>
        </div>
      ))}
      {links.length === 0 && (
        <p className="text-center col-span-full" style={{ color: "var(--muted)" }}>
          No links found for this user.
        </p>
      )}
    </div>
  );
}

export default LinkList;
