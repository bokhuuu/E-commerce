import { useCartStore } from "../store/useCartStore";

const Cart = () => {
  const { items, removeItem, clearCart } = useCartStore();
  console.log(items);

  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-2xl font-bold">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-20 h-20 rounded object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  ${item.price} x {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right text-2xl font-bold">
        Total: ${totalPrice.toFixed(2)}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={clearCart}
          className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
