import payMethod from "../../assets/images/pay-method.png";

const Footer = () => {
  return (
    <div className="w-2/3 mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Grid for Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
              <span className="text-amber-500">Fruit</span> Nest
            </h1>
            <p className="font-medium text-[#636363] mb-3">Address: Mohammadpur, Dhaka</p>
            <p className="font-medium text-[#636363] mb-3">Phone: +8801234567890</p>
            <p className="font-medium text-[#636363] mb-3">Email: info@fruit-shop.com</p>
          </div>

          {/* Column 2: Information Links */}
          <div>
            <p className="font-semibold mb-5 uppercase">Information</p>
            <a href="/about" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              About Us
            </a>
            <a href="/fruitt" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              Check-out
            </a>
            <a href="" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              Services
            </a>
            <a href="" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              Contact
            </a>
          </div>

          {/* Column 3: Account Links */}
          <div>
            <p className="font-semibold mb-5 uppercase">Account</p>
            <a href="" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              My Account
            </a>
            <a href="/shop" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              Shop fruitt
            </a>
            <a href="" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              Update Information
            </a>
            <a href="" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              Track Order
            </a>
          </div>

          {/* Column 4: Quick Shop Links */}
          <div>
            <p className="font-semibold mb-5 uppercase">Quick Shop</p>
            <a href="/shop" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              Browse Shop
            </a>
            <a href="/" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              Deal of the Week
            </a>
            <a href="/shop" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              New Arrival
            </a>
            <a href="" className="font-medium text-[#636363] hover:text-amber-500 block duration-300 mb-3">
              Special Discount
            </a>
          </div>
        </div>

        {/* Copyright and Payment Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-10 border-b-8 border-amber-500 mt-8">
          <div className="col-span-1 sm:col-span-3 font-medium text-[#636363] text-center sm:text-left">
            Copyright © {new Date().getFullYear()} fruitShop - All Rights Reserved.
          </div>
          <div className="col-span-1 flex justify-center sm:justify-end">
            <img className="w-full max-w-[200px] sm:max-w-none" src={payMethod} alt="payment methods" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
