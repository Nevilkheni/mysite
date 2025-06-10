
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="grid gap-4">
      {links.map((link) => (
        <div key={link.id} className="border p-4 rounded bg-white shadow">
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
