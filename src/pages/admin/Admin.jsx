import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/Shop-context";
import {
  SpinnerGap,
  Trash,
  Pencil,
  UploadSimple,
  Check,
  Bug,
  Plus,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export const Admin = () => {
  const navigate = useNavigate();
  const { products, loading, reloadProducts, deleteProducts, addingProducts } =
    useContext(ShopContext);
  const [modificareSucces, setModificareSucces] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    productName: "",
    price: "",
    category: "",
    productDescription: "",
    featured: "",
    productImage: "",
    quantity: "",
    brand: "",
  });
  const [addingError, setAddingError] = useState(null);

  const URL = "https://657dcee13e3f5b18946330f6.mockapi.io/api/v1/products/";

  function editItem(id) {
    setModificareSucces(null);
    setSelectedItem(products.filter((p) => p.id === id)[0]);
  }

  function handleChange(value, objKey) {
    setAddingError(null);
    setModificareSucces(null);
    setSelectedItem((prev) => ({
      ...prev,
      [objKey]: value,
    }));
  }

  const handleUpdateData = () => {
    setAddingError(null);
    setModificareSucces(null);
    fetch(URL + selectedItem.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedItem({
          productName: "",
          price: "",
          category: "",
          productDescription: "",
          featured: "",
          productImage: "",
          quantity: "",
          brand: "",
        });
        if (data !== "Not found") {
          setModificareSucces(1);
          reloadProducts();
        } else {
          setModificareSucces(0);
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        setModificareSucces(0);
      });
  };

  const handleDeleteData = (id) => {
    setModificareSucces(null);
    setAddingError(null);
    fetch(URL + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedItem({
          productName: "",
          price: "",
          category: "",
          productDescription: "",
          featured: "",
          productImage: "",
          quantity: "",
          brand: "",
        });
        deleteProducts(id);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleAddingData = () => {
    setModificareSucces(null);
    setAddingError(null);
    let productsIds = products.map((p) => Number(p.id));
    productsIds.sort((a, b) => b - a);
    const newProductID = (productsIds[0] + 1).toString();

    if (selectedItem.productName === "") {
      setAddingError("Nu ai introdus numele produsului!");
    } else if (selectedItem.category === "") {
      setAddingError("Nu ai introdus categoria produsului!");
    } else if (selectedItem.price === "") {
      setAddingError("Nu ai introdus pretul produsului!");
    } else if (selectedItem.productDescription === "") {
      setAddingError("Nu ai introdus descrierea produsului!");
    } else if (selectedItem.featured === "") {
      setAddingError("Nu ai specificat daca produsul este featured!");
    } else if (selectedItem.quantity === "") {
      setAddingError("Nu ai introdus cantitatea existenta din produs!");
    } else if (selectedItem.brand === "") {
      setAddingError("Nu ai introdus brand-ul produsului!");
    } else if (selectedItem.productImage === "") {
      setAddingError("Nu ai introdus link-ul catre imaginea produsului!");
    } else {
      setAddingError(null);
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedItem),
      })
        .then((response) => response.json())
        .then((data) => {
          setSelectedItem({
            productName: "",
            price: "",
            category: "",
            productDescription: "",
            featured: "",
            productImage: "",
            quantity: "",
            brand: "",
          });
          setAddingError("Succes! Produsul a fost adaugat!");
          addingProducts(newProductID);
          setTimeout(() => {
            document.body.scrollTop = document.body.scrollHeight;
            document.documentElement.scrollTop =
              document.documentElement.scrollHeight;
          }, 1600);
        })
        .catch((error) => {
          setAddingError("Produsul nu a fost adaugat!");
        });
    }
  };

  return (
    <div className="admin">
      <div className="adminForm">
        <div className="adminInputElement">
          <label htmlFor="productNameAdmin">Product name:</label>
          <input
            type="text"
            name="productNameAdmin"
            id="productNameAdmin"
            value={selectedItem.productName}
            onChange={(e) => handleChange(e.target.value, "productName")}
          />
        </div>
        <div className="adminInputElement">
          <label htmlFor="categoryAdmin">Category:</label>
          <input
            type="text"
            name="categoryAdmin"
            id="categoryAdmin"
            value={selectedItem.category}
            onChange={(e) => handleChange(e.target.value, "category")}
          />
        </div>
        <div className="adminInputElement">
          <label htmlFor="priceAdmin">Price:</label>
          <input
            type="number"
            min="1"
            name="priceAdmin"
            id="priceAdmin"
            value={selectedItem.price}
            onChange={(e) => handleChange(Number(e.target.value), "price")}
          />
        </div>
        <div className="adminInputElement">
          <label htmlFor="productDescriptionAdmin">Description:</label>
          <textarea
            rows="4"
            cols="50"
            type="textarea"
            name="productDescriptionAdmin"
            id="productDescriptionAdmin"
            value={selectedItem.productDescription}
            onChange={(e) => handleChange(e.target.value, "productDescription")}
          />
        </div>
        <div className="adminInputElement">
          <label htmlFor="featuredAdmin">Featured:</label>
          <select
            type="text"
            name="featuredAdmin"
            id="featuredAdmin"
            value={selectedItem.featured}
            onChange={(e) =>
              handleChange(
                e.target.value === "false" ? false : true,
                "featured"
              )
            }
          >
            <option value="" hidden></option>
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </div>
        <div className="adminInputElement">
          <label htmlFor="quantityAdmin">Quantity:</label>
          <input
            type="number"
            min="1"
            name="quantityAdmin"
            id="quantityAdmin"
            value={selectedItem.quantity}
            onChange={(e) => handleChange(Number(e.target.value), "quantity")}
          />
        </div>
        <div className="adminInputElement">
          <label htmlFor="brandAdmin">Brand name:</label>
          <input
            type="text"
            name="brandAdmin"
            id="brandAdmin"
            value={selectedItem.brand}
            onChange={(e) => handleChange(e.target.value, "brand")}
          />
        </div>
        <div className="adminInputElement">
          <label htmlFor="productPictureAdmin">
            Picture hyperlink address:
          </label>
          <textarea
            rows="4"
            cols="70"
            type="textarea"
            name="productPictureAdmin"
            id="productPictureAdmin"
            value={selectedItem.productImage}
            onChange={(e) => handleChange(e.target.value, "productImage")}
          />
        </div>
        <div className="adminInputElement">
          {modificareSucces === 1 ? (
            <span className="succes">
              <Check size={32} color="#e5f42a" />
              Produsul a fost modificat cu succes!
            </span>
          ) : modificareSucces === 0 ? (
            <span className="succes">
              <Bug size={32} color="#f32c76" />
              &nbsp; Eroare! Produsul nu a fost modificat!{" "}
              {selectedItem.id === undefined &&
                "Deoarece nu ai ales un produs!"}
            </span>
          ) : null}
          {addingError !== null &&
          addingError !== "Succes! Produsul a fost adaugat!" ? (
            <span className="succes">
              <Bug size={32} color="#f32c76" />
              &nbsp; Eroare! {addingError}
            </span>
          ) : (
            addingError !== null &&
            addingError === "Succes! Produsul a fost adaugat!" && (
              <span className="succes">
                <Check size={32} color="#e5f42a" />
                &nbsp; {addingError}
              </span>
            )
          )}
        </div>
        <div className="buttonClusters">
          <button className="saveButton" onClick={() => handleUpdateData()}>
            <UploadSimple size={25} color="#392af4" />
            &nbsp;Modifica produs
          </button>
          <button className="saveButton2" onClick={() => handleAddingData()}>
            <Plus size={25} color="#392af4" />
            &nbsp;Adauga produs
          </button>
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <SpinnerGap size="100" color="#3E3D3A" className="loadingSpinner" />
          <p>Loading products...</p>
        </div>
      ) : (
        products.map(
          (product) =>
            product && (
              <div className="adminProduct" key={product.id}>
                <div className="adminProductSpecs">
                  <img
                    src={product.productImage}
                    alt={product.productName + " image"}
                    id="productImage"
                    onClick={() => {
                      navigate(`/products/${product.id}`);
                    }}
                  />
                  <div className="description">
                    <p
                      className="productTitleCartAdmin"
                      onClick={() => {
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      <b>{product.productName}</b>
                    </p>
                    <p>{product.price.toLocaleString("ro-RO")} Lei</p>
                  </div>
                </div>
                <div className="longDescriptionAdmin">
                  <h5>{product.productDescription}</h5>
                </div>
                <div className="adminButtons">
                  <span
                    className="deleteButton"
                    onClick={() => handleDeleteData(product.id)}
                  >
                    <Trash size={25} color="#f32c76" /> Sterge
                  </span>
                  <span
                    className="editButton"
                    onClick={() => {
                      document.body.scrollTop = 0;
                      document.documentElement.scrollTop = 0;
                      editItem(product.id);
                    }}
                  >
                    <Pencil size={25} color="#00ab00" weight="fill" /> Editeaza
                  </span>
                </div>
              </div>
            )
        )
      )}
    </div>
  );
};
