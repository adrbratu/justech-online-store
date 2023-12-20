import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/Shop-context";
import { SpinnerGap } from "phosphor-react";
import { Rewind } from "phosphor-react";
import "./productpage.css";

export const Productpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];

  const currentProduct = !loading && products.filter((p) => p.id === id);
  const { productImage, productName, quantity, price, productDescription } =
    currentProduct && currentProduct[0];

  return (
    <div className="productDisplay">
      {loading ? (
        <div className="loading">
          <SpinnerGap size="100" color="#3E3D3A" className="loadingSpinner" />
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="productPresentation">
          <span className="backShopping" onClick={() => navigate("/")}>
            <Rewind size={18} />
            &nbsp;back shopping
          </span>
          <div className="productImageDescriptionPrice">
            <div className="productImage">
              <img
                src={productImage}
                alt={productName + " image"}
                id="productPageImage"
              />
            </div>
            <div className="description">
              <p>
                <b>{productName}</b>
              </p>
              <p>{price.toLocaleString("ro-RO")} Lei</p>
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
          </div>
          <div className="productLongDescription">
            <h5 className="titleLongDescription">DESCRIERE</h5>
            <h6>{productDescription}</h6>
          </div>
        </div>
      )}
    </div>
  );
};
