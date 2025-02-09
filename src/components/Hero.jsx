/* eslint-disable react/prop-types */
import { useState } from "react";
import { Search } from "lucide-react";

const Hero = ({ searchQuery, fetchProducts }) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearch = () => {
    fetchProducts(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section id="hero" className=" text-white py-20 flex flex-col items-center">
      <h1 className="text-2xl mt-4 md:text-5xl font-semibold mb-5 text-center p-2">
        Shop the <span className="text-gradient mr-2">Best</span>
        <span>, </span>
        forget the <span className="text-gradient">Rest</span>
      </h1>

      <div className="w-full max-w-md relative md:group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="men's clothing"
          className="w-full p-3 rounded-full text-white pr-12 border border-white  focus:outline-none  outline-0 "
        />
        <button
          onClick={handleSearch}
          className="absolute right-1 top-1/2  transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
        >
          <Search className="hover:scale-120 transform transition  ease-in-out " />
        </button>
      </div>
    </section>
  );
};

export default Hero;
