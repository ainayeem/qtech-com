import { ShoppingCart } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Footer from "../footer/Footer";
import SidebarCart from "../sidebarCart/SidebarCart";

const MainLayout = () => {
  const cartData = useAppSelector((state) => state.cart);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center">
              <Link to="/" className="ml-2 sm:ml-4">
                <span className="text-2xl sm:text-3xl font-bold">
                  <span className="text-amber-500">Fruit</span>Nest
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  <label htmlFor="my-drawer-4" className="cursor-pointer">
                    <div className="bg-amber-500 p-2 rounded-full flex items-center justify-center relative">
                      <ShoppingCart className="size-6 text-white" />
                      {cartData.items.length > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-semibold text-white bg-amber-600 rounded-full border-2 border-white">
                          {cartData.items.length}
                        </span>
                      )}
                    </div>
                  </label>
                </div>
                <div className="drawer-side z-50">
                  <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                  <div className="min-h-full w-80 md:w-96 p-0 bg-base-100 text-base-content">
                    <SidebarCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
