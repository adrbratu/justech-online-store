import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, Cpu } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/Shop-context";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems, products } = useContext(ShopContext);
  const [itemsInCart, setItemsInCart] = useState(null);

  useEffect(() => {
    let sum = 0;
    sum = Object.values(cartItems).reduce((acc, value) => acc + value, 0);

    if (sum !== 0) {
      setItemsInCart(sum);
    } else {
      setItemsInCart(null);
    }
  }, [cartItems, products]);

  return (
    <div className="navbar">
      <div className="shopTitle">
        <Cpu
          className="company_logo"
          size={32}
          color="#e5f42a"
          onClick={() => navigate("/")}
        />
        <h1 className="company_name" onClick={() => navigate("/")}>
          JUSTECH
        </h1>
      </div>
      <div className="links">
        <NavLink to="/">Shop</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <NavLink to="/cart">
          <>
            <ShoppingCart size={32} />
            {itemsInCart !== null && (
              <span className="itemsInCart">{itemsInCart}</span>
            )}
          </>
        </NavLink>
      </div>
    </div>
  );
};
