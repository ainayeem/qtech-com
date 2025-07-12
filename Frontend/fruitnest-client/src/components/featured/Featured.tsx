import { useGetProductsQuery } from "../../redux/features/product/productApi";
import Loader from "../loader/Loader";
import ProductCard, { IProduct } from "../productCard/ProductCard";
import { motion, Variants } from "framer-motion";

const Featured = () => {
  const { isLoading, data } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const products = data?.data || [];

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const underlineVariants: Variants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "80px",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div className="mt-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={containerVariants}>
      <motion.h1 className="text-4xl font-bold text-center text-gray-800 mb-6" variants={headerVariants}>
        Featured Fruits
      </motion.h1>

      <motion.span className="h-1 bg-amber-500 block mx-auto mt-2" variants={underlineVariants}></motion.span>

      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <motion.div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7" variants={containerVariants}>
            {products.map((product: IProduct) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Featured;
