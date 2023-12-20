import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || {}
  );
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const storedCart = localStorage.getItem("cart");

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      setCartItems(JSON.parse(storedCart));
      setLoading(false);
      fetch("https://657dcee13e3f5b18946330f6.mockapi.io/api/v1/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
          localStorage.setItem("products", JSON.stringify(data));
        });
    } else {
      fetch("https://657dcee13e3f5b18946330f6.mockapi.io/api/v1/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
          localStorage.setItem("products", JSON.stringify(data));
          if (!storedCart) {
            let cart = {};
            for (let i = 1; i < data.length + 1; i++) {
              cart[i] = 0;
            }
            setCartItems(cart);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const emptyItem = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const reloadProducts = () => {
    setLoading(true);
    fetch("https://657dcee13e3f5b18946330f6.mockapi.io/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        localStorage.setItem("products", JSON.stringify(data));
      });
  };

  const deleteProducts = (productID) => {
    setLoading(true);
    //change the element that was deleted to 0 items in cart
    let cart = cartItems;
    delete cart[productID];

    //change cart items
    setCartItems(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    fetch("https://657dcee13e3f5b18946330f6.mockapi.io/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
        setLoading(false);
      });
  };

  const addingProducts = (productID) => {
    setLoading(true);
    //change the element that was deleted to 0 items in cart
    let cart = cartItems;
    cart[productID] = 0;

    //change cart items
    setCartItems(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    fetch("https://657dcee13e3f5b18946330f6.mockapi.io/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        localStorage.setItem("products", JSON.stringify(data));
      });
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    emptyItem,
    updateCartItemCount,
    getTotalCartAmount,
    products,
    loading,
    reloadProducts,
    deleteProducts,
    addingProducts,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
