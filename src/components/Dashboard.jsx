import React from "react";
import Navbar from "./Navbar";
import AddLink from "./Dashboard/AddLink";
import LinkList from "./Dashboard/LinkList";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-200 to-green-200">
      <Navbar />
      <main className="flex-grow p-4">
        <AddLink />
        <LinkList />
      </main>
    </div>
  );
}

export default Dashboard;
