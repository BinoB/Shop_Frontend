import React, { useEffect, useState } from "react";
import "./DefaultLayout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const navigate = useNavigate();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className={`layout ${collapsed ? "collapsed" : ""}`}>
      {loading && (
        <div className="spinner">
          <div className="spinner-borders" role="status"></div>
        </div>
      )}
      <div className="sider">
        <div className="logo">
          <h3>{collapsed ? "SP" : "Shop"}</h3>
        </div>
        <ul className="menu">
          <li className="menu-item">
            <Link to="/home">
              <span>Home</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/cart">
              <span>Cart</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/bills">
              <span>Bills</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/items">
              <span>Items</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/customers">
              <span>Customers</span>
            </Link>
          </li>
          <li className="menu-item" onClick={() => {
            localStorage.removeItem('pos-user');
            navigate('/login');
          }}>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="content">
        <header className="header">
          <button className="trigger" onClick={toggle}>
            {collapsed ? "" : ""}
          </button>
          <div
            className="cart-count"
            onClick={() => navigate("/cart")}
          >
            <b>
              <p>{cartItems.length}</p>
            </b>
            <span className="cart-icon">Cart</span>
          </div>
        </header>
        <div className="page-content">{props.children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;