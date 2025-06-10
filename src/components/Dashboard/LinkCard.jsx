

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";

function LinkList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "links"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLinks(data);
    };
    fetchLinks();
  }, []);

  return (
    <div className="grid gap-4">
      {links.map((link) => (
        <div key={link.id} className="border p-4 rounded bg-white shadow">
          <h3 className="font-bold text-lg">{link.title}</h3>
          <p>{link.description}</p>
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Visit
          </a>
        </div>
      ))}
    </div>
  );
}

export default LinkList;
