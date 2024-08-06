import React from "react";
import AdminSidebar from "../../components/adminsidebar";
import AdminContent from "./admincontent";
import "./adminpanel.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard row ">
      <AdminSidebar />
      <AdminContent />
    </div>
  );
}

export default AdminDashboard;
