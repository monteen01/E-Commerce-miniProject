/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CartPage = ({ cart, cartOperations }) => {
  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <section className="mx-4 my-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((product) => (
              <Link
                to={`/description/${product.id}`}
                key={product.id}
                className="flex items-center justify-between p-4 bg-gray-900 rounded-lg text-white w-[75%] "
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-contain bg-white rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-gray-300">${product.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) =>
                      cartOperations.updateQuantity(
                        product.id,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-16 px-2 py-1 bg-gray-800 text-white rounded-md"
                  />

                  <button
                    onClick={() => cartOperations.removeFromCart(product.id)}
                    className="text-red-500 inset-ring-1 inset-ring-red-500  rounded-md hover:inset-shadow-red-700 hover:inset-ring-red-700 px-3 py-1"
                  >
                    Remove
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <Link
              to="/"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
