/* eslint-disable react/prop-types */

import Card from "./Card";
import Spinner from "./Spinner";

const Products = ({ products, errorMessage, isLoading, cartOperations }) => {
  return (
    <section className="mx-4 ">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Card
                key={product.id}
                product={product}
                addToCart={cartOperations.addToCart} // Use the function from the object
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      )}
    </section>
  );
};
export default Products;
