import React from "react";
import Navbar from "./Navbar";
import AddLink from "./Dashboard/AddLink";
import LinkList from "./Dashboard/LinkList";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <Navbar />
      <AddLink />
      <LinkList />
    </div>
  );
}

export default Dashboard;
