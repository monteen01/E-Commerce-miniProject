/* eslint-disable react/prop-types */
import { useState } from "react";
import { Search } from "lucide-react";

const Hero = ({ searchQuery, fetchProducts }) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearch = () => {
    fetchProducts(inputValue);
  };

  return (
    <section className="bg-gray-900 text-white py-20 flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Welcome to Our <span className="text-gradient">E-Commerce</span> Store
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center">
        Discover the best products tailored for you!
      </p>
      <div className="w-full max-w-md relative md:group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-3 rounded-full text-white pr-12 border border-white shadow-md shadow-blue-800 active:shadow:sm"
        />
        <button
          onClick={handleSearch}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
        >
          <Search />
        </button>
      </div>
    </section>
  );
};

export default Hero;
