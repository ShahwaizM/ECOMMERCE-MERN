import AdminSidebar from "../../components/adminsidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "https://fashionhubserver.vercel.app/api/v1/auth/users"
        );
        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar />
      <div style={{ padding: "20px" }}>
        <h1>All Registered Users</h1>
        <Table
          dataSource={users}
          columns={columns}
          loading={loading}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
        {}
      </div>
    </div>
  );
};

export default AdminUsers;
