import React from "react";
import { Product } from "./Product";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../../context/Shop-context";
import {
  SpinnerGap,
  Binoculars,
  Funnel,
  FunnelSimple,
  Tag,
} from "phosphor-react";
import "./shop.css";

export const Shop = () => {
  const { products, loading } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredObject, setFilteredObject] = useState({
    category: [],
    brand: [],
    priceMin:
      products && products.map((item) => item.price).sort((a, b) => a - b)[0],
    priceMax:
      products && products.map((item) => item.price).sort((a, b) => b - a)[0],
  });
  const [selectedSorting, setSelectedSorting] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    setFilteredObject((prev) => ({
      ...prev,
      ["priceMin"]:
        products && products.map((item) => item.price).sort((a, b) => a - b)[0],
      ["priceMax"]:
        products && products.map((item) => item.price).sort((a, b) => b - a)[0],
    }));
  }, [products]);

  useEffect(() => {
    if (
      filteredObject.category.length > 0 &&
      filteredObject.brand.length === 0
    ) {
      setFilteredProducts(
        products &&
          products.filter((p) => {
            return (
              filteredObject.category.indexOf(p.category) !== -1 &&
              p.price >= filteredObject.priceMin &&
              p.price <= filteredObject.priceMax
            );
          })
      );
    } else if (
      filteredObject.category.length === 0 &&
      filteredObject.brand.length !== 0
    ) {
      setFilteredProducts(
        products &&
          products.filter((p) => {
            return (
              filteredObject.brand.indexOf(p.brand) !== -1 &&
              p.price >= filteredObject.priceMin &&
              p.price <= filteredObject.priceMax
            );
          })
      );
    } else if (
      filteredObject.category.length !== 0 &&
      filteredObject.brand.length !== 0
    ) {
      setFilteredProducts(
        products &&
          products.filter((p) => {
            return (
              filteredObject.brand.indexOf(p.brand) !== -1 &&
              filteredObject.category.indexOf(p.category) !== -1 &&
              p.price >= filteredObject.priceMin &&
              p.price <= filteredObject.priceMax
            );
          })
      );
    } else {
      setFilteredProducts(
        products &&
          products.filter(
            (p) =>
              p.price >= filteredObject.priceMin &&
              p.price <= filteredObject.priceMax
          )
      );
    }
  }, [filteredObject]);

  useEffect(() => {
    if (selectedSorting === "numeASC") {
      setFilteredProducts((prev) =>
        prev.toSorted((a, b) => {
          if (a.productName.toUpperCase() < b.productName.toUpperCase())
            return -1;
        })
      );
    } else if (selectedSorting === "numeDESC") {
      setFilteredProducts((prev) =>
        prev.toSorted((a, b) => {
          if (a.productName.toUpperCase() > b.productName.toUpperCase())
            return -1;
        })
      );
    } else if (selectedSorting === "pretASC") {
      setFilteredProducts((prev) => prev.toSorted((a, b) => a.price - b.price));
    } else if (selectedSorting === "pretDESC") {
      setFilteredProducts((prev) => prev.toSorted((a, b) => b.price - a.price));
    }
  }, [selectedSorting]);

  function changeCategory(e) {
    setIsFiltered(true);
    setSelectedSorting("");
    if (
      e.target.checked &&
      filteredObject.category.indexOf(e.target.name) === -1
    ) {
      setFilteredObject((prev) => ({
        ...prev,
        ["category"]: [...prev.category, e.target.name],
      }));
    }

    if (!e.target.checked) {
      setFilteredObject((prev) => ({
        ...prev,
        ["category"]: prev.category.filter((p) => p !== e.target.name),
      }));
    }
  }

  function changeBrand(e) {
    setIsFiltered(true);
    setSelectedSorting("");
    if (
      e.target.checked &&
      filteredObject.brand.indexOf(e.target.name) === -1
    ) {
      setFilteredObject((prev) => ({
        ...prev,
        ["brand"]: [...prev.brand, e.target.name],
      }));
    }

    if (!e.target.checked) {
      setFilteredObject((prev) => ({
        ...prev,
        ["brand"]: prev.brand.filter((p) => p !== e.target.name),
      }));
    }
  }

  function changePrice(value, type) {
    setIsFiltered(true);
    setSelectedSorting("");
    if (type === "max") {
      setFilteredObject((prev) => ({
        ...prev,
        ["priceMax"]: Number(value),
      }));
    } else if (type === "min") {
      setFilteredObject((prev) => ({
        ...prev,
        ["priceMin"]: Number(value),
      }));
    }
  }

  function filterBySearchKeyword(text) {
    setIsFiltered(true);
    setSelectedSorting("");
    setFilteredProducts(
      products &&
        products.filter((p) => {
          return (
            p.category.toLowerCase().includes(text.toLowerCase()) ||
            p.productName.toLowerCase().includes(text.toLowerCase()) ||
            p.brand.toLowerCase().includes(text.toLowerCase())
          );
        })
    );
  }

  return (
    <div className="shop">
      {!loading && (
        <div className="filterMenu">
          <div className="filterCard">
            <h4 className="filterTitle">
              CAUTA&nbsp;
              <Binoculars size={18} color="#392af4" />
            </h4>
            <div className="custom-search">
              <input
                type="text"
                name="custom-search"
                id="custom-search"
                placeholder="Produs sau categorie"
                onChange={(e) => filterBySearchKeyword(e.target.value)}
              />
            </div>
          </div>
          <div className="filterCard">
            <h4 className="filterTitle">
              SORTARE&nbsp;
              <FunnelSimple size={18} color="#392af4" />
            </h4>
            <div className="custom-select">
              <select
                name="sortare"
                id="sortare"
                onChange={(e) => {
                  setIsFiltered(true);
                  setSelectedSorting((prev) => e.target.value);
                }}
              >
                <option
                  value=""
                  disabled
                  hidden
                  selected={selectedSorting === ""}
                >
                  Alege sortare
                </option>
                <option value="numeASC">Nume ascendent</option>
                <option value="numeDESC">Nume descendent</option>
                <option value="pretASC">Pret ascendent</option>
                <option value="pretDESC">Pret descendent</option>
              </select>
            </div>
          </div>
          <div className="filterCard">
            <h4 className="filterTitle">
              CATEGORIE&nbsp;
              <Funnel size={18} color="#392af4" />
            </h4>
            {[...new Set(products.map((item) => item.category))].map((uc) => (
              <div key={uc} className="inputFields">
                <input
                  className="inputFilter"
                  type="checkbox"
                  id={uc}
                  name={uc}
                  onClick={(e) => changeCategory(e)}
                />
                <label className="inputFilter" htmlFor={uc}>
                  {`${uc} (${
                    products.filter((p) => p.category === uc).length
                  })`}
                </label>
              </div>
            ))}
          </div>
          <div className="filterCard">
            <h4 className="filterTitle">
              BRAND&nbsp;
              <Funnel size={18} color="#392af4" />
            </h4>
            {[...new Set(products.map((item) => item.brand))]
              .sort()
              .map((uc) => (
                <div key={uc}>
                  <input
                    className="inputFilter"
                    type="checkbox"
                    id={uc}
                    name={uc}
                    onClick={(e) => changeBrand(e)}
                  />
                  <label className="inputFilter" htmlFor={uc}>
                    {`${uc} (${products.filter((p) => p.brand === uc).length})`}
                  </label>
                </div>
              ))}
          </div>
          <div className="filterCard">
            <h4 className="filterTitle">
              PRET&nbsp;
              <Tag size={18} color="#392af4" />
            </h4>
            {
              <div className="priceInterval">
                <div key="min" className="minCard">
                  <label className="inputFilter priceLabel" htmlFor="min">
                    min
                  </label>
                  <input
                    className="inputFilter priceFilter"
                    type="number"
                    id="min"
                    name="min"
                    defaultValue={filteredObject.priceMin}
                    onChange={(e) => changePrice(e.target.value, "min")}
                  />
                </div>
                <div key="max" className="maxCard">
                  <label className="inputFilter priceLabel" htmlFor="max">
                    max
                  </label>
                  <input
                    className="inputFilter priceFilter"
                    type="number"
                    id="max"
                    name="max"
                    defaultValue={filteredObject.priceMax}
                    onChange={(e) => changePrice(e.target.value, "max")}
                  />
                </div>
              </div>
            }
          </div>
        </div>
      )}
      <div className="products">
        {loading ? (
          <div className="loading">
            <SpinnerGap size="100" color="#3E3D3A" className="loadingSpinner" />
            <p>Loading products...</p>
          </div>
        ) : /*!filteredProducts &&*/ !isFiltered ? (
          products.map(
            (product) =>
              product.featured && <Product key={product.id} data={product} />
          )
        ) : (
          filteredProducts.map(
            (product) => product && <Product key={product.id} data={product} />
          )
        )}
      </div>
    </div>
  );
};
