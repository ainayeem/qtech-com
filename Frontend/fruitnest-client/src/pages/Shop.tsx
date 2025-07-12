import { useEffect, useState } from "react";
import noCarImg from "../assets/images/no-car.png";
import Loader from "../components/loader/Loader";
import ProductCard from "../components/productCard/ProductCard";
import { useGetProductsQuery } from "../redux/features/product/productApi";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState(undefined);
  const [sortOption, setSortOption] = useState(undefined);
  const [availability, setAvailability] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = (value: any) => {
    if (value === "all") {
      setFilterCategory(undefined);
    } else {
      setFilterCategory(value);
    }
  };

  const handleSortChange = (value: any) => setSortOption(value);
  const handleAvailabilityChange = (value: any) => setAvailability(value);
  const handleSearch = () => {
    setSearch(searchTerm);
  };

  const { isLoading, data } = useGetProductsQuery(
    {
      searchTerm: search,
      category: filterCategory,
      inStock: availability,
      sort: sortOption,
      page: currentPage,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const products = data?.data || [];
  const totalPagesFromBackend = data?.meta?.totalPage || 1;

  useEffect(() => {
    setTotalPages(totalPagesFromBackend);
  }, [totalPagesFromBackend]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      setTimeout(() => {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
      }, 100);
    }
  };

  useEffect(() => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  }, [search, filterCategory, availability, sortOption]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end items-center w-full">
        {/* Search Bar */}
        <div className="w-full sm:w-auto">
          <label className="input input-bordered flex items-center gap-2 w-full sm:w-56 h-12">
            <input
              type="text"
              className="grow outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="text-gray-500 -ml-6 bg-gray-100 p-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </div>

        {/* Filter Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="select select-bordered w-full sm:w-48 h-12"
          >
            <option disabled>Categories</option>
            <option value="all">All Categories</option>
            <option value="Truck">Truck</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
            <option value="Convertible">Convertible</option>
          </select>
        </div>

        {/* Availability Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={availability}
            onChange={(e) => handleAvailabilityChange(e.target.value)}
            className="select select-bordered w-full sm:w-48 h-12"
            defaultValue="default"
          >
            <option value="default" disabled>
              Availability
            </option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="select select-bordered w-full sm:w-48 h-12"
            defaultValue="default"
          >
            <option value="default" disabled>
              Sort by Price
            </option>
            <option value="price">Low to High</option>
            <option value="-price">High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div>
        {isLoading ? (
          <Loader />
        ) : products.length === 0 ? (
          <div className="p-10">
            <img className="w-20 mx-auto" src={noCarImg} alt="No cars" />
            <p className="text-center mt-2">No car available!</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-7">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-12">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:text-customYellow border border-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                const isCurrentPage = pageNumber === currentPage;
                const isNearCurrentPage =
                  Math.abs(pageNumber - currentPage) <= 1 ||
                  pageNumber === 1 ||
                  pageNumber === totalPages;

                if (!isNearCurrentPage) {
                  if (pageNumber === 2 || pageNumber === totalPages - 1) {
                    return (
                      <span key={pageNumber} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                      isCurrentPage
                        ? "bg-customYellow text-white hover:bg-customYellowHover"
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:text-customYellow border border-gray-200"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:text-customYellow border border-gray-200"
              }`}
            >
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>

      
        </div>
      )}
    </div>
  );
};

export default Shop;
