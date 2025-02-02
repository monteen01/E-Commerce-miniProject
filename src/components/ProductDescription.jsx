import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    <section className="max-w-4xl mx-auto p-4 ">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Products
      </button>

      <div className="bg-gray-900 text-white rounded-lg p-6 shadow-lg">
        <div className="flex flex-col md:flex-row ">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0 ">
            <img
              src={product.image}
              alt={product.title}
              className=" h-full w-full object-contain bg-white p-4 lg:rounded-l-3xl"
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 md:pl-6 bg-gray-800 pr-4 lg:rounded-r-3xl">
            <h1 className="text-3xl font-bold mb-1 text-left">
              {product.title}
            </h1>
            <p className="text-gray-300 mb-6">{product.description}</p>

            <div className="grid grid-cols-1 gap-4 text-lg md:grid-cols-2">
              <div>
                <p className="text-blue-400">Price:</p>
                <p className="font-bold">${product.price}</p>
              </div>
              <div>
                <p className="text-blue-400">Category:</p>
                <p className="font-bold capitalize">{product.category}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-blue-400 ">Rating:</p>
                <p className="font-bold">
                  ⭐ {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
