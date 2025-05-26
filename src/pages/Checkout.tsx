import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import "../scss/_checkout.scss";

export const Checkout: React.FC = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const totalCount = items.reduce(
    (total: number, item: any) => total + item.count,
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "https://beko-vape-server-production.up.railway.app/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      customer: formData,
      items,
      totalPrice,
      date: new Date().toISOString(),
    };

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Order confirmed! Thank you.");
        // هنا ممكن تفرغ السلة لو حابب
      } else {
        setErrorMessage(data.message || "Failed to place order.");
      }
    } catch (error: any) {
      setErrorMessage("Error occurred while placing order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container container--cart">
      <div className="checkout">
        <h2 className="checkout__title">Checkout</h2>

        <div className="checkout__items">
          <h3>Your Order ({totalCount} items)</h3>
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="checkout__total">
            <span>
              Total: <b>{totalPrice} EGP</b>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout__form">
          <h3>Shipping Information</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Shipping Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Order Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="checkout__actions">
            <Link to="/cart" className="button button--outline">
              Back to Cart
            </Link>
            <button type="submit" className="button pay-btn" disabled={loading}>
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>

          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};
