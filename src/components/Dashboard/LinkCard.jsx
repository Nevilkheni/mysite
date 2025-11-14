

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

  const normalizeUrl = (u) => {
    if (!u) return u;
    let s = u.trim();
    s = s.replace(/^(https?:\/\/)+/i, "$1");
    if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
    return s;
  };

  return (
    <div className="grid gap-4">
      {links.map((link) => (
        <div key={link.id} className="card">
          <h3 className="font-bold text-lg" style={{ color: "var(--header-text)" }}>{link.title}</h3>
          <p style={{ color: "var(--muted)" }}>{link.description}</p>
          <a href={normalizeUrl(link.url)} target="_blank" rel="noopener noreferrer" className="site-link">
            Visit
          </a>
        </div>
      ))}
    </div>
  );
}

export default LinkList;
