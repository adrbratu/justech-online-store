import React, { useContext } from "react";
import { ShopContext } from "../../context/Shop-context";
import { useNavigate } from "react-router-dom";
import { XCircle } from "phosphor-react";

export const CartItem = (props) => {
  const navigate = useNavigate();
  const { id, productName, price, productImage, quantity } = props.data;
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    emptyItem,
  } = useContext(ShopContext);

  const cartItemAmount = cartItems[id];

  return (
    <div className="cartItem">
      <div className="cartItem2">
        <img
          src={productImage}
          alt={productName + " image"}
          id="productImage"
          onClick={() => {
            navigate(`/products/${id}`);
          }}
        />
        <div className="description">
          <p
            className="productTitleCart"
            onClick={() => {
              navigate(`/products/${id}`);
            }}
          >
            <b>{productName}</b>
          </p>
          <p>{price.toLocaleString("ro-RO")} Lei</p>
          <div className="countHandler">
            <button onClick={() => removeFromCart(id)}>-</button>
            <input
              type="number"
              value={cartItems[id]}
              max={quantity}
              onChange={(e) => {
                if (quantity >= cartItemAmount)
                  updateCartItemCount(
                    Math.min(Number(e.target.value), quantity),
                    id
                  );
              }}
            />
            <button
              onClick={() => {
                if (quantity !== cartItemAmount) addToCart(id);
              }}
              disabled={quantity === cartItemAmount && true}
            >
              +
            </button>
            {quantity === cartItemAmount && (
              <span className="warningMaxAmount">max amount reached</span>
            )}
          </div>
        </div>
      </div>
      <span className="closeButton">
        <XCircle size={25} color="#f32c76" onClick={() => emptyItem(id)} />
      </span>
    </div>
  );
};
