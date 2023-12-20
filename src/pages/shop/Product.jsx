import React, { useContext } from "react";
import { ShopContext } from "../../context/Shop-context";
import { useNavigate } from "react-router-dom";

export const Product = (props) => {
  const navigate = useNavigate();
  const { id, productName, price, productImage, quantity } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];
  return (
    <div className="product">
      <img
        src={productImage}
        alt={productName + " image"}
        onClick={() => {
          navigate(`/products/${id}`);
        }}
      />
      <div
        className="description"
        onClick={() => {
          navigate(`/products/${id}`);
        }}
      >
        <p>
          <b>{productName}</b>
        </p>
        <p>{price.toLocaleString("ro-RO")} Lei</p>
      </div>
      <button
        disabled={cartItemAmount === quantity && true}
        className="addToCartButton"
        onClick={() => {
          if (cartItemAmount < quantity) addToCart(id);
        }}
      >
        {cartItemAmount === 0 ? (
          <span>Add To Cart</span>
        ) : cartItemAmount > 0 && cartItemAmount < quantity ? (
          <span>Add To Cart ({cartItemAmount})</span>
        ) : (
          cartItemAmount === quantity && (
            <span>Max items reached ({cartItemAmount})</span>
          )
        )}
      </button>
    </div>
  );
};
