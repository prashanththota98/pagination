import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=200");
    const data = await response.json();
    console.log(data);
    setProducts(data.products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const limit = 20;
  const indexofLastProduct = currentPage * limit;
  const indexofFirstProduct = indexofLastProduct - limit;
  const totalPages = Math.ceil(totalProducts / limit);
  const currentProducts = products.slice(
    indexofFirstProduct,
    indexofLastProduct
  );
  console.log(totalPages);
  console.log(totalProducts);
  return (
    <>
      <div className="stars">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: Math.random() * 100 + "vw",
              animationDuration: 2 + Math.random() * 4 + "s",
              animationDelay: Math.random() * 5 + "s",
            }}
          ></div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`but ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="maincard">
        {currentProducts.map((eachItem) => (
          <div key={eachItem.id} className="card">
            <img src={eachItem.images[0]} alt="img" className="image-size" />
            <h1 className="heading">{eachItem.title}</h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

/* import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 20; // items per page

  const fetchData = async (page = 1) => {
    const skip = (page - 1) * limit;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    setProducts(data.products);
    setTotal(data.total); // total products count from server
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`but ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="maincard">
        {products.map((eachItem) => (
          <div key={eachItem.id} className="card">
            <img src={eachItem.images[0]} alt="img" className="image-size" />
            <h1 className="heading">{eachItem.title}</h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
*/
