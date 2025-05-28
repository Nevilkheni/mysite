import React from "react";
import Navbar from "./Navbar";
import AddLink from "./Dashboard/AddLink";
import LinkList from "./Dashboard/LinkList";

function Dashboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Navbar />
      <AddLink />
      <LinkList />
    </div>
  );
}

export default Dashboard;
