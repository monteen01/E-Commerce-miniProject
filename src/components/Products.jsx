/* eslint-disable react/prop-types */

import Card from "./Card";
import Spinner from "./Spinner";

const Products = ({ products, errorMessage, isLoading, cartOperations }) => {
  return (
    <section className="m-0 p-0 " id="products-display">
      <h2 className="text-xl text-center font-medium mb-4">
        Discover the best products tailored for you!
      </h2>

      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-6 md:px-12 lg:px-20 mb-5">
          {products.length > 0 ? (
            products.map((product) => (
              <Card
                key={product.id}
                product={product}
                addToCart={cartOperations.addToCart} // Use the function from the object
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center text-lg">
              No products found.
            </p>
          )}
        </div>
      )}
    </section>
  );
};
export default Products;
