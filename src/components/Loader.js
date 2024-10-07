import React from "react";

const FadeLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-fade"></div>
      </div>
    </div>
  );
};

const Loader = () => {
  return <FadeLoader />;
};

export default Loader;
