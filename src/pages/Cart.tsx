import { useCartStore } from "../store/useCartStore";
import { useState } from "react";

const Cart = () => {
  const { items, removeItem, clearCart, updateQuantity } = useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode.trim() === "2025") {
      setDiscount(5 / 100);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

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

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        <input
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Use code: 2025"
          className="border border-gray-300 p-2 rounded w-[200px]"
        />
        <button
          onClick={handleApplyPromo}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Apply
        </button>
      </div>

      <div className="mt-10 text-right text-2xl font-bold">
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
        {discount > 0 && (
          <div className="text-green-600">
            Discount (5%): -${discountAmount.toFixed(2)}
          </div>
        )}
        <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
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
