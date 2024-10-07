import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-indigo-600 p-4 fixed bottom-0 w-full">
      <div className="flex justify-around text-white">
        <Link
          to="/"
          className={`${
            location.pathname === "/" ? "bg-indigo-500" : ""
          } p-2 rounded text-center w-28 text-[18px]`}
        >
          Jobs
        </Link>
        <Link
          to="/bookmarks"
          className={`${
            location.pathname === "/bookmarks" ? "bg-indigo-500" : ""
          } p-2 rounded text-center w-28 text-[18px]`}
        >
          Bookmarks
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
