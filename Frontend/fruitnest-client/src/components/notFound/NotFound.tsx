import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-9xl font-bold">404</h1>
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <Link to="/" className="mt-5 block  duration-300">
        Return to
        <span className="text-customYellow hover:text-customYellowHover">
          {" "}
          Home
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
