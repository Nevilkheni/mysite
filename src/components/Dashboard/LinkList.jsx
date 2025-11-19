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
import { useToast } from "../Shared/ToastProvider";
import Loading from "../Shared/Loading";

function LinkList() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [deletingIds, setDeletingIds] = useState([]);

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

          // Sort links A -> Z by title (case-insensitive). Missing titles go last.
          data.sort((a, b) => {
            const ta = (a.title || "").toString();
            const tb = (b.title || "").toString();
            // localeCompare with sensitivity 'base' for case-insensitive compare
            return ta.localeCompare(tb, undefined, { sensitivity: "base" });
          });

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
    // explicit window.confirm and debug logging
    console.log('Attempting to delete link', id);
    if (!window.confirm('Delete this link?')) return;
    setDeletingIds((s) => [...s, id]);
    try {
      await deleteDoc(doc(db, "links", id));
      setLinks((prev) => prev.filter((link) => link.id !== id));
      if (showToast) showToast({ title: 'Link deleted', message: 'The link was removed', type: 'success' })
    } catch (error) {
      console.error("Error deleting link:", error);
      if (showToast) showToast({ title: 'Delete failed', message: error.message, type: 'error' })
    } finally {
      setDeletingIds((s) => s.filter((x) => x !== id));
    }
  };

  if (loading) return <Loading label="Loading links" />;

  const normalizeUrl = (u) => {
    if (!u) return u;
    let s = u.trim();
    s = s.replace(/^(https?:\/\/)+/i, "$1");
    if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
    return s;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
      {links.map((link, index) => (
        <div key={link.id} className="relative group">
          <div className="absolute top-4 left-4 badge">Link #{index + 1}</div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleDelete(link.id); }}
            className={`absolute top-4 right-4 btn-danger z-20 ${deletingIds.includes(link.id) ? 'opacity-60 cursor-not-allowed' : ''}`}
            title="Delete"
            aria-label={`Delete link ${link.title || ''}`}
            disabled={deletingIds.includes(link.id)}
          >
            {deletingIds.includes(link.id) ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" style={{ color: 'white' }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />
                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (
              <> 
                <span className="group-hover:hidden cursor-pointer">&times;</span>
                <span className="hidden group-hover:inline-flex cursor-pointer" aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z" />
                  </svg>
                </span>
              </>
            )}
          </button>
          <div className="card hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <h3 className="font-semibold text-xl mb-2 mt-6">{link.title}</h3>
            <p className="mb-3 text-sm">{link.description}</p>
            <a
              href={normalizeUrl(link.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer site-link"
            >
              Visit Link →
            </a>
          </div>
        </div>
      ))}
      {links.length === 0 && (
        <p className="text-center col-span-full text-gray-600">
          No links found for this user.
        </p>
      )}
      </div>
    </div>
  );
}

export default LinkList;
