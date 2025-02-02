import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import CartPage from "./components/CartPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDescription from "./components/ProductDescription";

function App() {
  // State
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]); // Cart state
  const navigate = useNavigate();

  const API_URL = "https://fakestoreapi.com/products";

  // Check authentication on app load
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (
      !loggedInUser &&
      !["/login", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch products
  const fetchProducts = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endPoint = query
        ? `${API_URL}/category/${encodeURIComponent(query)}`
        : API_URL;

      const response = await fetch(endPoint);
      if (!response.ok) {
        throw new Error("Failed to fetch the data");
      }

      const data = await response.json();
      setProducts(data);

      if (data.length === 0) {
        setErrorMessage("No products found.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Error fetching products.");
    } finally {
      setIsLoading(false);
    }
  };

  // cart operations
  const cartOperations = {
    addToCart: (product) => {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    },
    removeFromCart: (productId) => {
      setCart((prev) => prev.filter((item) => item.id !== productId));
    },
    updateQuantity: (productId, newQuantity) => {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    },
  };

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  return (
    <main className="">
      <section id="navbar">
        <NavBar cartCount={cart.length} />
      </section>

      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <>
                <Hero
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  fetchProducts={fetchProducts}
                />
                <Products
                  errorMessage={errorMessage}
                  products={products}
                  isLoading={isLoading}
                  cartOperations={cartOperations}
                />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                removeFromCart={cartOperations.removeFromCart}
                updateQuantity={cartOperations.updateQuantity}
              />
            }
          />
          <Route path="/description/:id" element={<ProductDescription />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
