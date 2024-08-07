import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Select, message } from "antd";
import AdminSidebar from "../../components/adminsidebar";

const { Option } = Select;

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const { data } = await axios.get(
          "https://fashionhubserver.vercel.app/api/v1/auth/all-orders"
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

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(
        `https://fashionhubserver.vercel.app/api/v1/auth/order-status/${selectedOrder._id}`,
        { status }
      );
      message.success("Order status updated successfully!");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id ? { ...order, status } : order
        )
      );
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status.");
    }
  };

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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleEditClick(record)}>
          Edit Status
        </Button>
      ),
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

        <Modal
          title="Update Order Status"
          visible={isModalVisible}
          onOk={handleUpdateStatus}
          onCancel={() => setIsModalVisible(false)}
        >
          <Select
            value={status}
            onChange={(value) => setStatus(value)}
            style={{ width: "100%" }}
          >
            <Option value="pending">Pending</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Modal>
      </div>
    </div>
  );
};

export default AllOrders;
