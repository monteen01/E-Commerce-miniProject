/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ product, addToCart }) => {
  const { title, image, price, rating } = product;
  const rate = rating?.rate || "N/A";

  // Truncate long titles
  const truncateTitle = (text, maxWords = 3) => {
    const words = text.split(" ");
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") : text;
  };

  return (
    <motion.div
      className=" hover:shadow-sm  rounded-lg overflow-hidden text-white inset-ring-1 inset-ring-cyan-700 shadow-cyan-600"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: 1 }}
    >
      <Link to={`/description/${product.id}`}>
        <img
          className="object-contain bg-white h-52 w-full"
          src={image}
          alt={title}
        />
        <div className="px-3 py-2">
          <h2 className="text-lg font-semibold">{truncateTitle(title)}</h2>
        </div>
        <div className="px-2 flex gap-1 justify-between items-center">
          <p className="text-sm text-gray-100">⭐ {rate}</p>
        </div>
      </Link>
      <div className="flex justify-between items-center px-3 py-1">
        <p className="text-lg font-bold text-gray-100">${price}</p>
        <button
          className="flex items-center justify-center gap-2 inset-ring-1 mb-2 rounded-md px-2 py-[4px] text-gray-100 hover:inset-ring-blue-500"
          onClick={() => addToCart(product)}
        >
          <p>Add to cart</p>
        </button>
      </div>
    </motion.div>
  );
};

export default Card;
