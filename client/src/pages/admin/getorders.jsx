import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import AdminSidebar from "../../components/adminsidebar";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/auth/all-orders"
        );
        console.log("Fetched Orders:", data);

        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching all orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
    },
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
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products) => (
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              Product ID: {product.productId}, Quantity: {product.quantity},
              Price: ${product.price}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "products",
      key: "totalPrice",
      render: (products) =>
        products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar />
      <div style={{ padding: "20px", width: "100%" }}>
        <h1>All Orders</h1>

        <Table
          dataSource={orders}
          columns={columns}
          loading={loading}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default AllOrders;
