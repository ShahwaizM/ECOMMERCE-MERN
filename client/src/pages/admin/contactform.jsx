import AdminSidebar from "../../components/adminsidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
// import "antd/dist/antd.css";

const ContactForm = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "https://fashionhubserver.vercel.app/api/v1/contact/getcontact"
        );
        console.log(response.data);

        const { data } = response;

        if (data && data.contacts) {
          setContacts(data.contacts);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar />
      <div style={{ padding: "20px" }}>
        <h1>Contact Form Responses</h1>
        <Table
          dataSource={contacts}
          columns={columns}
          loading={loading}
          rowKey="_id"
        />
      </div>
    </div>
  );
};

export default ContactForm;
