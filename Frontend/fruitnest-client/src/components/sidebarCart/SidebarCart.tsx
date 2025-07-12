import { ArrowRight, Minus, Plus, ShoppingBag, ShoppingCart, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { clearCart, removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const SidebarCart = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    address: "",
  });

  const openCheckoutModal = () => {
    if (cartData.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setIsCheckoutModalOpen(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    setFormErrors({
      name: "",
      email: "",
      address: "",
    });
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = "auto";
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", address: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handlePlaceOrder = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const toastId = toast.loading("Processing your order...");

    // Simulate API call with setTimeout
    setTimeout(() => {
      toast.success("Order placed successfully!", {
        id: toastId,
      });
      dispatch(clearCart());
      closeCheckoutModal();
      setFormData({
        name: "",
        email: "",
        address: "",
      });
    }, 2000);
  };

  // The main sidebar cart UI
  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-white" />
            <h2 className="text-xl font-bold text-white">Your Cart</h2>
          </div>
        </div>
        <p className="text-sm text-white mt-1">Review your items and proceed to checkout</p>
      </div>

      {/* Cart Items */}
      <div className="px-4">
        {cartData.items.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {cartData.items.map((item) => (
              <li key={item.product} className="py-4">
                <div className="mb-1 font-semibold text-gray-800 truncate">{item.title}</div>
                <div className="flex items-center gap-4">
                  <img src={item.imgUrl} alt={item.title} className="h-16 w-16 object-contain bg-white flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-600 font-medium">${item.price.toFixed(2)}</span>
                      <span className="text-gray-700 font-bold">${(item.quantity * item.price).toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.product,
                                quantity: Math.max(item.quantity - 1, 1),
                              })
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center font-medium text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.product,
                                quantity: Math.min(item.quantity + 1, item.stock),
                              })
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button onClick={() => dispatch(removeFromCart(item.product))} className="text-red-500 hover:text-red-700 text-sm font-medium">
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
            <h3 className="font-semibold text-gray-700 mb-1">Your cart is empty</h3>
            <p className="text-gray-500 text-sm mb-4">Add items to get started</p>
          </div>
        )}
      </div>

      {/* Footer with total and checkout button */}
      {cartData.items.length > 0 && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Total Items:</span>
            <span className="font-bold text-gray-800">{cartData.totalQuantity}</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-xl font-bold text-orange-600">${cartData.totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={openCheckoutModal}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Checkout
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Checkout Modal - Rendered in a portal outside the sidebar */}
      {isCheckoutModalOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
              onClick={closeCheckoutModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <ShoppingBag className="h-5 w-5 text-orange-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Complete Your Order</h2>
                  </div>
                  <button
                    onClick={closeCheckoutModal}
                    className="text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full p-2 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handlePlaceOrder} className="p-5">
                  <div className="mb-5">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formErrors.name}
                      </motion.p>
                    )}
                  </div>

                  <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formErrors.email}
                      </motion.p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                      Delivery Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full p-3 border ${
                        formErrors.address ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors`}
                      placeholder="123 Main St, City, Country"
                    ></textarea>
                    {formErrors.address && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formErrors.address}
                      </motion.p>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-5">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Items in cart:</span>
                      <span className="text-gray-800 font-semibold">{cartData.totalQuantity}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium text-gray-700">Order Total:</span>
                      <span className="text-xl font-bold text-orange-600">${cartData.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Place Order
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default SidebarCart;
