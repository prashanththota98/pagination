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
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className="but">
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
