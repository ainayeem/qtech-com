import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowLeft, FaShoppingCart, FaStar, FaTimesCircle, FaTruck } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../components/loader/Loader";
import { IProduct } from "../components/productCard/ProductCard";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useGetSingleProductQuery } from "../redux/features/product/productApi";
import { useAppDispatch } from "../redux/hooks";
import { useScrollToTop } from "../utils/scrollToTop";

const SingleProduct = () => {
  const { productId } = useParams();
  const { isLoading, data } = useGetSingleProductQuery(productId);
  const dispatch = useAppDispatch();
  const product: IProduct = data?.data;
  const [isImageHovered, setIsImageHovered] = useState(false);

  const handleAddToCart = () => {
    if (product?.quantity < 1) {
      toast.warning("Insufficient Stock!");
      return;
    }
    dispatch(
      addToCart({
        product: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
        stock: product.quantity,
        imgUrl: product.imgUrl as string,
      })
    );
    toast.success(`${product.title} added to your cart!`);
  };

  useScrollToTop();

  // Calculate actual discount if available, otherwise use default 20%
  const discountPercentage = product?.discount || 20;
  const originalPrice = product?.discount ? (product.price / (1 - product.discount / 100)).toFixed(2) : (product?.price * 1.2).toFixed(2);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const imageAnimation = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : product ? (
        <motion.div className="container mx-auto px-4" initial="hidden" animate="visible" variants={fadeIn}>
          <motion.div className="max-w-6xl mx-auto" variants={staggerContainer}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                {/* Image Section */}
                <motion.div
                  className="relative rounded-xl overflow-hidden"
                  variants={fadeIn}
                  onHoverStart={() => setIsImageHovered(true)}
                  onHoverEnd={() => setIsImageHovered(false)}
                  whileHover="hover"
                  animate={isImageHovered ? "hover" : "initial"}
                >
                  <motion.img src={product?.imgUrl} alt={product.title} className="w-full object-contain rounded-xl" variants={imageAnimation} />
                </motion.div>

                {/* Product Info Section */}
                <motion.div className="flex flex-col" variants={staggerContainer}>
                  <motion.div className="flex items-center justify-between mb-4" variants={fadeIn}>
                    <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full">
                      <FaStar className="text-amber-500" />
                      <span className="text-gray-600 font-medium">4.5</span>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-center gap-4 mb-6" variants={fadeIn}>
                    <span className="text-3xl font-bold text-amber-500">${product.price}</span>
                    <span className="text-gray-500 line-through">${originalPrice}</span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">{discountPercentage}% OFF</span>
                  </motion.div>

                  <motion.div className="mb-6 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500" variants={fadeIn}>
                    <p className="text-gray-700 italic">"{product.description}"</p>
                  </motion.div>

                  {/* Product Details */}
                  {/* <motion.div className="bg-gray-50 p-4 rounded-xl mb-6" variants={fadeIn}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mr-2">1</span>
                      Product Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.category && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">Category:</span>
                          <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{product.category}</span>
                        </div>
                      )}
                      {product.weight && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">Weight:</span>
                          <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{product.weight}</span>
                        </div>
                      )}
                    </div>
                  </motion.div> */}

                  {/* Stock Status */}
                  <motion.div className="bg-gray-50 p-4 rounded-xl mb-6" variants={fadeIn}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaTruck className="text-xl text-gray-600 mr-2" />
                      Stock Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Available Quantity:</span>
                        <span className={`px-3 py-1 rounded-full ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {product.quantity} Kgs
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2">
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className={`px-3 py-1 rounded-full ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full py-4 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      product.inStock ? "bg-amber-500 hover:bg-amber-600" : "bg-gray-400 cursor-not-allowed"
                    }`}
                    variants={fadeIn}
                    whileHover={product.inStock ? "hover" : undefined}
                    whileTap={product.inStock ? "tap" : undefined}
                    animate={product.inStock ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.5, repeat: 0 }}
                  >
                    <FaShoppingCart className="text-xl" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <FaTimesCircle className="mx-auto text-6xl text-gray-400 mb-4" />
          </motion.div>
          <motion.h2
            className="text-2xl font-semibold text-gray-900 mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Product Not Found
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            The product you're looking for doesn't exist or has been removed.
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-6">
            <Link
              className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
              to="/shop"
            >
              <FaArrowLeft /> Back to Shop
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SingleProduct;
