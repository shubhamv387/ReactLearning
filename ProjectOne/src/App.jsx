import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    productId: "",
    sellingPrice: "",
    productName: "",
  });

  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storage = Object.values(localStorage);
    const data = [];
    let totalPrice1 = 0;

    for (let i = 0; i < storage.length; i++) {
      let product = JSON.parse(storage[i]);

      data.push(product);

      totalPrice1 += parseFloat(product.sellingPrice);
    }

    setTotalPrice(totalPrice + totalPrice1);

    setProductList([...data]);
  }, []);

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(formData.productId, JSON.stringify(formData));

    setProductList((prevState) => [...prevState, formData]);
    setTotalPrice(totalPrice + parseFloat(formData.sellingPrice));

    setFormData({
      productId: "",
      sellingPrice: "",
      productName: "",
    });
  };

  const deleteProduct = (id) => {
    const product = JSON.parse(localStorage.getItem(id));
    setTotalPrice(totalPrice - parseFloat(product.sellingPrice));
    localStorage.removeItem(id);
    setProductList((prevState) => prevState.filter((p) => p.productId != id));
  };

  return (
    <div className="app">
      <form onSubmit={submitHandler}>
        <label htmlFor="productId">Product ID</label>
        <input
          required
          onChange={inputHandler}
          value={formData.productId}
          type="number"
          id="productId"
          name="productId"
        />

        <label htmlFor="sellingPrice">Selling Price</label>
        <input
          required
          onChange={inputHandler}
          value={formData.sellingPrice}
          type="number"
          id="sellingPrice"
          name="sellingPrice"
        />

        <label htmlFor="productName">Product Name</label>
        <input
          required
          onChange={inputHandler}
          value={formData.productName}
          type="text"
          id="productName"
          name="productName"
        />
        <button type="submit">Add Product</button>
      </form>

      <ul>
        {productList.map((product) => (
          <li key={product.productId}>
            {parseFloat(product.sellingPrice).toFixed(2)} -{" "}
            {product.productName}{" "}
            <button
              onClick={() => deleteProduct(product.productId)}
              type="button"
            >
              Delete Product
            </button>
          </li>
        ))}
      </ul>

      <h1>Total Price: {totalPrice <= 0 ? 0 : totalPrice.toFixed(2)}</h1>
    </div>
  );
}

export default App;
