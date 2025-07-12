import { Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";

export interface IProduct {
  _id: string;
  imgUrl?: string;
  title: string;
  price: number;
  description?: string;
  quantity: number;
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
  category?: string;
  weight?: string;
  isNew?: boolean;
  isPopular?: boolean;
  discount?: number;
}

export interface IUser {
  email?: string;
  exp?: number;
  iat?: number;
  role?: string;
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    if (product.quantity < 1) {
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

  // Calculate discounted price if discount exists
  const finalPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price;

  return (
    <div className="group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 relative">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">New</span>}
          {product.isPopular && <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium">Popular</span>}
          {product.discount && <span className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium">{product.discount}% Off</span>}
        </div>

        {/* Quick Action Buttons - visible on hover */}
        <div className={`absolute right-3 top-3 z-10 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <Link
            to={`product/${product._id}`}
            className="bg-white rounded-full p-2 shadow-md hover:bg-amber-50 transition-colors text-gray-700 hover:text-amber-500"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>

        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
            src={product.imgUrl}
            alt={product.title}
          />
          {product.quantity < 1 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
              <span className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Product Name */}
          <Link to={`product/${product._id}`}>
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 hover:text-amber-500 transition-colors">{product.title}</h3>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xl font-bold text-amber-500">${finalPrice.toLocaleString()}</p>
            {product.discount && <p className="text-sm text-gray-500 line-through">${product.price.toLocaleString()}</p>}
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.quantity < 1}
            className={`w-full py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 font-medium ${
              product.quantity < 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-amber-500 text-white hover:bg-amber-600 shadow-sm hover:shadow"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
