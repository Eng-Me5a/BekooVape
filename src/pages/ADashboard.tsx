import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaStickyNote,
  FaCalendarAlt,
  FaBoxes,
} from "react-icons/fa";
import "../scss/adminDashboard.scss";

type OrderItem = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
};

type Order = {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
    notes?: string;
  };
  items: OrderItem[];
  totalPrice: number;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
};

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        const validOrders = data.filter(
          (order: any) => order && order.id && typeof order.id === "string"
        );

        setOrders(validOrders);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const updateOrderStatus = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      if (!orderId) {
        throw new Error("Invalid order ID");
      }

      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update order");
      }

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update order");
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order");
      }

      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete order");
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>لوحة تحكم الطلبات</h1>
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">جميع الطلبات</option>
            <option value="pending">قيد الانتظار</option>
            <option value="processing">قيد التجهيز</option>
            <option value="completed">مكتملة</option>
            <option value="cancelled">ملغاة</option>
          </select>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin-login";
          }}
          className="logout-btn"
        >
          تسجيل الخروج
        </button>
      </header>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p>لا توجد طلبات متاحة</p>
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <div key={order.id} className={`order-card ${order.status}`}>
              <div className="order-header">
                <h3>طلب # {(order.id || "N/A").toString().slice(0, 8)}</h3>
                <span className={`status-badge ${order.status}`}>
                  {order.status === "pending" && "قيد الانتظار"}
                  {order.status === "processing" && "قيد التجهيز"}
                  {order.status === "completed" && "مكتملة"}
                  {order.status === "cancelled" && "ملغاة"}
                </span>
              </div>

              <div className="order-details">
                <div className="customer-info">
                  <div className="detail">
                    <FaCalendarAlt className="icon" />
                    <span>{new Date(order.date).toLocaleString("ar-EG")}</span>
                  </div>
                  <div className="detail">
                    <FaUser className="icon" />
                    <span>{order.customer.name}</span>
                  </div>
                  <div className="detail">
                    <FaMapMarkerAlt className="icon" />
                    <span>{order.customer.address}</span>
                  </div>
                  <div className="detail">
                    <FaPhone className="icon" />
                    <span>{order.customer.phone}</span>
                  </div>
                  {order.customer.notes && (
                    <div className="detail">
                      <FaStickyNote className="icon" />
                      <span>{order.customer.notes}</span>
                    </div>
                  )}
                </div>

                <div className="order-items">
                  <h4>
                    <FaBoxes className="icon" />
                    العناصر:
                  </h4>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="item-image"
                        />
                        <div className="item-info">
                          <span className="item-title">{item.title}</span>
                          <span className="item-quantity">
                            {item.count} × {item.price} ج.م
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="order-footer">
                <div className="total-price">
                  الإجمالي: <strong>{order.totalPrice} ج.م</strong>
                </div>
                <div className="order-actions">
                  {order.status !== "completed" &&
                    order.status !== "cancelled" && (
                      <>
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "processing")
                          }
                          className="action-btn process"
                        >
                          تجهيز
                        </button>
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "completed")
                          }
                          className="action-btn complete"
                        >
                          اكتمال
                        </button>
                      </>
                    )}
                  {order.status !== "cancelled" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "cancelled")}
                      className="action-btn cancel"
                    >
                      إلغاء
                    </button>
                  )}
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="action-btn delete"
                    style={{ backgroundColor: "#e74c3c" }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
