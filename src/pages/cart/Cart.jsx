import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../../context/Shop-context";
import { CartItem } from "./Cart-item";
import { useNavigate } from "react-router-dom";
import { SmileySad, Rewind, SpinnerGap } from "phosphor-react";
import "./cart.css";

export const Cart = () => {
  const { cartItems, products, loading } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let ta = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0 && products !== null) {
        let itemInfo = products.find(
          (product) => Number(product.id) === Number(item)
        );
        ta += cartItems[item] * itemInfo.price;
      }
    }

    setTotalAmount((prev) => ta);
  }, [cartItems]);

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {loading ? (
          <div className="loading">
            <SpinnerGap size="100" color="#3E3D3A" className="loadingSpinner" />
            <p>Loading products...</p>
          </div>
        ) : (
          Object.keys(cartItems).length !== 0 &&
          products.map(
            (product) =>
              cartItems[product.id] !== 0 && (
                <CartItem key={product.id} data={product} />
              )
          )
        )}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <h3 className="subtotal">
            SUBTOTAL: {totalAmount.toLocaleString("ro-RO")} Lei
          </h3>
          <button onClick={() => navigate("/")}>Continue Shoppping</button>
          <button>Checkout</button>
        </div>
      ) : (
        !loading && (
          <div className="emptyCart">
            <h1 className="emptyCartTitle">
              YOUR CART IS EMPTY&nbsp;
              <SmileySad size={32} />
            </h1>
            <button onClick={() => navigate("/")}>
              <Rewind size={32} />
              &nbsp;Back Shoppping
            </button>
          </div>
        )
      )}
    </div>
  );
};
