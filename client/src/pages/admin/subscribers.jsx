import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/adminsidebar";
import { Table, Spin, Typography } from "antd";

const { Title } = Typography;

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const { data } = await axios.get(
          "https://fashionhubserver.vercel.app/api/v1/subscriber/getsubscribers"
        );
        setSubscribers(data.subscribers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar />
      <div style={{ padding: "20px" }}>
        <Title level={2}>Subscriber List</Title>
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <Table
            dataSource={subscribers}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </div>
    </div>
  );
};

export default SubscriberList;
